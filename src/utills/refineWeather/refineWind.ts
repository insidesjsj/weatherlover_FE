import wind1 from '../../assets/img/WSD/wind1.png'
import wind2 from '../../assets/img/WSD/wind2.png'
import wind3 from '../../assets/img/WSD/wind3.png'
import wind4 from '../../assets/img/WSD/wind4.png'
import wind5 from '../../assets/img/WSD/wind5.png'

// 날씨 아이콘 설정하는 함수
export const refineWind = (WSD: number) => {
    if (WSD < 1) {
        return ({degree: "없음", icon: `${wind1}`})
    } else if (WSD >= 1 && WSD < 3) {
        return ({degree: "약함", icon: `${wind2}`})
    } else if (WSD >= 3 && WSD < 5) {
        return ({degree: "보통", icon: `${wind3}`})
    } else if (WSD >= 5 && WSD < 10) {
        return ({degree: "강함", icon: `${wind4}`})
    } else {
        return ({degree: "아주 강함", icon: `${wind5}`})
    }
}