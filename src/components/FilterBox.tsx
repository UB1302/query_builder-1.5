import {useState } from "react";
import Filter from "./Filter";
import {Rule, RuleGroup} from "../App"

interface FilterBoxProps {
    queryArray: RuleGroup["children"]
    setQueryArray: React.Dispatch<React.SetStateAction<Rule[]>>
    conjunction: string
    setConjunction: React.Dispatch<React.SetStateAction<string>>
}

interface extraFiltersInterface {
   extraFilters: {
        id: number
    }[]
}

const FilterBox: React.FC<FilterBoxProps> = ({queryArray, setQueryArray, conjunction, setConjunction}) => {

    const [showOperator,setShowOperator] = useState<boolean>(false)
    const [numberOfExtraFilters, setNumberOfExtraFilters] = useState<number>(1)
    const [listOfExtraFilters,setListOfExtraFilters] = useState<extraFiltersInterface["extraFilters"]>([])

    const clickHandler = () => {
        setShowOperator(true)
        let extraFilter = {
            id:numberOfExtraFilters,
        }
        setListOfExtraFilters([...listOfExtraFilters,extraFilter])
        setNumberOfExtraFilters(prevCount => prevCount + 1)
    }


    const deleteExtraFilter = (id:number) => {
        let temp = [...listOfExtraFilters].filter((item)=>item.id !== id)
        let tempQueryArray = [...queryArray].filter((item)=>item.id !== id)
        setQueryArray(tempQueryArray)
        setListOfExtraFilters(temp)
    }

    const andConjunctionHandler = () => {
        setConjunction("AND")
    }

    const orConjunctionHandler = () => {
        setConjunction("OR")
    }   

    return(
        <div className = "bg-third rounded border border-gray-700 mt-24 w-11/12 m-auto p-3 mb-4">
            {showOperator && 
                <div className ="mb-2 text-sm">
                    <button onClick = {andConjunctionHandler} className = {conjunction === "AND" ? "bg-secondary p-1 rounded-l	" : "bg-fifth p-1 rounded-l"}>AND</button>
                    <button onClick = {orConjunctionHandler} className = {conjunction === "OR" ? "bg-secondary p-1 rounded-r" : "bg-fifth p-1 rounded-r"}>OR</button>
                </div>}
            <Filter id = {0} showDeleteButton = {false} queryArray = {queryArray} setQueryArray = {setQueryArray}/>
            {listOfExtraFilters.map((item)=>{
                return <Filter id = {item.id} key = {item.id} queryArray = {queryArray} setQueryArray = {setQueryArray} showDeleteButton = {true} deleteExtraFilter = {deleteExtraFilter}/>
            })}
            <div className ="flex flex-row content-center bg-secondary rounded-md text-sm w-24 p-0.5 cursor-pointer" onClick = {clickHandler}>
                <div className ="p-1 ml-1 mt-px">
                <span className ="material-icons-outlined text-xs">add</span>
                </div>
                <p className ="pt-1 pr-0.5">Add filter</p>
            </div>
        </div>
    )
}

export default FilterBox;