import React, { useState } from 'react';
import _ from 'lodash';

import Header from '../components/Header';
import List from '../components/List';


const TrelloBoard: React.FC = () => {
    const data = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state') || '') : [];

    const [state, setState] = useState<Array<Record<string, any>>>(data);
    const [createColumn, setCreateColumn] = useState<boolean>(false);
    const [columnTitle, setColumnTitle] = useState<string>('');
    const [createCard, setCreateCard] = useState<boolean>(false);
    const [cardTitle, setCardTitle] = useState<string>('');
    const [activeCardInput, setActiveCardInput] = useState<number>(0);

    const handleAddList = () => {
        setCreateColumn(true)
    };

    const handleCancelAddList = () => {
        setCreateColumn(false)
    };

    const handleAddCard = (idx: number) => {
        setActiveCardInput(idx);
        setCreateCard(true);
    };

    const handleCancelAddCard = () => {
        setCreateCard(false)
    };

    const handleAddNewListChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(event.target.value);
    };
    
    const handleCardTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardTitle(event.target.value)
    };

    const handleCreateNewList = () => {
        if(columnTitle !== ''){
            setState((prevState: Array<Record<string, any>>) => {
                sessionStorage.setItem('state', JSON.stringify([
                    ...prevState,
                    {
                        id: 'col_' + Math.random(),
                        title: columnTitle,
                        cards: [],
                    }
                ]));

                return [
                    ...prevState,
                    {
                        id: 'col_' + Math.random(),
                        title: columnTitle,
                        cards: [],
                    }
                ];
                
            });
            
            
            setCreateColumn(false);
            setColumnTitle('');
        } else {
            setCreateColumn(false);
        }
    };

    const handleCreateNewCard = (id: string) => {
        if (cardTitle) {
            let columns = state;
            const position = _.findIndex(columns, ['id', id]);
            const updatedCard = [...columns[position].cards, {id: 'card_' + (Math.random() * 10), title: cardTitle, cardDesc: ''}];
            columns[position].cards = updatedCard;

            setState((prevState: Array<Record<string, any>>) => {
                sessionStorage.setItem('state', JSON.stringify([
                    ...columns
                ]));

                return [
                    ...columns
                ];
                
            });
            
            setCreateCard(false);
            setCardTitle('');
        } else{
            setCreateCard(false);
        }
        
    };

    const handleDeleteList = (listIndex: number) => {
        let listData = data;
        listData.splice(listIndex, 1);
        setState((prevState: Array<Record<string, any>>) => {
            sessionStorage.setItem('state', JSON.stringify([
                ...listData
            ]));
            return [
                ...listData
            ];
            
        });
    }

    


    return (
        <main id='board'>
            <Header />
            <div id="board-content">
                <div id='title'>
                    <h3>
                        Demo
                    </h3>
                </div>
                <div id='list-container'>
                    <div className='list-row'>
                        {
                            state.map(({title, id, cards}, idx: number) => {
                                return (
                                    <List 
                                        title={title} 
                                        key={id}
                                        id={id}
                                        cards={cards}
                                        activeInput={activeCardInput}
                                        index={idx}
                                        handleAddCard={handleAddCard}
                                        handleCancelAddCard={handleCancelAddCard}
                                        openField={createCard}
                                        handleCardTitleChange={handleCardTitleChange}
                                        handleCreateNewCard={handleCreateNewCard}
                                        handleDeleteList={handleDeleteList}
                                    />
                                )
                            })
                        }
                        
                        <div>
                            <div className='add-list'>
                                {
                                    !createColumn ? (
                                        <div onClick={handleAddList}>
                                            <p>{state.length > 0 ? '+ Add another list' : '+ Add list'}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <form onSubmit={handleCreateNewList}>
                                                <input 
                                                    type='text' 
                                                    className='add-input' 
                                                    placeholder='Enter list title...' 
                                                    name='add-column' 
                                                    onChange={handleAddNewListChange} 
                                                />
                                                <div className='flex'>
                                                    <button type='submit' className='btn'>Add list</button>
                                                    <span onClick={handleCancelAddList} >&#x2715;</span>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default TrelloBoard;
