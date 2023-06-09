import { describe, expect, it } from "vitest"
import { _toggle_person_activity, toggle_person_activity } from "./activity_log"


describe("test _toggle_person_activity", () =>
{
    it("no activities", () =>
    {
        const { entries } = _toggle_person_activity({ entries: [] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(1)
        expect(entries[0].person).toEqual("Alice")
        expect(entries[0].start_datetime.getTime()).to.be.approximately(new Date().getTime(), 10)
        expect(entries[0].stop_datetime).to.be.undefined
    })


    it("person is active", () =>
    {
        const { entries } = _toggle_person_activity({ entries: [
            {
                person: "Alice",
                start_datetime: new Date(),
            }
        ] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(1)
        expect(entries[0].person).toEqual("Alice")
        expect(entries[0].stop_datetime?.getTime()).to.be.approximately(new Date().getTime(), 10)
    })


    it("person is inactive", () =>
    {
        const { entries } = _toggle_person_activity({ entries: [
            {
                person: "Alice",
                start_datetime: new Date(),
                stop_datetime: new Date(),
            }
        ] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(2)
        expect(entries[1].person).toEqual("Alice")
        expect(entries[1].start_datetime.getTime()).to.be.approximately(new Date().getTime(), 10)
        expect(entries[1].stop_datetime).to.be.undefined
    })


    it("someone else is active", () =>
    {
        const { entries } = _toggle_person_activity({ entries: [
            {
                person: "Bob",
                start_datetime: new Date(),
                stop_datetime: undefined,
            }
        ] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(2)
        expect(entries[1].person).toEqual("Alice")
        expect(entries[1].start_datetime.getTime()).to.be.approximately(new Date().getTime(), 10)
        expect(entries[1].stop_datetime).to.be.undefined
    })


    it("someone else is inactive", () =>
    {
        const { entries } = _toggle_person_activity({ entries: [
            {
                person: "Bob",
                start_datetime: new Date(),
                stop_datetime: new Date(),
            }
        ] }, toggle_person_activity("Alice"))
        expect(entries.length).toEqual(2)
        expect(entries[1].person).toEqual("Alice")
        expect(entries[1].start_datetime.getTime()).to.be.approximately(new Date().getTime(), 10)
        expect(entries[1].stop_datetime).to.be.undefined
    })
})
