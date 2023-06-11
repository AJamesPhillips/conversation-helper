import { useState } from "react"

import { Person } from "../../interfaces"
import { useAppSelector, useAppDispatch } from "../../state/hooks"
import { select_non_deleted_people, remove_person, add_person, people_are_same_name } from "../../state/people"



export function PeopleList ()
{
    const people = useAppSelector(select_non_deleted_people)
    const [show_edit_options, set_show_edit_options] = useState(people.length === 0)

    return <div
        onPointerEnter={() => set_show_edit_options(true)}
        onPointerLeave={() => set_show_edit_options(false)}
    >
        <h3>People</h3>
        {people
            .map(person => <PersonRow
                key={person.id}
                person={person}
                show_edit_options={show_edit_options}
            />)
        }

        <NewPersonForm show_edit_options={show_edit_options} existing_people={people} />
    </div>
}


function PersonRow (props: { person: Person, show_edit_options: boolean })
{
    const dispatch = useAppDispatch()

    return <div>
        <div style={{ display: "inline-flex" }}>
            {props.person.name} &nbsp;
            <div
                style={{ opacity: props.show_edit_options ? 1 : 0, cursor: "pointer" }}
                title="Remove"
            >
                <div onPointerDown={() => dispatch(remove_person(props.person))}>{"\u232B"}</div>
            </div>
        </div>
    </div>
}


function NewPersonForm (props: { show_edit_options: boolean, existing_people: Person[] })
{
    const dispatch = useAppDispatch()
    const [new_person_name, set_new_person_name] = useState("")

    const invalid_new_person_name = (
        (new_person_name.length === 0 && "Must provide a name")
        || (props.existing_people.find(p => people_are_same_name(p, new_person_name) && !p.deleted) && "Already have person of that name")
    )

    const people = useAppSelector(select_non_deleted_people)
    const show_edit_options = props.show_edit_options || new_person_name.length > 0 || people.length === 0

    return <div style={{ opacity: show_edit_options ? 1 : 0.1 }}>
        <input
            type="text"
            value={new_person_name}
            onChange={e => set_new_person_name(e.target.value)}
            onKeyDown={e =>
            {
                if (e.key === "Enter")
                {
                    dispatch(add_person(new_person_name))
                    set_new_person_name("")
                }
            }}
        />
        <button
            onPointerDown={() =>
            {
                dispatch(add_person(new_person_name))
                set_new_person_name("")
            }}
            disabled={!!invalid_new_person_name}
            title={invalid_new_person_name}
        >
            Add
        </button>
    </div>
}
