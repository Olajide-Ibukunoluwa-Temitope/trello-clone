import React from 'react';

interface CardDetailsProps {
    cardTitle: string;
    listTitle: string;
    desc: string;
    handleUpdateCardDesc: () => void;
    editModalTitle: boolean;
    editModalDescDisable: boolean;
    handleUpdateCardTitle: () => void;
    handleModalTitleEditOn: () => void;
    handleModalTitleEditOff: () => void;
    handleModalDescEditOn: () => void;
    handleModalDescEditOff: () => void;
    handleModalContentChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CardDetails: React.FC<CardDetailsProps> = ({
    cardTitle, 
    listTitle, 
    desc, 
    handleUpdateCardDesc, 
    editModalTitle,
    editModalDescDisable,
    handleUpdateCardTitle,
    handleModalTitleEditOn,
    handleModalTitleEditOff,
    handleModalDescEditOn,
    handleModalDescEditOff,
    handleModalContentChange,
}) => {

    return (
        <div>
            <div className='modal-title-section'>
                {editModalTitle ? (
                    <div className='modal-title-container'>
                            <input name='modalTitle' type='text' defaultValue={cardTitle} onChange={handleModalContentChange} className='input' />
                            
                            <div className='flex'>
                                <button type='button' onClick={handleUpdateCardTitle} className='btn'>Save title</button>
                                <span onClick={handleModalTitleEditOff}>&#x2715;</span>
                            </div>
                        
                    </div>
                    
                ) : (
                    <div className='modal-title-container' onClick={handleModalTitleEditOn}>
                        <h3>
                            <span>{cardTitle}</span>
                            <span>&#9998;</span>
                        </h3>
                        
                    </div>
                )}
                <p>in list {listTitle}</p>
            </div>
            <div className='desc-container'>
                <h4>Description</h4>
                
                <div className='desc-section'>
                    <div onClick={handleModalDescEditOn}>
                        {
                            editModalDescDisable && (
                                <textarea 
                                    name='modalDesc' 
                                    className='desc-input' 
                                    onChange={handleModalContentChange} 
                                    disabled={editModalDescDisable} 
                                    placeholder='Add a more details description...' 
                                    value={desc} 
                                />
                            )
                        }
                    </div>
                    {
                        !editModalDescDisable && (
                            <>
                                <textarea 
                                    name='modalDesc' 
                                    className='desc-input' 
                                    onChange={handleModalContentChange} 
                                    placeholder='Add a more details description...' 
                                    defaultValue={desc} 
                                />
                                <div className='flex'>
                                    <button type='button' className='btn' onClick={handleUpdateCardDesc}>Save</button>
                                    <span onClick={handleModalDescEditOff}>&#x2715;</span>
                                </div>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default CardDetails;
