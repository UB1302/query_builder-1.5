const Filter = () => {
    return (
        <div>
            <div>
                <label for="field">Field</label>
                <br/>
                <select name="field" id="field">
                    <option value="">Select field</option>
                    <option>Theme</option>
                    <option>Sub-theme</option>
                </select>
            </div>
            
            <div>
                <label for="condition">Condition</label>
                <br/>
                <select name="condition" id="condition">
                    <option>Equals</option>
                    <option>Does not equal</option>
                </select>
            </div>
            
            <div>
                <label for="criteria">Criteria</label>
                <br/>
                <select name="criteria" id="criteria">
                    <option>Offers</option>
                    <option>Performance</option>
                </select>
            </div>
            
        </div>
    )
}

export default Filter;