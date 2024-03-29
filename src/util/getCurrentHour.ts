export const getCurrentHour = setInterval(() => {
    const now = new Date()
    const hour = now.getHours()

    return hour
}, 1000)