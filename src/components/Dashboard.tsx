import { useState } from "react";
import QueryBuilder from "./QueryBuilder";

const Dashboard = () => {

    const [openQueryBuilder, setOpenQueryBuilder] = useState<boolean>(false)

    const clickHandler = ():void => {
        setOpenQueryBuilder(true)
    }

    return (
        <div className = "bg-black text-white w-1/4 h-1/2 text-base mt-5 ml-7">
            <h2 className = "text-2xl mb-2">Build your query</h2>
            <p className = "text-sm text-gray-400 mb-3">Narrow your search further by adding <br/> some filters.</p>
            <button className = "bg-indigo-500 p-2 px-5 rounded-md" onClick = {clickHandler}>Build query</button>
            {openQueryBuilder && <QueryBuilder setOpenQueryBuilder = {setOpenQueryBuilder}></QueryBuilder>}
        </div>
    )
}

export default Dashboard;