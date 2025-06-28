import React from 'react'
import Header from '../CompOther/header'
import CreateTask from '../CompOther/CreateTask'
import AllTask from '../CompOther/AllTask'

const AdminDashboard = (props) => {
    return (
        <div className='h-screen w-full p-7'>
            <Header changeUser={props.changeUser} />
            <CreateTask />
            <AllTask />
        </div>
    )
}

export default AdminDashboard