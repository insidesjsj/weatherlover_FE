export const getFormattedDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줍니다.
    const day = date.getDate().toString().padStart(2, '0'); // 일자를 가져옵니다.
    const days = date.getDay()
    return `${month}/${day}`
}

export const getFormattedDays = (date: Date): string => {
    const datIndex = date.getDay()
    const days: string[] = ['일', '월', '화', '수', '목', '금', '토']
    const currentDay:string = days[datIndex]
    return `${currentDay}`
}

export const getDate = (index: number): string => {
    const today = new Date()
    const date = new Date(today)
    date.setDate(today.getDate() + index)  // setDate를 호출하여 날짜를 변경합니다.

    return getFormattedDate(date)
}

export const getDays = (index: number): string => {
    const today = new Date()
    const date = new Date(today)
    date.setDate(today.getDate() + index)  // setDate를 호출하여 날짜를 변경합니다.

    return getFormattedDays(date)
}