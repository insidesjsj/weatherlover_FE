import React, {FC} from 'react';
import {Button} from './Button';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {categoryState} from '../recoilState';
/*interface WeatherCategoryProps {
    onClickButton: (category: string) => void;
    // selectedCategory: string;
}*/
const WeatherCategory: FC = () => {
    const [category, setCategory] = useRecoilState(categoryState);

    const onClickButton = (category: string) => {
        setCategory(category) // 여기에서 선택한 카테고리에 따라 필요한 로직을 수행할 수 있습니다.
    }
    return (
        <div className="font-['SUITE-Regular'] mt-2 ml-auto mr-auto w-3/6 flex justify-around text-lg">
            <Button className={`p-1 border-2 rounded-2xl ${category === '온도' && 'bg-blue-500 text-white'}`}
                    text="온도" onClick={() => onClickButton('온도')}/>
            <Button className={`p-1 border-2 rounded-2xl ${category === '옷차림' && 'bg-blue-500 text-white'}`}
                    text="옷차림" onClick={() => onClickButton('옷차림')}/>
            <Button className={`p-1 border-2 rounded-2xl ${category === '습도' && 'bg-blue-500 text-white'}`}
                    text="습도" onClick={() => onClickButton('습도')}/>
            <Button className={`p-1 border-2 rounded-2xl ${category === '강수' && 'bg-blue-500 text-white'}`}
                    text="강수" onClick={() => onClickButton('강수')}/>
            <Button className={`p-1 border-2 rounded-2xl ${category === '바람' && 'bg-blue-500 text-white'}`}
                    text="바람" onClick={() => onClickButton('바람')}/>
        </div>
    )
}

export default WeatherCategory;