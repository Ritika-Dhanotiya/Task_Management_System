import React, { useState } from 'react'
import Header from '../CompOther/header'
import CreateTask from '../CompOther/CreateTask'
import AllTask from '../CompOther/AllTask'
import Sidebar from '../CompOther/Sidebar'
import ManageEmployees from '../CompOther/ManageEmployees'
import MobileNavbar from '../CompOther/MobileNavbar'

const AdminDashboard = (props) => {
    const [page, setPage] = useState('dashboard');
    return (
        <div className='flex flex-col min-h-screen overflow-x-hidden'>
            <MobileNavbar role='admin' onNavigate={setPage} />
            <div className='flex flex-1 max-w-full'>
                <Sidebar role='admin' onNavigate={setPage} />
                <div className='flex-1 p-4 sm:p-7 md:ml-64 mt-14 md:mt-0 max-w-full'>
                    <Header changeUser={props.changeUser} />
                    {page === 'dashboard' && <CreateTask />}
                    {page === 'tasks' && <AllTask />}
                    {page === 'employees' && <ManageEmployees />}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard