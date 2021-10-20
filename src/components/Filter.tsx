import {useState, useEffect } from "react";
import {Rule, RuleGroup} from "../App"

interface FilterProps {
    id: number,
    showDeleteButton: boolean,
    deleteExtraFilter?: any,
    queryArrayChildren: (RuleGroup | Rule)[],
    setQueryArrayChildren: React.Dispatch<React.SetStateAction<(RuleGroup | Rule)[]>>

}

const Filter: React.FC<FilterProps> = ({id, showDeleteButton, deleteExtraFilter,queryArrayChildren, setQueryArrayChildren}) => {

    const [field, setField] = useState<string>("")
    const [condition, setCondition] = useState<string>("")
    const [criteria, setCriteria] = useState<string>("")
    const [canUpdate,setCanUpdate] = useState<boolean>(false)// after initialization it avoids value from being initiated again.
    const [query,setQuery] = useState<Rule>({
        id: id,
        field: field as Rule["field"],
        condition:condition as Rule["condition"],
        criteria: criteria,
        type:"rule"
    })
    // console.log("query: " + JSON.stringify(query));


    const setFieldHandler = (e: React.ChangeEvent<HTMLSelectElement>):void => {
        setField(e.target.value)
        if(canUpdate){
            setQuery( {
                ...query,
                id: id,
                field: e.target.value as Rule["field"],
                condition:condition as Rule["condition"],
                criteria: criteria,
                type:"rule"
            })
            setQueryArrayChildren(queryArrayChildren.map(item => (item.id === id ? {
                ...query,
                id: id,
                field: e.target.value as Rule["field"],
                condition:condition as Rule["condition"],
                criteria: criteria,
                type:"rule"
            } : item)))
        }
    }

    const setConditionHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setCondition(e.target.value)
        if(canUpdate){
            setQuery( {
                ...query,
                id: id,
                field: e.target.value as Rule["field"],
                condition:condition as Rule["condition"],
                criteria: criteria,
                type:"rule"
            })
            setQueryArrayChildren(queryArrayChildren.map(item => (item.id === id ? {
                ...query,
                id: id,
                field: e.target.value as Rule["field"],
                condition:condition as Rule["condition"],
                criteria: criteria,
                type:"rule"
            } : item)))   
        }
    }

    const setCriteriaHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setCriteria(e.target.value)
        if(canUpdate){
            setQuery( {
                ...query,
                id: id,
                field: e.target.value as Rule["field"],
                condition:condition as Rule["condition"],
                criteria: criteria,
                type:"rule"
            })
            setQueryArrayChildren(queryArrayChildren.map(item => (item.id === id ? {
                ...query,
                id: id,
                field: e.target.value as Rule["field"],
                condition:condition as Rule["condition"],
                criteria: criteria,
                type:"rule"
            } : item)))   
        }
    }

    const setInitialValues = () => {
        setCanUpdate(true)
        setQuery( {
            ...query,
            id:id,
            field: field as Rule["field"],
            condition:condition as Rule["condition"],
            criteria: criteria,
            type:"rule"
        })
        // console.log("query: " + field + condition + criteria)
        // console.log("query: " + JSON.stringify(query))
        setQueryArrayChildren([...queryArrayChildren, {
            ...query,
            id:id,
            field: field as Rule["field"],
            condition:condition as Rule["condition"],
            criteria: criteria,
            type:"rule"
        }])
    }

    if(!canUpdate){
        if(field && condition && criteria){
            setTimeout(()=>{setInitialValues()},500)
        }
    }

    // useEffect(()=>{
    //     if(canUpdate){
    //         setQueryArrayChildren(queryArrayChildren.map(item => (item.id === id ? query : item)))   
    //     }
    //     // else if(field && condition && criteria) {
    //     //     // console.log("query: " + query)
    //     //     setQueryArrayChildren([...queryArrayChildren, query])
    //     // }
    //     // console.log("query: " + JSON.stringify(query))
    //     // setQueryArrayChildren([...queryArrayChildren, query])
    // },[query])
    
    return (
        <div className= "flex justify-start  mb-3"> 
            <div className= "w-1/4 mr-3">
                <label className = "text-xs" htmlFor="field">Field</label>
                <br/>
                <select defaultValue = {field} onChange = {setFieldHandler} id="field" className= "bg-fifth border-gray-700 w-full p-1.5 rounded mt-1 text-sm outline-none cursor-pointer">
                
                    <option value= "" disabled hidden>Select field</option> 
                    <optgroup className = "my-8" label="PREDICTION">
                        <option className = "my-4" value = "Theme">Theme</option>
                        <option value = "Sub-theme">Sub-theme</option>
                        <option value = "Reason">Reason</option>
                        <option value = "Language">Language</option>
                        <option value = "Source">Source</option>
                        <option value = "Rating">Rating</option>
                        <option value = "Time Period">Time Period</option>
                    </optgroup>
                    <optgroup label="COMMON">
                        <option value = "Customer ID">Customer ID</option>
                    </optgroup>
                </select>
            </div>
            
            <div className= "w-1/4 mr-3">
                <label className = "text-xs" htmlFor="condition">Condition</label>
                <br/>
                <select defaultValue= {condition} onChange = {setConditionHandler} id="condition" className= "bg-fifth border border-gray-700 w-full p-1.5 rounded mt-1 text-sm outline-none cursor-pointer">
                <option value="" disabled hidden>Select condition</option>
                    <option>Equals</option>
                    <option>Does not equal</option>
                    <option>Like</option>
                    <option>Not like</option>
                    <option>is Empty</option>
                    <option>Is</option>
                    <option>Is not</option>
                </select>
            </div>
            
            <div className= "w-1/4">
                <label className = "text-xs" htmlFor="criteria">Criteria</label>
                <br/>
                <select defaultValue= {criteria} onChange = {setCriteriaHandler} id="criteria" className= "bg-fifth border border-gray-700 w-full p-1.5 rounded mt-1 text-sm outline-none cursor-pointer">
                <option value="" disabled hidden>Select criteria</option>
                    <option>Offers</option>
                    <option>Performance</option>
                    <option>Platform</option>
                    <option>Product Feedback</option>
                </select>
            </div>
            {showDeleteButton &&  <div className = "ml-2 mt-5 bg-fifth border border-gray-700 rounded"><span className="material-icons p-1 mt-1 cursor-pointer	" onClick = {() => deleteExtraFilter(id)}>delete</span></div>}   
        </div>
    )
}

export default Filter;