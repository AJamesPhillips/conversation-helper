import { set_current_datetime } from "./activity_log"
import { AppDispatch } from "./store"


let started = false

export function start_heart_beat (dispatch: AppDispatch)
{
    if (started) return
    started = true

    setInterval(() =>
    {
        dispatch(set_current_datetime(new Date()))
    }, 100)
}
