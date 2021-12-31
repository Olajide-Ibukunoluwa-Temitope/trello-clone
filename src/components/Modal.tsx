import React from 'react';

interface ModalProps{
    children: React.ReactNode;
    open: boolean;
    handleCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({children, open, handleCloseModal}) => {
    return (
        <div className={`${open ? 'show': 'hide'}`}>
            <div className='modal-overlay' onClick={handleCloseModal} />
            <div className='modal'>
                <div className='close-modal'>
                    <button onClick={handleCloseModal}>&#10005;</button>
                </div>
                {children}
            </div>
            
        </div>
    );
};

export default Modal;
