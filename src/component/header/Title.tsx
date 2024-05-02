import React, {FC} from 'react';

const Title: FC = () => {
    return (
            <div className="w-1/6 font-['SokchoBadaDotum'] text-3xl">
                <h1><span className="cursor-pointer" onClick={() => window.location.reload()}>날씨의 연인</span></h1>
            </div>
    )
}

export default Title;