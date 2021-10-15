import { useState } from "react";
import QueryBuilder from "./QueryBuilder";

const Dashboard = () => {

    const [openQueryBuilder, setOpenQueryBuilder] = useState(false)

    const clickHandler = () => {
        setOpenQueryBuilder(true)
    }

    return (
        <div>
            <h4>Build your query</h4>
            <button onClick = {clickHandler}>Build query</button>
            {openQueryBuilder && <QueryBuilder setOpenQueryBuilder = {setOpenQueryBuilder}></QueryBuilder>}
        </div>
    )
}

export default Dashboard;