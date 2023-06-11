import settings_icon from "./assets/settings.svg"
import "./app.css"
import { Buttons } from "./components/Buttons"
import { LogList } from "./components/LogList"
import { useAppDispatch } from "./state/hooks"
import { toggle_show_settings } from "./state/view"
import { Settings } from "./components/Settings"
import { start_heart_beat } from "./state/heartbeat"



export function App ()
{
    const dispatch = useAppDispatch()
    start_heart_beat(dispatch)

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
