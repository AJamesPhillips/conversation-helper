import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"


// Define a type for the slice state
interface ViewState
{
    show_settings: boolean
}

// Define the initial state using that type
const initial_state: ViewState =
{
    show_settings: false,
}

export const view_slice = createSlice({
    name: "view",
    // `createSlice` will infer the state type from the `initial_state` argument
    initialState: initial_state,
    reducers: {
        toggle_show_settings: (state) => {
            state.show_settings = !state.show_settings
        },
    },
})

export const { toggle_show_settings } = view_slice.actions

// Other code such as selectors can use the imported `RootState` type
export const select_show_settings = (state: RootState) => state.view.show_settings

export default view_slice.reducer
