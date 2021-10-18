import { useState } from "react";
import {Rule, RuleGroup} from "../App"

interface FilterProps {
    id: number,
    showDeleteButton: boolean,
    deleteExtraFilter?: any, 
    queryArray: RuleGroup["children"]
    setQueryArray: React.Dispatch<React.SetStateAction<Rule[]>>
}


const Filter: React.FC<FilterProps> = ({id, showDeleteButton, deleteExtraFilter, queryArray, setQueryArray}) => {


    const [field, setField] = useState<string>("")
    const [condition, setCondition] = useState<string>("")
    const [criteria, setCriteria] = useState<string>("")
    const [canUpdate,setCanUpdate] = useState<boolean>(false)

    const setFieldHandler = (e: React.ChangeEvent<HTMLSelectElement>):void => {
        console.log(e.target.value)
        setField(e.target.value)
        if(canUpdate){
            setQueryArray(prev => prev.map(item => (item.id === id ? {
                id: id,
                field: e.target.value as Rule["field"],
                condition:condition as Rule["condition"],
                criteria: criteria,
                type:"rule"
            } : item)))
        }
    }

    const setConditionHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        console.log(e.target.value)
        setCondition(e.target.value)
        if(canUpdate){
            setQueryArray(prev => prev.map(item => (item.id === id ? {
                id: id,
                field: field as Rule["field"],
                condition:e.target.value as Rule["condition"],
                criteria: criteria,
                type:"rule"
            } : item)))
        }
    }

    const setCriteriaHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        console.log(e.target.value)
        setCriteria(e.target.value)
        if(canUpdate){
            setQueryArray(prev => prev.map(item => (item.id === id ? {
                id: id,
                field: field as Rule["field"],
                condition:condition as Rule["condition"],
                criteria: e.target.value,
                type:"rule"
            } : item)))
        }
    }
    if(!canUpdate){
        if(field && condition && criteria){
            setCanUpdate(true)
            let newQuery:Rule= {
                id:id,
                field: field as Rule["field"],
                condition:condition as Rule["condition"],
                criteria: criteria,
                type:"rule"
            }
            setQueryArray([...queryArray,newQuery])
        }
    }
    


    return (
        <div className= "flex justify-start mb-3"> 
            <div className= "w-1/3 mr-3">
                <label htmlFor="field">Field</label>
                <br/>
                <select defaultValue = {field} onChange = {setFieldHandler} id="field" className= "bg-gray-700 w-full p-2 rounded">
                
                    <option value= "" disabled hidden>Select field</option>
                    <optgroup label="PREDICTION">
                        <option value = "Theme">Theme</option>
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
            
            <div className= "w-1/3 mr-3">
                <label htmlFor="condition">Condition</label>
                <br/>
                <select defaultValue= {condition} onChange = {setConditionHandler} id="condition" className= "bg-gray-700 w-full p-2 rounded">
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
            
            <div className= "w-1/3">
                <label htmlFor="criteria">Criteria</label>
                <br/>
                <select defaultValue= {criteria} onChange = {setCriteriaHandler} id="criteria" className= "bg-gray-700 w-full p-2 rounded">
                <option value="" disabled hidden>Select criteria</option>
                    <option>Offers</option>
                    <option>Performance</option>
                    <option>Platform</option>
                    <option>Product Feedback</option>
                </select>
            </div>

            {showDeleteButton && <button className = "bg-indigo-500 p-2 px-3 rounded-md" onClick = {() => deleteExtraFilter(id)}>Delete</button>}
            
        </div>
    )
}

export default Filter;