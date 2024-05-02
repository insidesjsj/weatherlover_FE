import sunny from '../../assets/img/TEMP/sunny.png'
import rain from '../../assets/img/TEMP/rain.png'
import cloudy from '../../assets/img/TEMP/cloudy.png'
import cloud from '../../assets/img/TEMP/cloud.png'
import snow from '../../assets/img/TEMP/snow.png'
import shower from '../../assets/img/TEMP/shower.png'
import rain_snow from '../../assets/img/TEMP/rain_snow.png'

export const refineWf = (wf: string) => {
    switch (wf) {
        case "맑음" :
            return `${sunny}`
        case "구름많음" :
            return `${cloudy}`
        case "구름많고 비" && "흐리고 비" :
            return `${rain}`
        case "구름많고 눈" && "흐리고 눈" :
            return `${snow}`
        case "구름많고 비/눈" && "흐리고 비/눈" :
            return `${rain_snow}`
        case "구름많고 소나기" && "흐리고 소나기" :
            return `${shower}`
        case "흐림" :
            return `${cloud}`
        default :
            return `${sunny}`
    }
}