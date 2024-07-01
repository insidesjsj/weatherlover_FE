import React, {FC, useState} from 'react';
import {Button} from './Button';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {categoryState} from '../recoilState';
/*interface WeatherCategoryProps {
    onClickButton: (category: string) => void;
    // selectedCategory: string;
}*/
const WeatherCategory: FC = () => {
    const [category, setCategory] = useRecoilState(categoryState);
    const basic = 'w-[75px] p-2 border-none rounded-2xl bg-white'
    const clicked = 'w-[75px] p-2 border-none rounded-2xl bg-blue-600 text-white'
    const onClickButton = (category: string) => {
        setCategory(category) // 여기에서 선택한 카테고리에 따라 필요한 로직을 수행할 수 있습니다.
    }
    return (
        <div className="font-['SUITE-Regular'] mt-2 ml-auto mr-auto w-3/6 flex justify-around text-lg">
            <Button className={category === '온도' ? clicked : basic} text="온도" onClick={() => onClickButton('온도')}/>
            <Button className={category === '옷차림' ? clicked : basic} text="옷차림" onClick={() => onClickButton('옷차림')}/>
            <Button className={category === '습도' ? clicked : basic} text="습도" onClick={() => onClickButton('습도')}/>
            <Button className={category === '강수' ? clicked : basic} text="강수" onClick={() => onClickButton('강수')}/>
            <Button className={category === '바람' ? clicked : basic} text="바람" onClick={() => onClickButton('바람')}/>
        </div>
    )
}

export default WeatherCategory;