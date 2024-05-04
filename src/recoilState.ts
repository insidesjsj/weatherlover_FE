import {atom, selector, useRecoilValue} from 'recoil';
import {getCurrentLocation} from './utills/geoLocation/getCurrentLocation';
import {getCoordinate} from './utills/geoLocation/getCurrentCoordinate';

export const categoryState = atom({
    key: 'category',
    default: '온도',
})

export const curWeatherState = atom({
    key: 'curWeatherState',
    default: {
        TMP: '',    // 날씨
        POP: '',    // 강수확률
        PTY: '',    // 강수형태
        PCP: '',    // 1시간 강수량
        REH: '',    // 습도
        SKY: '',    // 하늘
        WSD: '',    // 풍속
    },
})

export const hourlyWeatherState = atom({
    key: 'hourlyWeatherState',
    default: {
        TMP: [''],      // 날씨
        POP: [''],      // 강수확률
        PTY: [''],      // 강수형태
        PCP: [''],      // 1시간 강수량
        REH: [''],      // 습도
        SKY: [''],      // 하늘
        WSD: [''],      // 풍속
        TMN: [''],      // 최저기운
        TMX: [''],      // 최고기온
        dates: [''],    // 날짜
        TMPTime: [''],  // 시간
        maxWSD: '',
        minWSD: '',
    }
})

export const currentRegionState = atom({
    key: 'currentRegionState',
    default: {
        address: "",
        midLandRegionCode: "",
        midRegionCode: "",
    },
})

export const locationSelector = selector({
    key: 'locationSelector',
    get: async ({get}) => {
        try {
            const location = await getCurrentLocation()
            if (location) {
                const grid = getCoordinate(location.latitude, location.longitude)
                return {lat: location.latitude.toString(), lng: location.longitude.toString(), nx: grid.nx, ny: grid.ny}
            }
            else {
                console.error('Failed to get location.')
            }

        } catch (error) {
            console.error('Error getting location:', error)
        }
    }
})
