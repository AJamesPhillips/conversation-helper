import { useEffect } from "react"
import { LogEntry } from "../interfaces"
import { elapsed_time_str } from "../utils/time"
import { useState } from "react"


export function LogEntryRow (props: { log_entry: LogEntry })
{
    const { person, start_datetime, stop_datetime } = props.log_entry

    const [_, force_update] = useState({})


    useEffect(() =>
    {
        if (stop_datetime) return undefined

        const timeout_id = setTimeout(() => force_update({}), 100)

        return () => clearTimeout(timeout_id)
    })

    return <div>
        <span>{person}</span>
        &nbsp;
        <span>{elapsed_time_str(start_datetime, stop_datetime || new Date())}</span>
    </div>
}
