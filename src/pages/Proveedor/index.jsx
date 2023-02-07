import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import Select from 'react-select';

import { dummyProveedorData } from '../../constants/dummyProveedorData';


import '../styles.css';

function Proveedor() {

    const urgenciaOptions = [
        { value: 'baja', label: 'BAJA' },
        { value: 'media', label: 'MEDIA' },
        { value: 'alta', label: 'ALTA' },
    ];

    const zipcodeOptions = [
        { value: '1000', label: '1000' },
        { value: '1100', label: '1100' },
        { value: '1200', label: '1200' },
        { value: '1300', label: '1300' },
        { value: '1400', label: '1400' },
    ];

    const [proveedorData, setProveedorData] = useState(dummyProveedorData);

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setProveedorData({
            ...proveedorData,
            [fieldName]: fieldValue,
        });
    }

    const handleSelectChange = (choice, fieldName) => {
        if (choice[0]) {
            setProveedorData({
                ...proveedorData,
                [fieldName]: choice.map(c => { return c.value }),
            });
        } else {
            setProveedorData({
                ...proveedorData,
                [fieldName]: choice.value,
            });
        }
    }


    // useEffect(() => {
    //     setProveedorData(dummyProveedorData);
    // }, []);

    // // Search
    // const __handleSearch = (event) => {
    //     setSearch(event.target.value);
    //     if (event.target.value !== '') {
    //         let search_results = orders.filter((item) =>
    //             item.first_name.toLowerCase().includes(search.toLowerCase()) ||
    //             item.last_name.toLowerCase().includes(search.toLowerCase()) ||
    //             item.product.toLowerCase().includes(search.toLowerCase())
    //         );
    //         setOrders(search_results);
    //     }
    //     else {
    //         __handleChangePage(1);
    //     }
    // };

    // // Change Page 
    // const __handleChangePage = (new_page) => {
    //     setPage(new_page);
    //     setOrders(sliceData(all_orders, new_page, 5));
    // }

    return (
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="Guardar" />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Datos</h2>
                </div>
                <form className='dashboard-content-form' id="proveedor-form">
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="horas-actuales">Cantidad de horas actuales con 123T</label>
                        <input min="0" type="number" id="horas-actuales" name="horas-actuales" className='dashboard-content-input' value={proveedorData["horas-actuales"] ?? ""} onChange={handleChange} />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="horas-disponibles">Cantidad de horas disponibles</label>
                        <input min="0" type="number" id="horas-disponibles" name="horas-disponibles" className='dashboard-content-input' value={proveedorData["horas-disponibles"] ?? ""} onChange={handleChange} />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="zipcode">Zipcodes</label>
                        <Select isMulti options={zipcodeOptions} id="zipcode" name="zipcode" placeholder="Zipcodes" onChange={(choice) => { handleSelectChange(choice, "zipcodes") }} value={proveedorData["zipcodes"] ? proveedorData["zipcodes"].map(val => {return {value: val, label: zipcodeOptions.find(elem=>elem.value == val).label}}) : []} className='dashboard-content-select' />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="urgencia">Urgencia</label>
                        <Select options={urgenciaOptions} id="urgencia" name="urgencia" placeholder="Urgencia" onChange={(choice) => { handleSelectChange(choice, "urgencia") }} value={proveedorData['urgencia'] ? {value: proveedorData['urgencia'], label: urgenciaOptions.find(elem=>elem.value == proveedorData['urgencia']).label} : {value:"", label:""}} className='dashboard-content-select' />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Proveedor;