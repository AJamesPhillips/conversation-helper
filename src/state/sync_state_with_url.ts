import { select_target_time_share_minutes, update_target_time_share_minutes } from "./config"
import { useAppDispatch } from "./hooks"
import { add_person, select_all_people } from "./people"
import { store } from "./store"
import { select_show_settings, set_show_settings } from "./view"


let complete = false
export function sync_state_with_url ()
{
    const dispatch = useAppDispatch()

    if (complete) return
    complete = true


    // Pull state from URL, e.g. "/?people=Shirley,Jeremy,James&time=2"
    const params = new URLSearchParams(document.location.search)
    const people_strs = (params.get("people")?.split(",") || [])
        .filter(name => !!name)
    const time_str = params.get("time")


    // Update app state
    people_strs.forEach(person_name =>
    {
        dispatch(add_person(person_name))
    })

    if (time_str)
    {
        const time_minutes = parseInt(time_str, 10)
        dispatch(update_target_time_share_minutes(time_minutes))
    }


    const state = store.getState()
    // Check if need to show settings pane
    const people = select_all_people(state)
    const show_settings = select_show_settings(state)
    if (people.length === 0 && !show_settings)
    {
        dispatch(set_show_settings(true))
    }


    // Set up listener to update URL with app state
    let previous_people_state = people
    let previous_target_time_share_minutes = select_target_time_share_minutes(state)
    store.subscribe(() =>
    {
        const state = store.getState()
        const new_people = select_all_people(state)
        const new_target_time_share_minutes = select_target_time_share_minutes(state)

        const changed = (
            (previous_people_state !== new_people)
            || (previous_target_time_share_minutes !== new_target_time_share_minutes)
        )

        if (!changed) return
        previous_people_state = new_people
        previous_target_time_share_minutes = new_target_time_share_minutes

        const people_str = new_people
            .filter(p => !p.deleted)
            .map(p => p.name)
            .join(",")

        const url = new URL(document.location.toString())
        url.searchParams.set("people", people_str)
        url.searchParams.set("time", "" + new_target_time_share_minutes)
        history.pushState({}, "", url)
    })
}
