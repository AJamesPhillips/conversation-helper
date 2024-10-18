import { select_rounds_of_sharing, select_target_time_share_minutes } from "./config"
import { useAppDispatch } from "./hooks"
import { select_all_people } from "./people"
import { store } from "./store"
import { select_show_settings, set_show_settings } from "./view"


let complete = false
export function sync_state_with_url ()
{
    const dispatch = useAppDispatch()

    if (complete) return
    complete = true

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
    let previous_rounds_of_sharing = select_rounds_of_sharing(state)
    store.subscribe(() =>
    {
        const state = store.getState()
        const new_people = select_all_people(state)
        const new_target_time_share_minutes = select_target_time_share_minutes(state)
        const new_rounds_of_sharing = select_rounds_of_sharing(state)

        const changed = (
            (previous_people_state !== new_people)
            || (previous_target_time_share_minutes !== new_target_time_share_minutes)
            || (previous_rounds_of_sharing !== new_rounds_of_sharing)
        )

        if (!changed) return
        previous_people_state = new_people
        previous_target_time_share_minutes = new_target_time_share_minutes
        previous_rounds_of_sharing = new_rounds_of_sharing

        const people_str = new_people
            .filter(p => !p.deleted)
            .map(p => p.name)
            .join(",")

        const url = new URL(document.location.toString())
        url.searchParams.set("people", people_str)
        url.searchParams.set("time", "" + new_target_time_share_minutes)
        url.searchParams.set("rounds", "" + new_rounds_of_sharing)
        history.pushState({}, "", url)
    })
}
