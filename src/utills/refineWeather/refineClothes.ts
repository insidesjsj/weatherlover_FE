import {calculateWindChill} from './calculateWindChill';
import tshirt from '../../assets/img/Clothes/tshirt.png'
import cardigan from '../../assets/img/Clothes/cardigan.png'
import knit from '../../assets/img/Clothes/knit.png'
import coat from '../../assets/img/Clothes/coat.png'
import padding from '../../assets/img/Clothes/padding.png'
import hoodie from '../../assets/img/Clothes/hoodie.png'

export const refineClothes = (TMP: number, WSD: number) => {
    const windChill = calculateWindChill(TMP, WSD)

    if (windChill > 22) {
        return {val: "반팔", icon: `${tshirt}`, WCT: windChill}
    } else if (windChill <= 22 && windChill >= 18) {
        return {val: "후드티 / 맨투맨", icon: `${hoodie}`, WCT: windChill}
    } else if (windChill <= 17 && windChill >= 14) {
        return {val: "자켓 / 가디건", icon: `${cardigan}`, WCT: windChill}
    } else if (windChill <= 13 && windChill >= 10) {
        return {val: "두꺼운 니트", icon: `${knit}`, WCT: windChill}
    } else if (windChill <= 9 && windChill >= 4) {
        return {val: "코트 / 가죽 자켓", icon: `${coat}`, WCT: windChill}
    } else {
        return {val: "패딩 / 두꺼운 코트", icon: `${padding}`, WCT: windChill}
    }

}