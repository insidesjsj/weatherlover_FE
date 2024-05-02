import './App.css';
import {Main} from './pages/Main';
import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
const App: FC = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
            </Routes>
        </div>
    )

}

export default App;