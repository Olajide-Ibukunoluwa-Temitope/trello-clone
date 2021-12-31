import React, { useState } from 'react';
import _ from 'lodash';

import Header from '../components/Header';
import List from '../components/List';
import Modal from '../components/Modal';
import CardDetails from '../components/CardDetails';


const TrelloBoard: React.FC = () => {
    const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state') || '') : [];

    const [state, setState] = useState<Array<Record<string, any>>>(data);
    const [createColumn, setCreateColumn] = useState<boolean>(false);
    const [columnTitle, setColumnTitle] = useState<string>('');
    const [createCard, setCreateCard] = useState<boolean>(false);
    const [cardTitle, setCardTitle] = useState<string>('');
    const [activeCardInput, setActiveCardInput] = useState<number>(0);
    const [activeCard, setActiveCard] = useState<number>(0);
    const [activeList, setActiveList] = useState<number>(0);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<boolean>(false);
    const [editModalDescDisable, setModalDescDisable] = useState<boolean>(true);
    const [fieldChange, setFieldChange] = useState<boolean>(false);
    const [cardDetails, setCardDetails] = useState<Record<string, string>>({
        modalTitle: '',
        modalDesc: ''
    });

    const activeListTitle = state[activeList]?.title;
    const activeCardTitle = state[activeList]?.cards[activeCard]?.title;
    const activeCardDesc = state[activeList]?.cards[activeCard]?.cardDesc;

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
                localStorage.setItem('state', JSON.stringify([
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
                localStorage.setItem('state', JSON.stringify([
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
            localStorage.setItem('state', JSON.stringify([
                ...listData
            ]));
            return [
                ...listData
            ];
            
        });
    }

    const handleOpenCardDropdown = (cardId:number, listId:number) => {
        setActiveCard(cardId);
        setActiveList(listId);
        setOpenDropdown(!openDropdown)
    };

    const handleCloseCardDropdown = () => {
        setOpenDropdown(false);
    };

    const handleDeleteCard = (listIndex: number, cardIndex: number) => {
        let listData = data;
        listData[listIndex].cards.splice(cardIndex, 1);
        setState((prevState: Array<Record<string, any>>) => {
            localStorage.setItem('state', JSON.stringify([
                ...listData
            ]));
            return [
                ...listData
            ];
            
        });
    };

    const handleMove = (listPositionToMoveTo: number, cardPositionToMoveTo: number) => {
        let listData = data;
        let listToMoveFrom = data[activeList];
        
        listData[listPositionToMoveTo].cards.splice(cardPositionToMoveTo, 0, listToMoveFrom.cards[activeCard]);
        listData[activeList].cards.splice(activeCard, 1);
        
        setState((prevState: Array<Record<string, any>>) => {
            localStorage.setItem('state', JSON.stringify([
                ...listData
            ]));
            return [
                ...listData
            ];
            
        });
        setOpenDropdown(false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setModalDescDisable(true);
    };

    const handleModalContentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFieldChange(true)
        setCardDetails((prevState: Record<string, string>) => {
            return {
                ...prevState,
                [name]: value
            }
        });
        
    };

    const handleUpdateCardTitle = () => {
        let lists = JSON.parse(localStorage.getItem('state') || '');
        const listPosition = _.findIndex(lists, ['id', state[activeList].id]);
        const cardPosition = _.findIndex(lists[listPosition].cards, ['id', state[activeList].cards[activeCard].id]);
        lists[listPosition].cards[cardPosition].title = cardDetails.modalTitle ? cardDetails.modalTitle : lists[listPosition].cards[cardPosition].title;

        setState((prevState: Array<Record<string, any>>) => {
            localStorage.setItem('state', JSON.stringify([
                ...lists
            ]));
            return [
                ...lists
            ];
            
        });
        
        setEditModalTitle(false)
        setCardDetails((prevState: Record<string, string>) => {
            return {
                ...prevState,
                modalTitle: ''
            }
        });
    };

    const handleUpdateCardDesc = () => {
        if(fieldChange) {
            let lists = JSON.parse(localStorage.getItem('state') || '');
            const listPosition = _.findIndex(lists, ['id', state[activeList].id]);
            const cardPosition = _.findIndex(lists[listPosition].cards, ['id', state[activeList].cards[activeCard].id]);
            lists[listPosition].cards[cardPosition].cardDesc = cardDetails.modalDesc;

            setState((prevState: Array<Record<string, any>>) => {
                localStorage.setItem('state', JSON.stringify([
                    ...lists
                ]));
                return [
                    ...lists
                ];
                
            });
            
            setModalDescDisable(true);
            setFieldChange(false);
        } else {
            setModalDescDisable(true);
        }
    };

    const handleModalTitleEditOn = () => {
        setEditModalTitle(true);
    };

    const handleModalTitleEditOff = () => {
        setEditModalTitle(false);
    };

    const handleModalDescEditOn = () => {
        setModalDescDisable(false);
    };

    const handleModalDescEditOff = () => {
        setModalDescDisable(true);
    };

    const handleOpenModal = (cardId:number, listId:number) => {
        setActiveCard(cardId);
        setActiveList(listId);
        setOpenModal(true);
    };

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
                                        handleOpenCardDropdown={handleOpenCardDropdown}
                                        handleCloseCardDropdown={handleCloseCardDropdown}
                                        openDropdown={openDropdown}
                                        activeCard={activeCard}
                                        activeList={activeList}
                                        handleDeleteCard={handleDeleteCard}
                                        handleMove={handleMove}
                                        handleOpenModal={handleOpenModal}
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
            <Modal open={openModal} handleCloseModal={handleCloseModal} >
                <CardDetails 
                    cardTitle={activeCardTitle} 
                    desc={activeCardDesc} 
                    listTitle={activeListTitle} 
                    handleModalContentChange={handleModalContentChange} 
                    handleUpdateCardTitle={handleUpdateCardTitle}
                    handleUpdateCardDesc={handleUpdateCardDesc}
                    editModalTitle={editModalTitle}
                    editModalDescDisable={editModalDescDisable}
                    handleModalTitleEditOn={handleModalTitleEditOn}
                    handleModalTitleEditOff={handleModalTitleEditOff}
                    handleModalDescEditOn={handleModalDescEditOn}
                    handleModalDescEditOff={handleModalDescEditOff}
                />
            </Modal>
        </main>
    )
}

export default TrelloBoard;
