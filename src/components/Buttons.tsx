import "./Buttons.css"
import { Person } from "./interfaces"
import { Button } from "./Button"


interface Props
{
    people: Person[]
}

export function Buttons (props: Props)
{
    return <div id="buttons">
        {props.people.map(person => <Button key={person} person={person} />)}
    </div>
}
