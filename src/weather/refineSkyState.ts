import sunny from '../img/TEMP/sunny.png'
import rain from '../img/TEMP/rain.png'
import cloudy from '../img/TEMP/cloudy.png'
import cloud from '../img/TEMP/cloud.png'
import snow from '../img/TEMP/snow.png'
import shower from '../img/TEMP/shower.png'
import rain_snow from '../img/TEMP/rain_snow.png'

// 날씨 아이콘 설정하는 함수
export const refineSkyState = (PTY: string, SKY: string) => {
    if (PTY == "0") {
        switch (SKY) {
            case "1" :
                return {type: "맑음", icon: `${sunny}`}
            case "3" :
                return {type: "구름 많음", icon: `${cloudy}`}
            case "4" :
                return {type: "흐림", icon: `${cloud}`}
            default :
                return {type: "", icon: ""}
        }
    } else {
        switch (PTY) {
            case "1" :
                return {type: "비", icon: `${rain}`}
            case "2" :
                return {type: "비/눈", icon: `${rain_snow}`}
            case "3" :
                return {type: "눈", icon: `${snow}`}
            case "4" :
                return {type: "소나기", icon: `${shower}`}
            default :
                return {type: "", icon: ""}
        }
    }
}