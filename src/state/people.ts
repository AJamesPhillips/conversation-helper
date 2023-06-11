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
        {id: "shirley", name: "Shirley"},
        {id: "jeremy", name: "Jeremy"},
        {id: "james", name: "James"},
    ]
}

export const people_slice = createSlice({
    name: "people",
    // `createSlice` will infer the state type from the `initial_state` argument
    initialState: initial_state,
    reducers: {
        add_person: (state, action: PayloadAction<string>) =>
        {
            const new_person_name = action.payload

            const existing_person = state.people.find(person => people_are_same_name(person, new_person_name))
            if (existing_person)
            {
                if (!existing_person.deleted) return state
                else return update_person(state,
                    person => people_are_same_name(person, new_person_name),
                    person => ({
                        ...person,
                        name: new_person_name,
                        deleted: false,
                    })
                )
            }

            const new_person: Person = { id: new_person_name.toLowerCase(), name: new_person_name }

            return { ...state, people: [...state.people, new_person] }
        },
        remove_person: (state, action: PayloadAction<Person>) =>
        {
            return update_person(state,
                person => people_are_same(person, action.payload),
                person => ({...person, deleted: true})
            )
        },
    },
})

export const { add_person, remove_person } = people_slice.actions

// Other code such as selectors can use the imported `RootState` type
export const select_people = (state: RootState) => state.people.people
export const select_person_by_id = (state: RootState) => (person_id: string): Person => state.people.people.find(p => p.id === person_id) || { id: "unknown", name: "Unknown"}

export default people_slice.reducer


export function people_are_same_name (person1: Person, person2_name: string)
{
    return person1.name.toLowerCase() === person2_name.toLowerCase()
}

export function people_are_same (person1: Person, person2: Person)
{
    return person1.id === person2.id
}


function update_person (state: PeopleState, filter_fn: (person: Person) => boolean, update_fn: (person: Person) => Person)
{
    let made_change = false

    const new_people = [...state.people]
        .map(person =>
        {
            if (!filter_fn(person)) return person

            made_change = true

            return update_fn(person)
        })

    return made_change ? { ...state, people: new_people } : state
}
