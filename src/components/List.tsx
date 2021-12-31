import React from 'react';
import Card from './Card';

interface ListProps {
    title: string;
    id: string;
    cards: Array<Record<string, any>>;
    handleAddCard: (idx: number) => void;
    handleCancelAddCard: () => void ;
    openField: boolean;
    handleCardTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCreateNewCard: (id:string) => void;
    activeInput: number;
    index: number;
    handleDeleteList: (listIndex: number) => void;
    handleOpenCardDropdown: (cardId :number, listId: number) => void;
    handleCloseCardDropdown: () => void;
    openDropdown: boolean;
    activeCard: number;
    activeList: number;
    handleDeleteCard: (listIndex: number, cardIndex: number) => void;
    handleMove: (listPositionToMoveTo: number, cardPositionToMoveTo: number) => void;
    handleOpenModal: (cardId :number, listId: number) => void;
}

const List: React.FC<ListProps> = ({
    title, 
    id,
    handleAddCard, 
    handleCancelAddCard, 
    openField, 
    handleCardTitleChange, 
    handleCreateNewCard,
    activeInput,
    index,
    handleDeleteList,
    cards,
    handleOpenCardDropdown,
    handleCloseCardDropdown,
    openDropdown,
    activeCard,
    activeList,
    handleDeleteCard,
    handleMove,
    handleOpenModal
}) => {
    return (
        <div className='column'>
            <div className='flex justify-space-between column-title-section'>
                <h4>{title}</h4>
                <span onClick={() => handleDeleteList(index)}>&#10005;</span>
            </div>
            <div className='card-container'>
                {
                    cards.map(({title, cardDesc}, idx) => (
                        <Card 
                            key={idx} 
                            title={title}
                            cardDesc={cardDesc}
                            cardIndex={idx}
                            listIndex={index}
                            handleOpenCardDropdown={handleOpenCardDropdown}
                            handleCloseCardDropdown={handleCloseCardDropdown}
                            openDropdown={openDropdown}
                            activeCard={activeCard}
                            activeList={activeList}
                            handleDeleteCard={handleDeleteCard}
                            handleMove={handleMove}
                            handleOpenModal={handleOpenModal}
                        />
                    ))
                }
            </div>
            <div>
                {
                    openField && activeInput === index? (
                        <div className='add-card-input-container'>
                            <form onSubmit={() => handleCreateNewCard(id)}>
                                <input 
                                    type='text' 
                                    className='add-input' 
                                    placeholder='Enter a title for this card...' 
                                    name='add-card' 
                                    onChange={handleCardTitleChange}
                                />
                                <div className='flex'>
                                    <button type='submit' className='btn'>Add card</button>
                                    <span className='cancel' onClick={handleCancelAddCard} >&#x2715;</span>
                                </div>
                            </form>
                        </div>
                        
                    ) : (
                        <div className='add-card-section' onClick={() => handleAddCard(index)}>
                            <p>+ Add a card</p>
                        </div>
                    )
                }
            </div>
            
        </div>
    )
}

export default List
