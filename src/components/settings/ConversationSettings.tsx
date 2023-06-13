import { useState } from "react"
import { select_rounds_of_sharing, select_target_time_share_minutes, update_rounds_of_sharing, update_target_time_share_minutes } from "../../state/config"
import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { select_non_deleted_people } from "../../state/people"



export function ConversationSettings ()
{
    const no_people = useAppSelector(select_non_deleted_people).length
    const [target_time_share_minutes, set_target_time_share_minutes] = useState(useAppSelector(select_target_time_share_minutes))
    const [rounds_of_sharing, set_rounds_of_sharing] = useState(useAppSelector(select_rounds_of_sharing))

    let conversation_length_minutes: string | number = rounds_of_sharing * no_people * target_time_share_minutes
    conversation_length_minutes = Number.isNaN(conversation_length_minutes) ? "..." : conversation_length_minutes

    const dispatch = useAppDispatch()

    return <>
        <h3>Conversation Settings</h3>
        <div>
            Sharing time per person <input
                type="number"
                style={{ width: 50 }}
                value={target_time_share_minutes}
                onChange={e => set_target_time_share_minutes(parseFloat((e.target as HTMLInputElement).value))}
                onBlur={e => dispatch(update_target_time_share_minutes(target_time_share_minutes))}
            /> (minutes)
        </div>
        <div>
            Rounds of sharing <input
                type="number"
                style={{ width: 50 }}
                value={rounds_of_sharing}
                onChange={e => set_rounds_of_sharing(parseFloat((e.target as HTMLInputElement).value))}
                onBlur={e => dispatch(update_rounds_of_sharing(rounds_of_sharing))}
            />
        </div>
        <div>
            Number of people: {no_people}
        </div>
        <div>
            Total time: {conversation_length_minutes} (minutes)
        </div>
    </>
}
