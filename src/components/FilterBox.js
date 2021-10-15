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
        <div>
            {showOperator && <div>And/or</div>}
            <Filter/>
            {listOfExtraFilters}
            <div>
                <button onClick = {clickHandler}>Add filter</button>
            </div>
        </div>
    )
}

export default FilterBox;