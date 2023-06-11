import { LogEntry, Person } from "../interfaces"
import { elapsed_time_str } from "../utils/time"
import { select_current_datetime } from "../state/activity_log"
import { useAppSelector } from "../state/hooks"
import { select_person_by_id } from "../state/people"


export function LogEntryRow (props: { log_entry: LogEntry })
{
    const { person_id, start_datetime, stop_datetime } = props.log_entry

    const person = useAppSelector(select_person_by_id)(person_id)

    if (stop_datetime) return <LogEntryRow_
        person={person}
        start_datetime={start_datetime}
        stop_datetime={stop_datetime}
    />
    else return <LogEntryRowWithCurrentDatetime_
        person={person}
        start_datetime={start_datetime}
    />
}



function LogEntryRow_ (props: { person: Person, start_datetime: Date, stop_datetime: Date })
{
    const { person, start_datetime, stop_datetime } = props

    return <div>
        <span>{person.name}</span>
        &nbsp;
        <span>{elapsed_time_str(start_datetime, stop_datetime)}</span>
    </div>
}


function LogEntryRowWithCurrentDatetime_ (props: { person: Person, start_datetime: Date })
{
    const { person, start_datetime } = props
    const current_datetime = useAppSelector(select_current_datetime)

    return <LogEntryRow_
        person={person}
        start_datetime={start_datetime}
        stop_datetime={current_datetime}
    />
}
