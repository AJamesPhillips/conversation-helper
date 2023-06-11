import { describe, expect, it } from "vitest"
import { _toggle_person_activity, toggle_person_activity } from "./activity_log"


describe("test _toggle_person_activity", () =>
{
    it("no activities", () =>
    {
        const current_datetime = new Date()
        const { entries } = _toggle_person_activity({ current_datetime, entries: [] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(1)
        expect(entries[0].person_id).toEqual("Alice")
        expect(entries[0].start_datetime.getTime()).toEqual(current_datetime.getTime())
        expect(entries[0].stop_datetime).to.be.undefined
    })


    it("person is active", () =>
    {
        const current_datetime = new Date()
        const { entries } = _toggle_person_activity({ current_datetime, entries: [
            {
                person_id: "Alice",
                start_datetime: new Date(),
            }
        ] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(1)
        expect(entries[0].person_id).toEqual("Alice")
        expect(entries[0].stop_datetime?.getTime()).toEqual(current_datetime.getTime())
    })


    it("person is inactive", () =>
    {
        const current_datetime = new Date()
        const { entries } = _toggle_person_activity({ current_datetime, entries: [
            {
                person_id: "Alice",
                start_datetime: new Date(),
                stop_datetime: new Date(),
            }
        ] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(2)
        expect(entries[1].person_id).toEqual("Alice")
        expect(entries[1].start_datetime.getTime()).toEqual(current_datetime.getTime())
        expect(entries[1].stop_datetime).to.be.undefined
    })


    it("someone else is active", () =>
    {
        const current_datetime = new Date()
        const { entries } = _toggle_person_activity({ current_datetime, entries: [
            {
                person_id: "Bob",
                start_datetime: new Date(),
                stop_datetime: undefined,
            }
        ] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(2)
        expect(entries[1].person_id).toEqual("Alice")
        expect(entries[1].start_datetime.getTime()).toEqual(current_datetime.getTime())
        expect(entries[1].stop_datetime).to.be.undefined
    })


    it("someone else is inactive", () =>
    {
        const current_datetime = new Date()
        const { entries } = _toggle_person_activity({ current_datetime, entries: [
            {
                person_id: "Bob",
                start_datetime: new Date(),
                stop_datetime: new Date(),
            }
        ] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(2)
        expect(entries[1].person_id).toEqual("Alice")
        expect(entries[1].start_datetime.getTime()).toEqual(current_datetime.getTime())
        expect(entries[1].stop_datetime).to.be.undefined
    })
})
