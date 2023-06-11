import settings_icon from "./assets/settings.svg"
import "./app.css"
import { Buttons } from "./components/Buttons"
import { LogList } from "./components/LogList"
import { useAppDispatch } from "./state/hooks"
import { toggle_show_settings } from "./state/view"
import { Settings } from "./components/settings/Settings"
import { start_heart_beat } from "./state/heartbeat"
import { sync_state_with_url } from "./state/sync_state_with_url"



export function App ()
{
    start_heart_beat()
    sync_state_with_url()

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
