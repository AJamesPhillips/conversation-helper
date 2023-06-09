import { useMemo } from "react"

import { LogEntry, Person } from "../interfaces"
import { bound, lerp } from "../utils/math"
import { useAppDispatch, useAppSelector } from "../state/hooks"
import { select_activity_log_entries, toggle_person_activity } from "../state/activity_log"
import { elapsed_time_ms } from "../utils/time"
import { select_people } from "../state/people"


interface Props
{
    person: Person
    size: number
}

export function Button (props: Props)
{
    const dispatch = useAppDispatch()

    const on_click_handler = () =>
    {
        dispatch(toggle_person_activity(props.person))
    }

    return <button
        onClick={on_click_handler}
        style={{
            fontSize: person_size(props.size),
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
