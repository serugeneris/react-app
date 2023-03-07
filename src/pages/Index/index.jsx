import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';


import '../styles.css';

function Index() {

    return (
        <div className='dashboard-content'>
            <DashboardHeader/>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Dashboard</h2>
                </div>
                <div className='dashboard-content-form'>
                    <ul>
                        <li className='dashboard-content-form-item' >
                            The users will be redirected to the correct page
                        </li>
                        <li className='dashboard-content-form-item' >
                            Providers will only be able to change time availability, urgency and zipcodes
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Index;