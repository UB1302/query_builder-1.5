import React from 'react';

const QueryBuilder = ({setOpenQueryBuilder}) => {

    function handleClick(e){
        if(e.target.classList.contains('backdrop')){
            setOpenQueryBuilder(false)
        }
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <div className= "modal-content">Hey</div>
        </div>
    )
}

export default QueryBuilder;