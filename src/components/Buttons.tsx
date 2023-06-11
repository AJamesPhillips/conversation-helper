import "./Buttons.css"
import { Button } from "./Button"
import { useAppSelector } from "../state/hooks"
import { select_non_deleted_people } from "../state/people"
import { select_activity_log_entries, select_current_datetime } from "../state/activity_log"
import { select_target_time_share_s } from "../state/config"
import { calculate_person_shares } from "../state/utils/calculate_person_shares"



export function Buttons ()
{
    const non_deleted_people = useAppSelector(select_non_deleted_people)
    const log_entries = useAppSelector(select_activity_log_entries)
    const target_time_share_s = useAppSelector(select_target_time_share_s)
    const current_datetime = useAppSelector(select_current_datetime)

    const { min_time, min2_time, time_per_person_s, active_person } = calculate_person_shares(non_deleted_people, log_entries, current_datetime)

    return <div id="buttons">
        {non_deleted_people
            .map(person => <Button
                key={person.id}
                person={person}
                is_active={active_person[person.id]}
                time_taken_s={time_per_person_s[person.id]}
                target_time_share_s={target_time_share_s}
                global_min_time_taken_s={min_time}
                global_min2_time_taken_s={min2_time}
            />)
        }
    </div>
}
