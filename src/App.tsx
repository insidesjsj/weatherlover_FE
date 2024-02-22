import './App.css';
import {Main} from './pages/Main';
import {createContext, FC, useEffect, useReducer, useRef, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {call} from './service/ApiService';
import {API_BASE_URL} from './app-config';
import axios from 'axios';

export interface dataType {
    id: number,
    region: string,
    weatherIcon: string,
    temp: number
}

export interface weatherAction {
    type: string,
    data: dataType[],
}

function reducer(state: dataType[], action: weatherAction): dataType[] {    // reducer 에 타입 설정을 안해줘서 에러가 났었다.
    switch (action.type) {
        case "INIT": {
            return action.data
        }
        default: {
            return state;
        }
    }
}

const initData = [
    {
        id: 1,
        region: '서울 구로구 고척동',
        weatherIcon: 'sunny',
        temp: 7,
    },
    {
        id: 2,
        region: '서울 광명시 소하동',
        weatherIcon: 'sunny',
        temp: 8,
    },
    {
        id: 3,
        region: '경기도 안양시 만안구',
        weatherIcon: 'sunny',
        temp: 3,
    },
]
export const weatherStateContext = createContext<dataType[]>(initData)
const App: FC = () => {
    const [weatherData, dispatch] = useReducer(reducer, [])
    const idRef = useRef(0)
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    useEffect(() => {
        console.log(API_BASE_URL)
 /*       call({
            api: "weather",
            method: "GET",
            request: null
        })*/
        const getWeatherData = async () => {
            try {
                const response = await axios.get('http://localhost:8055/weather')
                console.log('Weather Data:', response.data)
            } catch (error) {
                console.error('Error fetching weather data:', error)
            }
        }
        getWeatherData()
        dispatch({ type: "INIT", data: initData })
        setIsDataLoaded(true)
    }, [])

    if (!isDataLoaded) {
        return (
            <div>날씨 데이터를 불러오는 중입니다.</div>
        )
    } else {
        return (
                <div className="ml-auto mr-auto text-center bg-white w-3/6 h-full">
                    <weatherStateContext.Provider value={weatherData}>
                        <Routes>
                            <Route path={"/"} element={<Main />} />
                        </Routes>
                    </weatherStateContext.Provider>
                </div>
        )
    }
}

export default App;