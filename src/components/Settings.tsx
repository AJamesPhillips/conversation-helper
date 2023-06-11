// import "./Settings.css"

import { useAppSelector } from "../state/hooks"
import { select_show_settings } from "../state/view"

export function Settings() {
    const show_settings = useAppSelector(select_show_settings)

    return <>
        {/* {show_settings ? "1" : "0"} */}
    </>
}
