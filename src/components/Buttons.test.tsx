import { describe, expect, it } from "vitest"
import { calculate_min_min2_times } from "./Buttons"


describe("test calculate_min_min2_times", () =>
{
    it("no people", () =>
    {
        expect(calculate_min_min2_times({})).toEqual({ min_time: 0, min2_time: 0 })
    })

    it("one person", () =>
    {
        expect(calculate_min_min2_times({ "Sam": 10 })).toEqual({ min_time: 10, min2_time: 10 })
    })

    it("two people, same", () =>
    {
        expect(calculate_min_min2_times({ "Sam": 10, "Lee": 10 })).toEqual({ min_time: 10, min2_time: 10 })
    })

    it("two people, different", () =>
    {
        expect(calculate_min_min2_times({ "Sam": 10, "Lee": 40 })).toEqual({ min_time: 10, min2_time: 40 })
    })

    it("three people, two same, one different", () =>
    {
        expect(calculate_min_min2_times({ "Sam": 10, "Lee": 10, "Alex": 40 })).toEqual({ min_time: 10, min2_time: 10 })
    })

    it("three people, two same, one different, reversed order", () =>
    {
        // This ensures that min2_time is also set correctly
        expect(calculate_min_min2_times({ "Alex": 40, "Sam": 10, "Lee": 10 })).toEqual({ min_time: 10, min2_time: 10 })
    })

    it("three people different", () =>
    {
        expect(calculate_min_min2_times({ "Sam": 10, "Lee": 20, "Alex": 40 })).toEqual({ min_time: 10, min2_time: 20 })
    })
})
