

export interface UnderOvershareTimeArgs
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
