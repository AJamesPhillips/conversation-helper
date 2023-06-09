import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Person } from "../interfaces"


// Define a type for the slice state
interface PeopleState
{
    people: Person[]
}

// Define the initial state using that type
const initial_state: PeopleState =
{
    people: [
        "Shirley",
        "Jeremy",
        "James",
    ]
}

export const people_slice = createSlice({
    name: "people",
    // `createSlice` will infer the state type from the `initial_state` argument
    initialState: initial_state,
    reducers: {
    },
})

export const { } = people_slice.actions

// Other code such as selectors can use the imported `RootState` type
export const select_people = (state: RootState) => state.people.people

export default people_slice.reducer
