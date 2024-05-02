import REH1 from '../../assets/img/REH/REH1.png'
import REH2 from '../../assets/img/REH/REH2.png'
import REH3 from '../../assets/img/REH/REH3.png'
import REH4 from '../../assets/img/REH/REH4.png'
import REH5 from '../../assets/img/REH/REH5.png'

// 바람 설정하는 함수
export const refineHumidity = (REH: number) => {
    if (REH >= 0 && REH <= 20) {
        return ({icon: `${REH1}`, degree: "아주 낮음"})
    } else if (REH > 20 && REH <= 40) {
        return ({icon: `${REH2}`, degree: "낮음"})
    } else if (REH > 40 && REH <= 60) {
        return ({icon: `${REH3}`, degree: "보통"})
    } else if (REH > 60 && REH <= 80) {
        return ({icon: `${REH4}`, degree: "많음"})
    } else if (REH > 80) {
        return ({icon: `${REH5}`, degree: "아주 많음"})
    } else {
        return ({icon: "", degree: ""})
    }
}