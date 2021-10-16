import { useState } from "react/cjs/react.development";

const Filter = () => {

    const [field, setField] = useState("")
    const [condition, setCondition] = useState("")
    const [criteria, setCriteria] = useState("")

    return (
        <div className= "flex">
            <div>
                <label for="field">Field</label>
                <br/>
                <select id="field">
                    <option value="">Select field</option>
                    <option>Theme</option>
                    <option>Sub-theme</option>
                </select>
            </div>
            
            <div>
                <label for="condition">Condition</label>
                <br/>
                <select id="condition">
                    <option>Equals</option>
                    <option>Does not equal</option>
                </select>
            </div>
            
            <div>
                <label for="criteria">Criteria</label>
                <br/>
                <select id="criteria">
                    <option>Offers</option>
                    <option>Performance</option>
                </select>
            </div>
            
        </div>
    )
}

export default Filter;