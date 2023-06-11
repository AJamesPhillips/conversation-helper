import { Person } from "../interfaces"
import { lerp } from "../utils/math"
import { useAppDispatch, useAppSelector } from "../state/hooks"
import { toggle_person_activity } from "../state/activity_log"
import { seconds_to_string } from "../utils/time"
import { select_show_times, set_show_times } from "../state/view"


interface Props
{
    person: Person
    is_active: boolean
    time_taken_s: number
    target_time_share_s: number
    global_min_time_taken_s: number
    global_min2_time_taken_s: number
}

export function Button (props: Props)
{
    const dispatch = useAppDispatch()

    const on_click_handler = () =>
    {
        dispatch(toggle_person_activity(props.person))
    }

    const time_taken_str = seconds_to_string(Math.round(props.time_taken_s), {
        always_include_seconds: true,
    })
    const shows_times = useAppSelector(select_show_times)

    const size = calculate_person_size_ratio(props)

    return <span>
        <button
            onClick={on_click_handler}
            style={{ fontSize: person_px_size(size) }}
            onPointerEnter={() => dispatch(set_show_times(true))}
            onPointerLeave={() => dispatch(set_show_times(false))}
        >
            <Star {...props} size={size} />
            {props.person.name}
            <Star {...props} size={size} />

            <div style={{ fontSize: 10, color: `rgba(0, 0, 0, ${shows_times ? 1 : 0})` }}>
                {/* credit: */} {underovershare_time_str(props)}
                 {/* &nbsp; total: {time_taken_str} */}
            </div>

        </button>
    </span>
}


function Star (props: { is_active: boolean, size: number })
{
    return <span
        style={{
            opacity: props.is_active ? 1 : 0,
            fontSize: star_px_size(props.size),
        }}
    >
        &nbsp;{props.size === 1 ? "\u272E" : "\u2729"}&nbsp;
    </span>
}


interface CalculatePersonSizeRatioArgs
{
    time_taken_s: number
    target_time_share_s: number
    global_min_time_taken_s: number
}
function calculate_person_size_ratio ({ time_taken_s, target_time_share_s, global_min_time_taken_s }: CalculatePersonSizeRatioArgs)
{
    const normalised_time_per_person_s = time_taken_s - global_min_time_taken_s

    const seconds_overshare = Math.max(normalised_time_per_person_s - target_time_share_s, 0)

    const size_ratio = 1 - Math.min(seconds_overshare / target_time_share_s, 1)

    return size_ratio
}


function star_px_size (size: number): number
{
    return lerp(size, 20, 60)
}

function person_px_size (size: number): number
{
    return lerp(size, 15, 90)
}


interface UnderOvershareTimeArgs
{
    time_taken_s: number
    target_time_share_s: number
    global_min_time_taken_s: number
    global_min2_time_taken_s: number
}
export function underovershare_time ({ time_taken_s, target_time_share_s, global_min_time_taken_s, global_min2_time_taken_s }: UnderOvershareTimeArgs)
{
    const base_line = time_taken_s === global_min_time_taken_s ? global_min2_time_taken_s : global_min_time_taken_s
    return target_time_share_s - time_taken_s + base_line
}

function underovershare_time_str (args: UnderOvershareTimeArgs)
{
    const underovershare = Math.round(underovershare_time(args))

    return underovershare >= 0
        ? seconds_to_string(underovershare, { always_include_seconds: true })
        : `-${seconds_to_string(-underovershare, { always_include_seconds: true })}`
}
