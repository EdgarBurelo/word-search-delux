import React from 'react';
import Game from "./Game/Game";
import './App.scss';
import {NavBar} from "./Components/NabBar/NavBar";

const App: React.FC = () => {
    return (
        <div className="App">
            <NavBar />
            <div className='content-outer'>
                <Game />
            </div>
        </div>
    );
};

export default App;
