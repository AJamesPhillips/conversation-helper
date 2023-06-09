import "./Buttons.css"
import { Button } from "./Button"
import { useAppSelector } from "../state/hooks"
import { select_people } from "../state/people"
import { select_activity_log_entries } from "../state/activity_log"
import { Person, LogEntry } from "../interfaces"
import { elapsed_time_ms } from "../utils/time"
import { select_target_time_share } from "../state/config"
import { useState, useEffect } from "react"



export function Buttons ()
{
    const people = useAppSelector(select_people)
    const log_entries = useAppSelector(select_activity_log_entries)
    const target_time_share = useAppSelector(select_target_time_share)
    const person_size = calculate_person_size(people, log_entries, target_time_share)


    const [_, force_update] = useState({})

    useEffect(() =>
    {
        const timeout_id = setTimeout(() => force_update({}), 100)

        return () => clearTimeout(timeout_id)
    })

    return <div id="buttons">
        {people.map(person => <Button
            key={person}
            person={person}
            size={person_size[person]}
        />)}
    </div>
}



function calculate_person_size (people: Person[], logs: LogEntry[], target_time_share: number)
{
    const time_per_person_s: {[index: Person]: number} = {}
    people.forEach(person => time_per_person_s[person] = 0)

    logs.forEach(log =>
    {
        const stop_datetime = log.stop_datetime || new Date()
        let total_time_elapsed = time_per_person_s[log.person] || 0
        total_time_elapsed += ((elapsed_time_ms(log.start_datetime, stop_datetime) || 0) / 1000)
        time_per_person_s[log.person] = total_time_elapsed
    })

    const min_time = Math.min(...Object.values(time_per_person_s))

    const person_size: {[index: Person]: number} = {}
    people.forEach(person =>
    {
        const normalised_time_per_person_s = time_per_person_s[person] - min_time

        const seconds_overshare = Math.max(normalised_time_per_person_s - target_time_share, 0)

        const button_size_ratio = 1 - Math.min(seconds_overshare / target_time_share, 1)

        person_size[person] = button_size_ratio
    })

    return person_size
}
