export const getWeatherIcon = (skyState: string) => {
    console.log("getWeatherIcon - skyState : " + skyState)
    switch (skyState) {
        case "맑음" :
            return  {icon: "sunny", style: { fontSize: "50px", color: "red" }}
        case "구름 많음" :
            return {icon: "partly_cloudy_day", style: {fontSize: "50px", color: "gray"}}
        case "흐림" :
            return {icon: "cloud", style: {fontSize: "50px", color: "gray"}}
        case "비" :
            return {icon: "rainy", style: {fontSize: "50px", color: "blue"}}
        case "비/눈" :
            return {icon: "rainy_snow", style: {fontSize: "50px", color: "gray"}}
        case "눈" :
            return {icon: "snow", style: {fontSize: "50px", color: "gray"}}
        case "소나기" :
            return {icon: "raniy_heavy", style: {fontSize: "50px", color: "blue"}}
        default:
            return {icon: "", style: {fontSize: "", color: ""}}
    }
}