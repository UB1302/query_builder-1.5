import {useEffect, useState } from "react";
import Filter from "./Filter";
import {Rule, RuleGroup} from "../App"

interface FilterBoxProps {
    id: number
    resultChildren: (RuleGroup | Rule)[]
    setResultChildren: React.Dispatch<React.SetStateAction<(RuleGroup | Rule)[]>>
    showDeleteButton: boolean
    deleteExtraFilterBox?: any
}

interface extraFiltersInterface {// To keep track of filters added by user other then the default filter
   extraFilters: {
        id: number
    }[]
}

const FilterBox: React.FC<FilterBoxProps> = ({id, resultChildren, setResultChildren, showDeleteButton, deleteExtraFilterBox}) => {

    const [showOperator,setShowOperator] = useState<boolean>(false)
    const [numberOfExtraFilters, setNumberOfExtraFilters] = useState<number>(1)
    const [listOfExtraFilters,setListOfExtraFilters] = useState<extraFiltersInterface["extraFilters"]>([])
    const [conjunction,setConjunction] = useState("AND")
    const [queryGroup, setQueryGroup] = useState<RuleGroup>({
        id:id,
        children: [],
        conjunction: conjunction as RuleGroup["conjunction"],
        not: false,
        type: 'rule_group'
    })
    const [queryArrayChildren, setQueryArrayChildren] = useState<RuleGroup["children"]>([])
    // console.log(queryGroup)

    const addHandler = () => {
        setShowOperator(true)
        let extraFilter = {
            id:numberOfExtraFilters,
        }
        setListOfExtraFilters([...listOfExtraFilters,extraFilter])
        setNumberOfExtraFilters(prevCount => prevCount + 1)
    }


    const deleteExtraFilter = (id:number) => {
        let temp = [...listOfExtraFilters].filter((item)=>item.id !== id)
        let tempQueryArray = [...queryArrayChildren].filter((item)=>item.id !== id)
        setQueryArrayChildren(tempQueryArray)
        setListOfExtraFilters(temp)
    }

    const andConjunctionHandler = () => {
        setConjunction("AND")
    }

    const orConjunctionHandler = () => {
        setConjunction("OR")
    }   

    useEffect(()=> {
        setQueryGroup(      
        {
            id:id,
            children: queryArrayChildren,
            conjunction: conjunction as RuleGroup["conjunction"],
            not: false,
            type: 'rule_group'
        }
        )
        // console.log("queryArrayChildren:" + JSON.stringify(queryArrayChildren));
        
    },[queryArrayChildren, conjunction,id])

    useEffect(()=>{
            // console.log(resultChildren.filter(item => item.id === id).length)
            if((resultChildren.filter(item => item.id === id)).length){
                // console.log("if")
                setResultChildren(resultChildren.map(item => (item.id === id ? queryGroup: item)))
            }else{
                // console.log("else")
                setResultChildren([...resultChildren,{...queryGroup}])
            }
    },[queryGroup])

    return(
        <div className = "bg-third rounded border border-gray-700 mt-24 w-11/12 m-auto p-3 mb-4">
            {showOperator && 
                <div className ="mb-2 text-sm">
                    <button onClick = {andConjunctionHandler} className = {conjunction === "AND" ? "bg-secondary p-1 rounded-l	" : "bg-fifth p-1 rounded-l"}>AND</button>
                    <button onClick = {orConjunctionHandler} className = {conjunction === "OR" ? "bg-secondary p-1 rounded-r" : "bg-fifth p-1 rounded-r"}>OR</button>
                </div>}
            <Filter id = {0} showDeleteButton = {false} deleteExtraFilter = {deleteExtraFilter} queryArrayChildren = {queryArrayChildren} setQueryArrayChildren = {setQueryArrayChildren}/>
            {listOfExtraFilters.map((item)=>{
                return <Filter id = {item.id} key = {item.id} showDeleteButton = {true} deleteExtraFilter = {deleteExtraFilter} queryArrayChildren = {queryArrayChildren} setQueryArrayChildren = {setQueryArrayChildren}/>
            })}
            <div className ="flex flex-row content-center bg-secondary rounded-md text-sm w-24 p-0.5 cursor-pointer" onClick = {addHandler}>
                <div className ="p-1 ml-1 mt-px">
                <span className ="material-icons-outlined text-xs">add</span>
                </div>
                <p className ="pt-1 pr-0.5">Add filter</p>
            </div>
            {showDeleteButton &&  <div className = "ml-2 mt-5 w-8 bg-fifth border border-gray-700 rounded"><span className="material-icons p-1 mt-1 cursor-pointer	" onClick = {() => deleteExtraFilterBox(id)}>delete</span></div>}   
        </div>
    )
}

export default FilterBox;