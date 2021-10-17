import React, { useEffect, useState } from 'react';
import FilterBox from './FilterBox';

const QueryBuilder = ({setOpenQueryBuilder}) => {

    const [query,setQuery] = useState("h")
    const [showInputBox,setShowInputBox] = useState(false)
    const [queryArray,setQueryArray] = useState([])
    console.log(queryArray)

    function handleClick(e){
        if(e.target.classList.contains('backdrop')){
            setOpenQueryBuilder(false)
        }
    }
    useEffect(()=>{
        let timeoutID = setTimeout(()=>{
            setShowInputBox(true)
        },5000)
        return ()=>{
            clearTimeout(timeoutID);
        }
    },[])


    return (
        <div className="backdrop" onClick={handleClick}>
            <div className= "modal-content bg-gray-900 text-base rounded-md">
                <div className = "bg-indigo-500 rounded-t p-5">
                    {showInputBox ? 
                        <h1 className = "text-2xl">Build your query</h1> : 
                        <h1 className = "text-2xl">Create tag and query</h1>
                    }
                    
                    {showInputBox ? 
                        <div className= "mt-3"><input value = {query}></input></div> : 
                        <p className = "text-sm text-gray-400">The query you build will be saved in your active view</p>
                    }
                </div>
                
                <FilterBox queryArray = {queryArray} setQueryArray = {setQueryArray}/>
                <div>
                    <button className = "bg-indigo-500 p-2 px-5 rounded-md">Finish</button>
                </div>
            </div>
        </div>
    )
}

export default QueryBuilder;