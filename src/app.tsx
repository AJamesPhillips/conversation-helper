import settings_icon from "./assets/settings.svg"
import "./app.css"
import { Buttons } from "./components/Buttons"
import { LogList } from "./components/LogList"
import { useAppDispatch, useAppSelector } from "./state/hooks"
import { toggle_show_settings } from "./state/view"
import { Settings } from "./components/Settings"
import { select_people } from "./state/people"



export function App ()
{
    const dispatch = useAppDispatch()

    return <>
        <header>
            <img
                src={settings_icon}
                alt="Settings icon"
                onClick={() => dispatch(toggle_show_settings())}
            />
        </header>
        <Settings />
        <Buttons />
        <LogList />
    </>
}
