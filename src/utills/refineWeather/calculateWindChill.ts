export const calculateWindChill = (temperature: number, windSpeed: number): number => {
    return (
        Math.floor(
            13.12 +
            0.6215 * temperature -
            11.37 * Math.pow(windSpeed, 0.16) +
            0.3965 * temperature * Math.pow(windSpeed, 0.16)
        )
    )
}