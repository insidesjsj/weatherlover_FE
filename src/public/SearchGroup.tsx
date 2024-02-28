import {Icon} from './Icon';
import React from 'react';

interface SearchGroupProsp {
    divClassName: string | null,
    searchSize: string,
}
const SearchGroup: React.FC<SearchGroupProsp> = ({divClassName, searchSize}) => {
    const _className = "rounded-3xl border border-gray-400 text-left p-2 flex justify-between items-center " + divClassName
    const _searchSize = searchSize
    return (
        <div>
            <div className={_className}>
                <input type="text" placeholder="동/읍/면을 입력하세요" className="focus:border-none border-none w-5/6 p-4" />
                <Icon name="search" className="cursor-pointer" style={{fontSize: _searchSize, marginRight: "10px"}} />
            </div>
        </div>
    )
}

export default SearchGroup;