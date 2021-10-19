import { useState } from "react";
import {Rule, RuleGroup} from "../App"
import deleteIcon from "../assets/deleteIcon.png"

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

    const setInitialValues = () => {
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

    if(!canUpdate){
        if(field && condition && criteria){
            setTimeout(setInitialValues,1000)
            
        }
    }
    


    return (
        <div className= "flex justify-start  mb-3"> 
            <div className= "w-1/4 mr-3">
                <label className = "text-xs" htmlFor="field">Field</label>
                <br/>
                <select defaultValue = {field} onChange = {setFieldHandler} id="field" className= "bg-fifth border-gray-700 w-full p-1.5 rounded mt-1 text-sm">
                
                    <option className ="bg-fifth" value= "" disabled hidden>Select field</option>
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
            
            <div className= "w-1/4 mr-3">
                <label className = "text-xs" htmlFor="condition">Condition</label>
                <br/>
                <select defaultValue= {condition} onChange = {setConditionHandler} id="condition" className= "bg-fifth border border-gray-700 w-full p-1.5 rounded mt-1 text-sm">
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
                <select defaultValue= {criteria} onChange = {setCriteriaHandler} id="criteria" className= "bg-fifth border border-gray-700 w-full p-1.5 rounded mt-1 text-sm">
                <option value="" disabled hidden>Select criteria</option>
                    <option>Offers</option>
                    <option>Performance</option>
                    <option>Platform</option>
                    <option>Product Feedback</option>
                </select>
            </div>
            {showDeleteButton &&  <div className = "ml-2 mt-5 bg-fifth border border-gray-700 rounded"><span className="material-icons p-1 pt-2 cursor-pointer	" onClick = {() => deleteExtraFilter(id)}>delete</span>
            </div>}
            
            
            
        </div>
    )
}

export default Filter;