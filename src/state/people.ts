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
        add_person: (state, action: PayloadAction<Person>) =>
        {
            const new_person = action.payload

            if (state.people.find(person => people_are_same(person, new_person))) return state

            return { ...state, people: [...state.people, new_person] }
        },
        remove_person: (state, action: PayloadAction<Person>) =>
        {
            const people = state.people.filter(person => !people_are_same(person, action.payload))
            return { ...state, people }
        },
    },
})

export const { add_person, remove_person } = people_slice.actions

// Other code such as selectors can use the imported `RootState` type
export const select_people = (state: RootState) => state.people.people

export default people_slice.reducer


export function people_are_same (person1: Person, person2: Person)
{
    return person1.toLowerCase() === person2.toLowerCase()
}
