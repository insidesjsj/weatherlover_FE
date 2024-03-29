import React from 'react';
import {Button} from '../public/Button';
interface WeatherCategoryProps {
    onClickButton: (category: string) => void;
    selectedCategory: string;
}
const WeatherCategory: React.FC<WeatherCategoryProps> = ({onClickButton, selectedCategory}) => {
    return (
        <div className="font-['SUITE-Regular'] mt-2 ml-auto mr-auto w-3/6 flex justify-around text-lg">
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '온도' && 'bg-blue-500 text-white'}`}
                    text="온도" onClick={() => onClickButton('온도')}/>
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '옷차림' && 'bg-blue-500 text-white'}`}
                    text="옷차림" onClick={() => onClickButton('옷차림')}/>
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '습도' && 'bg-blue-500 text-white'}`}
                    text="습도" onClick={() => onClickButton('습도')}/>
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '강수' && 'bg-blue-500 text-white'}`}
                    text="강수" onClick={() => onClickButton('강수')}/>
            <Button className={`p-1 border-2 rounded-2xl ${selectedCategory === '바람' && 'bg-blue-500 text-white'}`}
                    text="바람" onClick={() => onClickButton('바람')}/>
        </div>
    )
}

export default WeatherCategory;