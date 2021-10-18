import {useState } from "react";
import Filter from "./Filter";
import {Rule, RuleGroup} from "../App"

interface FilterBoxProps {
    queryArray: RuleGroup["children"]
    setQueryArray: React.Dispatch<React.SetStateAction<(RuleGroup | Rule)[]>>
}

interface ff {
   extraFilters: {
        id: number
    }[]
}

const FilterBox: React.FC<FilterBoxProps> = ({queryArray, setQueryArray}) => {

    const [showOperator,setShowOperator] = useState<boolean>(false)
    const [numberOfExtraFilters, setNumberOfExtraFilters] = useState<number>(1)
    const [listOfExtraFilters,setListOfExtraFilters] = useState<ff["extraFilters"]>([])

    const clickHandler = () => {
        setShowOperator(true)
        let extraFilter = {
            id:numberOfExtraFilters,
        }

        setListOfExtraFilters([...listOfExtraFilters,extraFilter])
        setNumberOfExtraFilters(prevCount => prevCount + 1)
    }


    const deleteExtraFilter = (id:number) => {
        // console.log(id)
        // console.log(listOfExtraFilters)
        let temp = [...listOfExtraFilters].filter((item)=>item.id !== id)
        // console.log(temp)
        let tempQueryArray = [...queryArray].filter((item)=>item.id !== id)
        setQueryArray(tempQueryArray)
        setListOfExtraFilters(temp)
    }


    return(
        <div className = "bg-gray-800 mt-24 w-11/12 m-auto p-3 max-h-60 overflow-y-auto">
            {showOperator && 
                <div className ="mb-2">
                    <button className = "bg-indigo-500">AND</button>
                    <button className = "bg-gray-800">OR</button>
                </div>}
            <Filter id = {0} showDeleteButton = {false} queryArray = {queryArray} setQueryArray = {setQueryArray}/>
            {listOfExtraFilters.map((item)=>{
                return <Filter id = {item.id} key = {item.id} queryArray = {queryArray} setQueryArray = {setQueryArray} showDeleteButton = {true} deleteExtraFilter = {deleteExtraFilter}/>
            })}
            <div>
                <button className = "bg-indigo-500 p-2 px-3 rounded-md" onClick = {clickHandler}>Add filter</button>
            </div>
        </div>
    )
}

export default FilterBox;