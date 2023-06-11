// import "./Settings.css"

import { useAppDispatch, useAppSelector } from "../../state/hooks"
import { select_show_settings, set_show_settings } from "../../state/view"
import { ConversationSettings } from "./ConversationSettings"
import { PeopleList } from "./PeopleList"



export function Settings ()
{
    const dispatch = useAppDispatch()
    const show_settings = useAppSelector(select_show_settings)

    if (!show_settings) return null

    return <>
        <PeopleList />
        <ConversationSettings />
        <br />
        <br />
        <button onClick={() => dispatch(set_show_settings(false))}>
            Close settings
        </button>
        <hr />
    </>
}
