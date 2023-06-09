import { useMemo } from "react"

import { Person } from "../interfaces"
import { bound, lerp } from "../utils/math"


interface Props
{
    person: Person
}

export function Button (props: Props)
{
    const on_click_handler = useMemo(() => () =>
    {
        // toggle_person_activity(person, logs)
        // update_log_list(el_log_list, logs)
    }, [props.person])

    return <button
        onClick={on_click_handler}
        style={{
            fontSize: person_size(1),
        }}
    >
        {props.person}
    </button>
}


function person_size (size: number): string
{
    size = bound(size, 0, 1)
    size = lerp(size, 15, 90)

    return `${size}px`
}
