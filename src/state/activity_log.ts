import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { LogEntry, Person } from "../interfaces"
import { get_last_element } from "../utils/array"
import { default_target_time_share_seconds } from "./config"
import { people_are_same, remove_person } from "./people"


// Define a type for the slice state
interface ActivityLogState
{
    entries: LogEntry[]
    current_datetime: Date
}

// Define the initial state using that type
const initial_state: ActivityLogState =
{
    entries: [
        {
            person: "James",
            start_datetime: new Date(new Date().getTime() - (default_target_time_share_seconds * 1000)),
        }
    ],
    current_datetime: new Date(),
}

export const activity_log_slice = createSlice({
    name: "activity_log",
    // `createSlice` will infer the state type from the `initial_state` argument
    initialState: initial_state,
    reducers: {
        toggle_person_activity: _toggle_person_activity,
        set_current_datetime: (state, action: PayloadAction<Date>) =>
        {
            return {
                ...state,
                current_datetime: action.payload,
            }
        }
    },
    extraReducers: builder => {
        builder
        .addCase(remove_person, (state, action) => {
            state = _stop_person_activity(state, action)
            return state
        })
    }
})

export const { toggle_person_activity, set_current_datetime } = activity_log_slice.actions

// Other code such as selectors can use the imported `RootState` type
export const select_activity_log_entries = (state: RootState) => state.activity_log.entries
export const select_current_datetime = (state: RootState) => new Date(state.activity_log.current_datetime)

export default activity_log_slice.reducer



export function _toggle_person_activity (state: ActivityLogState, action: PayloadAction<Person>)
{
    const person = action.payload

    const last_log_entry = get_last_element(state.entries)
    let entries = state.entries

    let stopped_previous = false
    if (last_log_entry && !last_log_entry.stop_datetime)
    {
        entries = [...entries]
        entries[entries.length - 1] = {
            ...last_log_entry,
            stop_datetime: new Date(state.current_datetime),
        }

        stopped_previous = true
    }

    if (!last_log_entry || !stopped_previous || (stopped_previous && !people_are_same(last_log_entry.person, person)))
    {
        const log_entry: LogEntry = {
            person,
            start_datetime: new Date(state.current_datetime),
        }
        entries = [...entries]
        entries.push(log_entry)
    }

    return entries === state.entries ? state : {
        ...state,
        entries,
    }
}


function _stop_person_activity (state: ActivityLogState, action: PayloadAction<Person>)
{
    const person = action.payload

    const last_log_entry = get_last_element(state.entries)
    let entries = state.entries

    if (last_log_entry && !last_log_entry.stop_datetime && people_are_same(last_log_entry.person, person))
    {
        entries = [...entries]
        entries[entries.length - 1] = {
            ...last_log_entry,
            stop_datetime: new Date(state.current_datetime),
        }
    }

    return entries === state.entries ? state : {
        ...state,
        entries,
    }
}
