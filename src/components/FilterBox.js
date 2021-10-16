import { useState } from "react";
import Filter from "./Filter";

const FilterBox = () => {

    const [showOperator,setShowOperator] = useState(false)
    const [numberOfExtraFilters, setNumberOfExtraFilters] = useState(0)
    const listOfExtraFilters = []

    const clickHandler = () => {
        setShowOperator(true)
        setNumberOfExtraFilters(prevCount => prevCount + 1)
    }

    for(let i = 1; i <= numberOfExtraFilters;i++){
        listOfExtraFilters.push(<Filter key = {i}/>)
    }


    return(
        <div className = "bg-gray-800 mt-24 w-4/5 m-auto">
            {showOperator && <div>And/or</div>}
            <Filter/>
            {listOfExtraFilters}
            <div>
                <button className = "bg-indigo-500 p-2 px-3 rounded-md" onClick = {clickHandler}>Add filter</button>
            </div>
        </div>
    )
}

export default FilterBox;