import { set_current_datetime } from "./activity_log"
import { useAppDispatch } from "./hooks"


let started = false

export function start_heart_beat ()
{
    const dispatch = useAppDispatch()

    if (started) return
    started = true

    setInterval(() =>
    {
        dispatch(set_current_datetime(new Date()))
    }, 100)
}
