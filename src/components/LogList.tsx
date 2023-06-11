// import "./LogList.css"

import { select_activity_log_entries, select_current_datetime } from "../state/activity_log"
import { useAppSelector } from "../state/hooks"
import { LogEntryRow } from "./LogEntry"


export function LogList ()
{
    const log_entries = useAppSelector(select_activity_log_entries)
    const current_datetime = useAppSelector(select_current_datetime)

    return <>
        {/* {current_datetime.getTime()} */}
        {[...log_entries].reverse().map(log_entry => <LogEntryRow
            key={log_entry.start_datetime.getTime()}
            log_entry={log_entry}
        />)}
    </>
}
