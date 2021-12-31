import React from 'react';
import _ from 'lodash';

interface CardProps {
    title: string;
    cardDesc: string;
    listIndex: number;
    cardIndex: number;
    handleOpenCardDropdown: (cardId: number, listIndex:number) => void;
    handleCloseCardDropdown: () => void;
    openDropdown: boolean;
    activeCard: number;
    activeList: number;
    handleDeleteCard: (listIndex: number, cardIndex: number) => void;
    handleMove: (listPositionToMoveTo: number, cardPositionToMoveTo: number) => void;
}

const Card: React.FC<CardProps> = ({
    title,
    cardDesc,
    listIndex, 
    cardIndex, 
    handleOpenCardDropdown,
    handleCloseCardDropdown,
    openDropdown,
    activeCard,
    activeList,
    handleDeleteCard,
    handleMove,
}) => {

    const [selectedListPosition, setSelectedListPosition] = React.useState<number>(0);
    const [selectedCardPosition, setSelectedCardPosition] = React.useState<number>(0);
    const data = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state') || '') : [];
    const cardsData = data[selectedListPosition].cards
    
    const handleListPositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedListPosition(Number(event.target.value));
    };

    const handleCardPositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCardPosition(Number(event.target.value));
    };

    return (
        <div>
            <div className='card'>
                <div className=' flex justify-space-between'>
                    <p>{_.truncate(title, {'length': 22})}</p>
                    <div>
                        <span className='options'>
                            <span onClick={() => handleOpenCardDropdown(cardIndex, listIndex)}>&#9998;</span>
                            <span onClick={() => handleDeleteCard(listIndex, cardIndex)}>&#10005;</span>
                        </span>
                        
                        <div>
                            {openDropdown && activeCard === cardIndex && activeList === listIndex && (
                                <div 
                                    className='dropdown'
                                >
                                    <div className='close-dropdown'>
                                        <button type='button' onClick={handleCloseCardDropdown} >&#10005;</button>
                                    </div>
                                    <div className='dropdown-card-title'>
                                        <h5>Move Card To Another List</h5>
                                    </div>
                                    <div> 
                                        <div>
                                            <label htmlFor="list">List</label>
                                            <select 
                                                name="list" 
                                                id="list"
                                                className='select-input'
                                                onChange={handleListPositionChange}
                                            >
                                                {
                                                    data.map((value: Record<string, any>, index: number) => {
                                                        return activeList !== index && <option key={index} value={index}>{value.title}</option>;
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="card">Card</label>
                                            <select 
                                                name="card" 
                                                id="card" 
                                                className='select-input' 
                                                onChange={handleCardPositionChange}
                                            >
                                                {
                                                    cardsData.length !== 0 ? (
                                                        cardsData.map(({title}: {title: string}, index: number) => (
                                                            <option key={index} value={index}>{index + 1}</option>
                                                        ))
                                                    ) : (
                                                        <option value={0}>1</option>
                                                    )
                                                    
                                                }
                                            </select>
                                        </div>
                                        <div className='move-btn-container'>
                                            <button type='button' className='btn'onClick={() => handleMove(selectedListPosition, selectedCardPosition)}>Move</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
                <div>
                    {cardDesc && <p>&#x268E;</p>}
                </div>
                
            </div>
            
        </div>
        
    )
}

export default Card
