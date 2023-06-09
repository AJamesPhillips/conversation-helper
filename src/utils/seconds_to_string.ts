

export function seconds_to_string (seconds: number)
{
    const partial_seconds = seconds % 60
    const minutes = Math.floor(seconds / 60)

    let time_string = ""

    if (minutes) {
        time_string += `${minutes}m`
    }

    if (partial_seconds)
    {
        time_string += ` ${partial_seconds}s`
    }

    return time_string
}
