

export type Person = string


export interface LogEntry
{
    person: string
    start_datetime: Date
    stop_datetime?: Date
}
