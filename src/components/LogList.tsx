// import "./LogList.css"

import { useState } from "react"
import { select_activity_log_entries, select_current_datetime } from "../state/activity_log"
import { useAppSelector } from "../state/hooks"
import { select_non_deleted_people } from "../state/people"
import { calculate_person_shares } from "../state/utils/calculate_person_shares"
import { seconds_to_string } from "../utils/time"
import { LogEntryRow } from "./LogEntry"


export function LogList ()
{
    const [show_logs, set_show_logs] = useState(false)

    const non_deleted_people = useAppSelector(select_non_deleted_people)
    const log_entries = useAppSelector(select_activity_log_entries)
    const current_datetime = useAppSelector(select_current_datetime)

    const { time_per_person_s } = calculate_person_shares(non_deleted_people, log_entries, current_datetime)

    return <>
        <button onClick={() => set_show_logs(!show_logs)}>
            {show_logs ? "Hide logs" : "Show logs"}
        </button>

        <div style={{ opacity: show_logs ? 1 : 0 }}>
            {/* {current_datetime.getTime()} */}
            <h3>Contributions</h3>
            {log_entries.length ? "" : "No contributions yet, create a person and click their button to show they're contributing."}

            {[...log_entries].reverse().map(log_entry => <LogEntryRow
                key={log_entry.start_datetime.getTime()}
                log_entry={log_entry}
            />)}

            <h3>Total time</h3>
            {non_deleted_people.map(person =>
            {
                return <div>{person.name}: {seconds_to_string(Math.round(time_per_person_s[person.id]))}</div>
            })}
        </div>
    </>
}
