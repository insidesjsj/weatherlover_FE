import './App.css';
import {Main} from './pages/Main';
import {createContext, FC, useEffect, useReducer, useRef, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import logo1 from './img/LOAD/loadingLogo.gif'

/*
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
]*/


// export const weatherStateContext = createContext<dataType[]>(initData)
const App: FC = () => {
/*
    const [weatherData, dispatch] = useReducer(reducer, [])
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    useEffect(() => {
        dispatch({ type: "INIT", data: initData })
        setIsDataLoaded(true)
    }, [])
*/

    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
            </Routes>
        </div>
    )
/*    if (!isDataLoaded) {
        return (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-600 flex flex-col justify-center items-center">
                <img className="rounded-full w-32" src={logo1}/>
                <span className="font-['SUITE-Regular'] text-white mt-4">날씨 데이터를 로딩 중입니다</span>
            </div>
        )
    } else {
        return (
            <div>
                <weatherStateContext.Provider value={weatherData}>
                    <Routes>
                        <Route path={"/"} element={<Main/>}/>
                    </Routes>
                </weatherStateContext.Provider>
            </div>
        )
    }*/

}

export default App;