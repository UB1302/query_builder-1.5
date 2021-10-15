import React from 'react';

const Modal = ({setOpenModal, children}) => {

    function handleClick(e){
        if(e.target.classList.contains('backdrop')){
            setOpenModal(false)
        }
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <div className= "modal-content">{children}</div>
        </div>
    )
}

export default Modal;