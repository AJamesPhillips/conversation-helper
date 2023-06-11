import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"


// Define a type for the slice state
interface ViewState
{
    show_settings: boolean
    show_times: boolean
}

// Define the initial state using that type
const initial_state: ViewState =
{
    show_settings: false,
    show_times: false,
}

export const view_slice = createSlice({
    name: "view",
    // `createSlice` will infer the state type from the `initial_state` argument
    initialState: initial_state,
    reducers: {
        toggle_show_settings: state =>
        {
            state.show_settings = !state.show_settings
        },
        set_show_settings: (state, action: PayloadAction<boolean>) =>
        {
            state.show_settings = action.payload
        },
        set_show_times: (state, action: PayloadAction<boolean>) =>
        {
            return {
                ...state,
                show_times: action.payload,
            }
        },
    },
})

export const { toggle_show_settings, set_show_settings, set_show_times } = view_slice.actions

// Other code such as selectors can use the imported `RootState` type
export const select_show_settings = (state: RootState) => state.view.show_settings
export const select_show_times = (state: RootState) => state.view.show_times

export default view_slice.reducer
