import React from 'react';
import Game from "./Game/Game";
import './App.scss';

const App: React.FC = () => {
    return (
        <div className="App">
            <div className='content-outer'>
                <Game />
            </div>
        </div>
    );
};

export default App;
