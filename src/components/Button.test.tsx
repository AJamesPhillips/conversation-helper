import { describe, expect, it } from "vitest"
import { underovershare_time } from "./Button"
import { calculate_min_min2_times } from "./Buttons"
import { default_target_time_share_minutes } from "../state/config"


const target_time_share_s = default_target_time_share_minutes * 60
const target = target_time_share_s
const over_target = target_time_share_s * 2

describe("test underovershare_time", () =>
{
    describe("no other people", () =>
    {
        it("no sharing", () =>
        {
            const value = underovershare_time(get_args("Alice", { "Alice": 0 }))

            expect(value).toEqual(target_time_share_s)
        })

        it("shared to target", () =>
        {
            const value = underovershare_time(get_args("Alice", { "Alice": target }))

            expect(value).toEqual(target_time_share_s)
        })

        it("shared over target", () =>
        {
            const value = underovershare_time(get_args("Alice", { "Alice": over_target }))

            expect(value).toEqual(target_time_share_s)
        })
    })

    describe("one other person", () =>
    {
        it("no sharing, other shared to target", () =>
        {
            const value = underovershare_time(get_args("Alice", { "Alice": 0, "Bob": target }))

            expect(value).toEqual(over_target)
        })

        it("both shared to target", () =>
        {
            const value = underovershare_time(get_args("Alice", { "Alice": target, "Bob": target }))

            expect(value).toEqual(target_time_share_s)
        })

        it("shared to target, other not shared", () =>
        {
            const value = underovershare_time(get_args("Alice", { "Alice": target, "Bob": 0 }))

            expect(value).toEqual(0)
        })
    })
})



function get_args (person_name: string, time_per_person_s: {[index: string]: number})
{
    const { min_time, min2_time } = calculate_min_min2_times(time_per_person_s)

    return {
        time_taken_s: time_per_person_s[person_name],
        target_time_share_s,
        global_min_time_taken_s: min_time,
        global_min2_time_taken_s: min2_time,
    }
}
