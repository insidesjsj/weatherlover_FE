import React, {useContext, useState} from 'react';
import SearchGroup from '../SearchGroup';
import Title from './Title';
import RegionSearch from './RegionSearch';


const Header: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => {
        if (!isFocused) {
            setIsFocused(true)
        }
    }
    const handleBlur = () => {
        if (isFocused) {
            setIsFocused(false)
        }
    }
    return (
        <div>
            <div className="pt-5 flex justify-between items-center">
                <Title />
                <div className="w-1/4">
                    <SearchGroup divClassName="w-full" searchSize="30px" onFocus={handleFocus} readonly={true}/>
                </div>
                <div className="w-1/6 items-center">

                </div>
            </div>
            <RegionSearch isFocused={isFocused} handleBlur={handleBlur} />
        </div>
    );
}

export default React.memo(Header);