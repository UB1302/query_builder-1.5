import { useState } from "react";
import Modal from "./Modal";

const Dashboard = () => {

    const [openModal, setOpenModal] = useState(false)

    const clickHandler = () => {
        setOpenModal(true)
    }

    return (
        <div>
            <h4>Build your query</h4>
            <button onClick = {clickHandler}>Build query</button>
            {openModal && <Modal setOpenModal = {setOpenModal}>Modal says hi!</Modal>}
        </div>
    )
}

export default Dashboard;