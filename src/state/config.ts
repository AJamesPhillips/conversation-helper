import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { get_state_from_url } from "./sync_state_from_url"


export const default_target_time_share_minutes = 3
// export const default_target_time_share_seconds = default_target_time_share_minutes * 60
export const default_rounds_of_sharing = 5

// Define a type for the slice state
interface ConfigState
{
    target_time_share_minutes: number
    rounds_of_sharing: number
}

function get_initial_state (): ConfigState
{
    let target_time_share_minutes = default_target_time_share_minutes
    let rounds_of_sharing = default_rounds_of_sharing

    // Get state from URL
    const { time_str, rounds_str } = get_state_from_url()

    if (time_str)
    {
        target_time_share_minutes = parseFloat(time_str)
    }

    if (rounds_str)
    {
        rounds_of_sharing = parseInt(rounds_str)
    }

    return {
        target_time_share_minutes,
        rounds_of_sharing,
    }
}


const initial_state = get_initial_state()

export const config_slice = createSlice({
    name: "config",
    // `createSlice` will infer the state type from the `initial_state` argument
    initialState: initial_state,
    reducers: {
        update_target_time_share_minutes: (state, action: PayloadAction<number>) =>
        {
            if (action.payload < 0 || Number.isNaN(action.payload)) return state

            return { ...state, target_time_share_minutes: action.payload }
        },
        update_rounds_of_sharing: (state, action: PayloadAction<number>) =>
        {
            if (action.payload < 0 || Number.isNaN(action.payload)) return state

            return { ...state, rounds_of_sharing: action.payload }
        },
    },
})

export const { update_target_time_share_minutes, update_rounds_of_sharing } = config_slice.actions

// Other code such as selectors can use the imported `RootState` type
export const select_target_time_share_s = (state: RootState) => state.config.target_time_share_minutes * 60
export const select_target_time_share_minutes = (state: RootState) => state.config.target_time_share_minutes
export const select_rounds_of_sharing = (state: RootState) => state.config.rounds_of_sharing

export default config_slice.reducer
