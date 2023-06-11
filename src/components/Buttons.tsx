import "./Buttons.css"
import { Button } from "./Button"
import { useAppSelector } from "../state/hooks"
import { select_people } from "../state/people"
import { select_activity_log_entries, select_current_datetime } from "../state/activity_log"
import { Person, LogEntry } from "../interfaces"
import { elapsed_time_ms } from "../utils/time"
import { select_target_time_share_s } from "../state/config"



export function Buttons ()
{
    const people = useAppSelector(select_people)
    const log_entries = useAppSelector(select_activity_log_entries)
    const target_time_share_s = useAppSelector(select_target_time_share_s)
    const current_datetime = useAppSelector(select_current_datetime)

    const { min_time, min2_time, time_per_person_s, active_person } = calculate_person_shares(people, log_entries, current_datetime)

    return <div id="buttons">
        {people.map(person => <Button
            key={person}
            person={person}
            is_active={active_person[person]}
            time_taken_s={time_per_person_s[person]}
            target_time_share_s={target_time_share_s}
            global_min_time_taken_s={min_time}
            global_min2_time_taken_s={min2_time}
        />)}
    </div>
}



function calculate_person_shares (people: Person[], logs: LogEntry[], current_datetime: Date)
{
    const active_person: {[index: Person]: boolean} = {}
    const time_per_person_s: {[index: Person]: number} = {}
    people.forEach(person => time_per_person_s[person] = 0)

    logs.forEach(log =>
    {
        const stop_datetime = log.stop_datetime || current_datetime
        let total_time_elapsed = time_per_person_s[log.person] || 0
        total_time_elapsed += ((elapsed_time_ms(log.start_datetime, stop_datetime) || 0) / 1000)
        time_per_person_s[log.person] = total_time_elapsed

        if (!log.stop_datetime)
        {
            active_person[log.person] = true
        }
    })

    const { min_time, min2_time } = calculate_min_min2_times(time_per_person_s)

    return { min_time, min2_time, time_per_person_s, active_person }
}



export function calculate_min_min2_times (time_per_person_s: { [index: string]: number })
{
    let min_time = Number.POSITIVE_INFINITY
    let min2_time = Number.POSITIVE_INFINITY
    Object.values(time_per_person_s).forEach(v => {
        if (v < min_time)
        {
            min2_time = min_time
            min_time = v
        }
        else if (v < min2_time)
        {
            min2_time = v
        }
    })

    if (!Number.isFinite(min_time)) min_time = 0
    if (!Number.isFinite(min2_time)) min2_time = min_time

    return { min_time, min2_time }
}
