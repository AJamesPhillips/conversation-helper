


export function get_state_from_url ()
{
    // Pull state from URL, e.g. "/?people=Shirley,Jeremy,James&time=2"
    const params = new URLSearchParams(document.location.search)
    const people_strs = (params.get("people")?.split(",") || [])
        .filter(name => !!name)
    const time_str = params.get("time")
    const rounds_str = params.get("rounds")

    return { people_strs, time_str, rounds_str }
}
