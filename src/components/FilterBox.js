import { useEffect, useState } from "react";
import Filter from "./Filter";

const FilterBox = () => {

    const [showOperator,setShowOperator] = useState(false)
    const [numberOfExtraFilters, setNumberOfExtraFilters] = useState(0)
    const listOfExtraFilters = []

    const clickHandler = () => {
        setShowOperator(true)
        setNumberOfExtraFilters(prevCount => prevCount + 1)
    }

    const deleteExtraFilter = (key) => {
        listOfExtraFilters.splice(key,1)
        setNumberOfExtraFilters(prevCount => prevCount - 1)
    }

    // useEffect(()=> {
    //     for(let i = 1; i <= numberOfExtraFilters;i++){
    //         listOfExtraFilters.push(<div key = {i}><Filter/><button onClick={()=> deleteExtraFilter(i)}>Delete</button></div>)
    //     }
    // },[numberOfExtraFilters])

    for(let i = 1; i <= numberOfExtraFilters;i++){
        listOfExtraFilters.push(<div key = {i}><Filter/><button onClick={()=> deleteExtraFilter(i)}>Delete</button></div>)
    }


    return(
        <div className = "bg-gray-800 mt-24 w-11/12 m-auto p-3 max-h-60 overflow-y-auto">
            {showOperator && 
                <div className ="mb-2">
                    <button className = "bg-indigo-500">AND</button>
                    <button className = "bg-gray-800">OR</button>
                </div>}
            <Filter/>
            {listOfExtraFilters}
            <div>
                <button className = "bg-indigo-500 p-2 px-3 rounded-md" onClick = {clickHandler}>Add filter</button>
            </div>
        </div>
    )
}

export default FilterBox;