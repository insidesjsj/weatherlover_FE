import {Icon} from './Icon';
import React, {ChangeEvent, useState} from 'react';

interface SearchGroupProps {
    divClassName: string | null,
    searchSize: string,
    onFocus?: () => void,
    onBlur?: () => void,
    value?: string,
    readonly?: boolean
    onChange?: ((e: ChangeEvent<HTMLInputElement>) => void),
}
const SearchGroup: React.FC<SearchGroupProps> = ({divClassName, searchSize, onFocus, onBlur, value, onChange, readonly}) => {
    const [isFocused, setIsFocused] = useState(false)
    const _className = "rounded-3xl border border-gray-400 text-left p-2 flex justify-between items-center " + divClassName
    const _searchSize = searchSize

    return (
        <div>
            <div className={_className}>
                <input
                    type="text"
                    placeholder="동/읍/면을 입력하세요"
                    className="focus:border-none border-none w-5/6 p-4"
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    readOnly={readonly}
                />
                <Icon name="search" className="cursor-pointer" style={{fontSize: _searchSize, marginRight: "10px"}} />
            </div>
        </div>
    )
}

export default SearchGroup