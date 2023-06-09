

export function bound (val: number, min: number, max: number)
{
    return Math.min(Math.max(val, min), max)
}


export function lerp (i: number, a: number, b: number): number
{
    return a + ((b - a) * i)
}
