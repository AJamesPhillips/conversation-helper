import { useState } from "react"
import { Person } from "../../interfaces"
import { useAppSelector, useAppDispatch } from "../../state/hooks"
import { select_people, remove_person, add_person, people_are_same } from "../../state/people"



export function PeopleList ()
{
    const people = useAppSelector(select_people)
    const [show_edit_options, set_show_edit_options] = useState(false)

    return <div
        onPointerEnter={() => set_show_edit_options(true)}
        onPointerLeave={() => set_show_edit_options(false)}
    >
        <h3>People</h3>
        {people.map(person => <PersonRow
            key={person}
            person={person}
            show_edit_options={show_edit_options}
        />)}

        <NewPersonForm show_edit_options={show_edit_options} existing_people={people} />
    </div>
}


function PersonRow (props: { person: Person, show_edit_options: boolean })
{
    const dispatch = useAppDispatch()

    return <div>
        <div style={{ display: "inline-flex" }}>
            {props.person} &nbsp;
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
        || (props.existing_people.find(p => people_are_same(p, new_person_name)) && "Already have person of that name")
    )

    return <div style={{ opacity: props.show_edit_options ? 1 : 0 }}>
        <input
            type="text"
            value={new_person_name}
            onChange={e => set_new_person_name(e.target.value)}
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
