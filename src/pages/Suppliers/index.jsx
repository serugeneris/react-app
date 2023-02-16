import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import Select from 'react-select';

import { dummyUsersData } from '../../constants/dummyUsersData';


import '../styles.css';

function Supplier() {

    const urgencyOptions = [
        { value: 'low', label: 'LOW' },
        { value: 'medium', label: 'MEDIUM' },
        { value: 'high', label: 'HIGH' },
    ];

    const zipcodeOptions = [
        { value: '1000', label: '1000' },
        { value: '1100', label: '1100' },
        { value: '1200', label: '1200' },
        { value: '1300', label: '1300' },
        { value: '1400', label: '1400' },
    ];

    const [supplierData, setSupplierData] = useState(dummyUsersData[0]);

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setSupplierData({
            ...supplierData,
            [fieldName]: fieldValue,
        });
    }

    const handleSelectChange = (choice, fieldName) => {
        if (choice[0]) {
            setSupplierData({
                ...supplierData,
                [fieldName]: choice.map(c => { return c.value }),
            });
        } else {
            setSupplierData({
                ...supplierData,
                [fieldName]: choice.value,
            });
        }
    }

    const handleSave = (e)=>{
        e.preventDefault();
        alert("Data has been saved!")
    }

    return (
        <div className='dashboard-content'>
            <DashboardHeader/>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Data</h2>
                </div>
                <form className='dashboard-content-form' id="supplier-form">
                    <div className='dashboard-content-form-item' >
                        <input type="text" className='dashboard-content-input' disabled value={supplierData["lastName"] + ', ' + supplierData["firstName"]}/>
                    </div>
                    <div className='dashboard-content-form-item'>
                            <label htmlFor="currentHours">Current hours with 123T</label>
                            <input min="0" type="number" id="currentHours" name="currentHours" className='dashboard-content-input' value={supplierData["currentHours"] ?? ""} onChange={handleChange} />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="availableHours">Available hours</label>
                        <input min="0" type="number" id="availableHours" name="availableHours" className='dashboard-content-input' value={supplierData["availableHours"] ?? ""} onChange={handleChange} />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="zipcodes">Zipcodes</label>
                        <Select isMulti options={zipcodeOptions} id="zipcodes" name="zipcodes" placeholder="Zipcodes" onChange={(choice) => { handleSelectChange(choice, "zipcodes") }} value={supplierData["zipcodes"] ? supplierData["zipcodes"].map(val => {return {value: val, label: zipcodeOptions.find(elem=>elem.value == val).label}}) : []} className='dashboard-content-select' />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="urgency">Urgency</label>
                        <Select options={urgencyOptions} id="urgency" name="urgency" placeholder="Urgency" onChange={(choice) => { handleSelectChange(choice, "urgency") }} value={supplierData['urgency'] ? {value: supplierData['urgency'], label: urgencyOptions.find(elem=>elem.value == supplierData['urgency']).label} : {value:"", label:""}} className='dashboard-content-select' />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <button onClick={handleSave} id="save" className="dashbord-content-btn" >Save</button>                       
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Supplier;