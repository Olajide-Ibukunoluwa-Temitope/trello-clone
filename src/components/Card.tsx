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
}) => {

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
                                            >
                                                <option value={'volvo'}>Volvo</option>
                                                
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="card">Card</label>
                                            <select name="card" id="card" className='select-input' >
                                                <option value={'volvo'}>Volvo</option>
                                            </select>
                                        </div>
                                        <div className='move-btn-container'>
                                            <button type='button' className='btn'>Move</button>
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
