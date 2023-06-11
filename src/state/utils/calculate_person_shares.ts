import { Person, LogEntry } from "../../interfaces"
import { elapsed_time_ms } from "../../utils/time"



export function calculate_person_shares (people: Person[], logs: LogEntry[], current_datetime: Date)
{
    const active_person: {[index: string]: boolean} = {}
    const time_per_person_s: {[index: string]: number} = {}
    people.forEach(person => time_per_person_s[person.id] = 0)

    logs.forEach(log =>
    {
        const stop_datetime = log.stop_datetime || current_datetime
        let total_time_elapsed = time_per_person_s[log.person_id] || 0
        total_time_elapsed += ((elapsed_time_ms(log.start_datetime, stop_datetime) || 0) / 1000)
        time_per_person_s[log.person_id] = total_time_elapsed

        if (!log.stop_datetime)
        {
            active_person[log.person_id] = true
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
