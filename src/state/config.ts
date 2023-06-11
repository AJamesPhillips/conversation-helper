import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "./store"


export const default_target_time_share_seconds = 180

// Define a type for the slice state
interface ConfigState
{
    target_time_share_seconds: number
}

// Define the initial state using that type
const initial_state: ConfigState =
{
    target_time_share_seconds: default_target_time_share_seconds,
}

export const config_slice = createSlice({
    name: "config",
    // `createSlice` will infer the state type from the `initial_state` argument
    initialState: initial_state,
    reducers: {
    },
})

export const { } = config_slice.actions

// Other code such as selectors can use the imported `RootState` type
export const select_target_time_share_s = (state: RootState) => state.config.target_time_share_seconds

export default config_slice.reducer
