

export interface Person
{
    id: string
    name: string
    deleted?: boolean
}


export interface LogEntry
{
    person_id: string
    start_datetime: Date
    stop_datetime?: Date
}
