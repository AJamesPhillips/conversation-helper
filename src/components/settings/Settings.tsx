// import "./Settings.css"

import { useAppSelector } from "../../state/hooks"
import { select_show_settings } from "../../state/view"
import { PeopleList } from "./PeopleList"



export function Settings() {
    const show_settings = useAppSelector(select_show_settings)

    if (!show_settings) return null

    return <>
        <PeopleList />
        <hr />
    </>
}
