import React, { useState } from 'react';
import FilterBox from './FilterBox';

const QueryBuilder = ({setOpenQueryBuilder}) => {

    const [query,setQuery] = useState("")

    function handleClick(e){
        if(e.target.classList.contains('backdrop')){
            setOpenQueryBuilder(false)
        }
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <div className= "modal-content">
            <h1>Hey</h1>
            <div>
                <input value = {query} ></input>
            </div>
            <div>
                <FilterBox/>
            </div>
            </div>
        </div>
    )
}

export default QueryBuilder;