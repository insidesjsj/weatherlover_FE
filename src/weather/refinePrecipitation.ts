import norain from '../img/PCP/norain.png';
import umbrella from '../img/PCP/umbrella.png';

// 날씨 아이콘 설정하는 함수
export const refinePrecipitation = (PCP: string) => {
    if (PCP === "강수없음") {
        return ({
            type: "없음",
            icon: `${norain}`,
            amount: '0.0 ml'
        })
    } else {
        return ({
            type: "우산 챙겨요",
            icon: `${umbrella}`,
            amount: `${PCP} ml`
        })
    }
}