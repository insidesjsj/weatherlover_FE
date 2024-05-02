import {FC} from 'react';
import sunny from '../../assets/img/TEMP/sunny.png'
import {Temp} from '../weatherItem/Temp';
import {refineWf} from '../../utills/refineWeather/refineWf';

interface WeekWeatherItemProps {
    tmx?: string,
    tmn?: string,
    wf?: string,
    SKY?: string,
    PTY?: string,
    date?: string,
    days?: string,
}

const TendaysWeatherItem: FC<WeekWeatherItemProps> = ({tmx, tmn, wf, SKY, PTY, date, days}) => {
    const icon = wf ? refineWf(wf) : `${sunny}`

    if (tmx === null) {
        return (
            <div className="py-3">{date}의 데이터는 오전 06시 이후 업데이트 됩니다</div>
        )
    } else {
        if (PTY && SKY) {
            return (
                <div className="">
                    <hr/>
                    <div className="py-3 flex justify-around">
                        <div className="w-1/6">
                            <span className="w-1/2">{date}</span>
                            <span className="ml-4">{days}</span>
                        </div>
                        <Temp TMP="" PTY={PTY} SKY={SKY} kind="weekly"/>
                        <span className="w-1/12">{tmx}°</span>
                        <span className="w-1/12">{tmn}°</span>
                    </div>
                </div>
            )
        } else if (wf) {
            return (
                <div className="">
                    <hr/>
                    <div className="py-3 flex justify-around">
                        <div className="w-1/6">
                            <span className="w-1/2">{date}</span>
                            <span className="ml-4">{days}</span>
                        </div>
                        <div className="w-1/6">
                            <img className="mx-auto w-7" src={icon} alt={wf} />
                        </div>
                        <span className="w-1/12">{tmx}°</span>
                        <span className="w-1/12">{tmn}°</span>
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default TendaysWeatherItem;