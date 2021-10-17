import { useState } from "react";

const Filter = ({id,showDeleteButton,deleteExtraFilter,queryArray, setQueryArray}) => {

    const [field, setField] = useState("")
    const [condition, setCondition] = useState("")
    const [criteria, setCriteria] = useState("")
    const [canUpdate,setCanUpdate] = useState(false)

    const setFieldHandler = (e) => {
        console.log(e.target.value)
        setField(e.target.value)
        if(canUpdate){
            setQueryArray(prev => prev.map(item => (item.id === id ? {
                id: id,
                field: e.target.value,
                condition:condition,
                criteria: criteria
            } : item)))
        }
    }

    const setConditionHandler = (e) => {
        console.log(e.target.value)
        setCondition(e.target.value)
        if(canUpdate){
            setQueryArray(prev => prev.map(item => (item.id === id ? {
                id: id,
                field: field,
                condition:e.target.value,
                criteria: criteria
            } : item)))
        }
    }

    const setCriteriaHandler = (e) => {
        console.log(e.target.value)
        setCriteria(e.target.value)
        if(canUpdate){
            setQueryArray(prev => prev.map(item => (item.id === id ? {
                id: id,
                field: field,
                condition:condition,
                criteria: e.target.value
            } : item)))
        }
    }
    if(!canUpdate){
        if(field && condition && criteria){
            setCanUpdate(true)
            let newQuery = {
                id: id,
                field: field,
                condition:condition,
                criteria: criteria
            }
            setQueryArray([...queryArray,newQuery])
        }
    }
    


    return (
        <div className= "flex justify-start mb-3"> 
            <div className= "w-1/3 mr-3">
                <label htmlFor="field">Field</label>
                <br/>
                <select defaultValue= {field} onChange = {setFieldHandler} id="field" className= "bg-gray-700 w-full p-2 rounded">
                
                    <option value="" disabled hidden>Select field</option>
                    <optgroup label="PREDICTION">
                        <option>Theme</option>
                        <option>Sub-theme</option>
                        <option>Reason</option>
                        <option>Language</option>
                        <option>Source</option>
                        <option>Rating</option>
                        <option>Time Period</option>
                    </optgroup>
                    <optgroup label="COMMON">
                        <option>Customer ID</option>
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