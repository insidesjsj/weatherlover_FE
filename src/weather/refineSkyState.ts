export const refineSkyState = (PTY: string, SKY: string) => {
    if (PTY == "0") {
        switch (SKY) {
            case "1" :
                return "맑음"
            case "3" :
                return "구름 많음"
            case "4" :
                return "흐림"
            default :
                return ""
        }
    } else {
        switch (PTY) {
            case "1" :
                return "비"
            case "2" :
                return "비/눈"
            case "3" :
                return "눈"
            case "4" :
                return "소나기"
            default :
                return ""
        }
    }
}