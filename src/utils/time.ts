

export function elapsed_time_ms (datetime1: Date, datetime2?: Date)
{
    if (!datetime2) return undefined

    return datetime2.getTime() - datetime1.getTime()
}


export function elapsed_time_str (datetime1: Date, datetime2?: Date)
{
    const time_diff_ms = elapsed_time_ms(datetime1, datetime2)

    if (time_diff_ms === undefined) return ""

    const time_diff_s = Math.round(time_diff_ms / 1000)

    return seconds_to_string(time_diff_s, { always_include_seconds: true })
}


export function seconds_to_string (seconds: number, options?: { always_include_minutes?: boolean, always_include_seconds?: boolean })
{
    const partial_seconds = seconds % 60
    const minutes = Math.floor(seconds / 60)

    let time_string = ""

    if (minutes || options?.always_include_minutes)
    {
        time_string += `${minutes}m`
    }

    if (partial_seconds || options?.always_include_seconds)
    {
        time_string += ` ${partial_seconds}s`
    }

    return time_string
}
