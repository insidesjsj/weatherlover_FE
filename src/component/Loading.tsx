import React, {FC} from 'react';

const Loading: FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 flex flex-col justify-center items-center">
            <img className="rounded-full w-32" src="/img/LOAD/loadingLogo.gif" />
            <span className="font-['SUITE-Regular'] text-white mt-4">날씨 데이터를 로딩 중입니다</span>
        </div>
    )
}

export default Loading;