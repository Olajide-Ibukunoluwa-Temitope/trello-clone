import React from 'react';
import Header from '../components/Header';

const TrelloBoard: React.FC = () => {
    return (
        <main id='board'>
            <Header />
            <div id="board-content">
                <div id='title'>
                    <h3>
                        Demo
                    </h3>
                </div>
            </div>
        </main>
    )
}

export default TrelloBoard;
