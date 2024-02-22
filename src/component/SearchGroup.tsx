import {Icon} from './Icon';


const SearchGroup = () => {
    return (
        <div>
            <div className="mt-3 rounded-3xl border border-gray-400 w-full text-left p-2 flex justify-between items-center">
                <input type="text" placeholder="동/읍/면을 입력하세요" className="focus:border-none border-none w-5/6 p-4" />
                <Icon name="search" className="cursor-pointer" style={{fontSize: "30px", marginRight: "10px"}} />
            </div>

        </div>
    )
}

export default SearchGroup;