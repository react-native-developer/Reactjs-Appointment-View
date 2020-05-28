// to fetch different btw hour
export function diff_hours(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}


// to fetch previous date
export function getPreviousDate(selectedDate) {
    const currentDayInMilli = new Date(selectedDate).getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const previousDayInMilli = currentDayInMilli - oneDay
    const previousDate = new Date(previousDayInMilli);
    return previousDate;
}


// to fetch next date
export function getNextDate(selectedDate) {
    const currentDayInMilli = new Date(selectedDate).getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const nextDayInMilli = currentDayInMilli + oneDay
    const nextDate = new Date(nextDayInMilli);
    return nextDate;
}