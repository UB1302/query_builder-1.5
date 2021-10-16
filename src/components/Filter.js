import { useState } from "react/cjs/react.development";

const Filter = () => {

    const [field, setField] = useState("")
    const [condition, setCondition] = useState("")
    const [criteria, setCriteria] = useState("")

    return (
        <div className= "flex justify-start mb-3"> 
            <div className= "w-1/3 mr-3">
                <label htmlFor="field">Field</label>
                <br/>
                <select id="field" className= "bg-gray-700 w-full p-2 rounded">
                    <option value="">Select field</option>
                    <option>Theme</option>
                    <option>Sub-theme</option>
                </select>
            </div>
            
            <div className= "w-1/3 mr-3">
                <label htmlFor="condition">Condition</label>
                <br/>
                <select id="condition" className= "bg-gray-700 w-full p-2 rounded">
                    <option>Equals</option>
                    <option>Does not equal</option>
                </select>
            </div>
            
            <div className= "w-1/3">
                <label htmlFor="criteria">Criteria</label>
                <br/>
                <select id="criteria" className= "bg-gray-700 w-full p-2 rounded">
                    <option>Offers</option>
                    <option>Performance</option>
                </select>
            </div>
            
        </div>
    )
}

export default Filter;