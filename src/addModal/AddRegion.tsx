import {Header} from '../component/Header';
import {FC, useContext} from 'react';
import {weatherStateContext} from '../App';
import AddCurrentWeather from './AddCurrentWeather';
import {AddFavoriteRegList} from './AddFavoriteRegList';
import SearchGroup from '../public/SearchGroup';

export type AddRegionProps = {
    closeModal: () => void
}

export const AddRegion: FC<AddRegionProps> = ({ closeModal }) => {
    const data = useContext(weatherStateContext)
    return (
        <div className="">
            <Header
                left={{ menu: "arrow_back_ios_new", style: {fontSize: "30px"}, onClick: closeModal, className: "cursor-pointer" }}
                title="위치"
                right={{ menu: "  " }}
            />
            <AddCurrentWeather />
            <AddFavoriteRegList />
        </div>
    )
}