import preactLogo from "./assets/preact.svg"
import "./app.css"
import { Buttons } from "./components/Buttons"
import { LogList } from "./components/LogList"
import { LogEntry, Person } from "./interfaces"



export function App ()
{
    const people: Person[] = [
        "Shirley",
        "Jeremy",
        "James",
    ]
    const target_time_share = 60 * 2
    const logs: LogEntry[] = [
        { person: "James", start_datetime: new Date(new Date().getTime() - (target_time_share * 1000)) }
    ]

    return <>
        {/* <img src={preactLogo} class="logo preact" alt="Preact logo" /> */}
        <Buttons people={people} />
        <LogList />
    </>
}





// function interval_updater ()
// {
//     setInterval(() =>
//     {
//         update_log_list(el_log_list, logs)
//         update_person_size(el_people_button_refs, logs)
//     }, 200)
// }


// function toggle_person_activity (person: Person, logs: LogEntry[])
// {
//     const current_datetime = new Date()
//     const last_log_entry = get_last_element(logs)

//     let stopped_previous = false
//     if (last_log_entry && !last_log_entry.stop_datetime)
//     {
//         last_log_entry.stop_datetime = current_datetime
//         stopped_previous = true
//     }

//     if (!last_log_entry || (stopped_previous && last_log_entry.person !== person)  || (!stopped_previous && last_log_entry.person === person))
//     {
//         const log_entry: LogEntry = {
//             person,
//             start_datetime: current_datetime,
//         }
//         logs.push(log_entry)
//     }
// }

// function update_log_list (el_log_list: HTMLElement, logs: LogEntry[])
// {
//     let log_list_HTLM_string = ""

//     for (let i = logs.length - 1; i >= 0; --i)
//     {
//         const log = logs[i]
//         const stop_datetime = log.stop_datetime || new Date()
//         log_list_HTLM_string += `<div> <span>${log.person}</span> <span>${elapsed_time_str(log.start_datetime, stop_datetime)}</span> </div>`
//     }

//     el_log_list.innerHTML = log_list_HTLM_string
// }


// function elapsed_time_ms (datetime1: Date, datetime2?: Date)
// {
//     if (!datetime2) return undefined

//     return datetime2.getTime() - datetime1.getTime()
// }


// function elapsed_time_str (datetime1: Date, datetime2?: Date)
// {
//     const time_diff_ms = elapsed_time_ms(datetime1, datetime2)

//     if (time_diff_ms === undefined) return ""

//     const time_diff_s = Math.round(time_diff_ms / 1000)

//     return seconds_to_string(time_diff_s)
// }


// function update_person_size (el_people_button_refs: PersonButtonRefs, logs: LogEntry[])
// {
//     const person_times: {[index: Person]: number} = {}

//     people.forEach(person => person_times[person] = 0)

//     logs.forEach((log, i) =>
//     {
//         const stop_datetime = log.stop_datetime || new Date()
//         let total_time_elapsed = person_times[log.person] || 0
//         total_time_elapsed += ((elapsed_time_ms(log.start_datetime, stop_datetime) || 0) / 1000)
//         person_times[log.person] = total_time_elapsed
//     })

//     const min_time = Math.min(...Object.values(person_times))

//     Object.entries(el_people_button_refs).forEach(([person, el_button]) =>
//     {
//         const person_time = person_times[person] - min_time

//         const seconds_overshare = Math.max(person_time - target_time_share, 0)

//         const button_size_ratio = 1 - Math.min(seconds_overshare / target_time_share, 1)

//         el_button.style.fontSize = person_size(button_size_ratio)
//     })
// }









// function run_tests ()
// {
//     let logs: LogEntry[] = []
//     toggle_person_activity("Al", logs)


// }

// // run_tests()
