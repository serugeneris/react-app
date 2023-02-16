import React, {useState} from "react";
import './styles.css';
import { therapyTypes as therapyTypes1} from "../../constants/therapyTypes";
import { zipcodeOptions } from "../../constants/zipcodeOptions";
import { urgencyOptions } from "../../constants/urgencyOptions";
import { esnTypes } from "../../constants/esnTypes";
import { essTypes } from "../../constants/essTypes";
import Select from 'react-select';

const Modal = ({ setIsOpen, userData, submitHandler }) => {

    const therapyTypes = therapyTypes1

    const [currentValues, setCurrentValues] = useState(userData);

    const valueChangeHandler = (event)=> {
        console.log('handler')
        const newValue = event.target.value;
        const key = event.target.name;
        setCurrentValues({
            ...currentValues,
            [key]: newValue,
        })
    }

    const handleSelectChange = (choice, fieldName) => {
        if (choice[0]) {
            setCurrentValues({
                ...currentValues,
                [fieldName]: choice.map(c => { return c.value }),
            });
        } else {
            setCurrentValues({
                ...currentValues,
                [fieldName]: choice.value,
            });
        }
    }

    return (
        <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">User Data</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className="modalContent">
              <div className='dashboard-content-form' id="user-form">
                {/* {Object.entries(userData).map(([key, value]) => {
                    if (key === "id") return;

                    return (
                        <div className='dashboard-content-form-item'>
                            <label htmlFor={key}>{columns[key]}</label>
                            <input type="text" id={key} name={key} className='dashboard-content-input' value={currentValues[key]} onChange={valueChangeHandler} />
                        </div>
                    )
                })
                } */}

                    <div className='dashboard-content-form-item'>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" className='dashboard-content-input' value={currentValues["firstName"]} onChange={valueChangeHandler} />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" className='dashboard-content-input' value={currentValues["lastName"]} onChange={valueChangeHandler} />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="therapyTypes">Therapy Types</label>
                        <Select options={therapyTypes} id="therapyTypes" name="therapyTypes" placeholder="Therapy Types" onChange={(choice) => { handleSelectChange(choice, "therapyType") }} value={currentValues['therapyType'] ? {value: currentValues['therapyType'], label: therapyTypes.find(elem=>elem.value == currentValues['therapyType']).label}: {value:"", label:""}} className='dashboard-content-select' />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="esnTypes">ESN</label>
                        <Select options={esnTypes} id="esnTypes" name="esnTypes" placeholder="ESN Types" onChange={(choice) => { handleSelectChange(choice, "esn") }} value={currentValues['esn'] ? {value: currentValues['esn'], label: esnTypes.find(elem=>elem.value == currentValues['esn']).label}: {value:"", label:""}} className='dashboard-content-select' />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="essTypes">ESS</label>
                        <Select options={essTypes} id="essTypes" name="essTypes" placeholder="ESS Types" onChange={(choice) => { handleSelectChange(choice, "ess") }} value={currentValues['ess'] ? {value: currentValues['ess'], label: essTypes.find(elem=>elem.value == currentValues['ess']).label}: {value:"", label:""}} className='dashboard-content-select' />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="currentHours">Current hours</label>
                        <input min="0" type="number" id="currentHours" name="currentHours" className='dashboard-content-input' value={currentValues["currentHours"]} onChange={valueChangeHandler} />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="availableHours">Available hours</label>
                        <input min="0" type="number" id="availableHours" name="availableHours" className='dashboard-content-input' value={currentValues["availableHours"]} onChange={valueChangeHandler} />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="zipcodes">Zipcodes</label>
                        <Select isMulti options={zipcodeOptions} id="zipcodes" name="zipcodes" placeholder="Zipcodes" onChange={(choice) => { handleSelectChange(choice, "zipcodes") }} value={currentValues["zipcodes"] ? currentValues["zipcodes"].map(val => {return {value: val, label: zipcodeOptions.find(elem=>elem.value == val).label}}) : {value:"", label:""}} className='dashboard-content-select' />
                    </div>
                    <div className='dashboard-content-form-item'>
                        <label htmlFor="urgency">Urgency</label>
                        <Select options={urgencyOptions} id="urgency" name="urgency" placeholder="Urgency" onChange={(choice) => { handleSelectChange(choice, "urgency") }} value={currentValues['urgency'] ? {value: currentValues['urgency'], label: urgencyOptions.find(elem=>elem.value == currentValues['urgency']).label} : {value:"", label:""}} className='dashboard-content-select' />
                    </div>


            </div>
            <div className='dashboard-content-form-action' >
                    <button className="dashbord-form-btn" onClick={() => {submitHandler(currentValues)}}>Save</button>
                </div>
          </div>
          {/* <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                Delete
              </button>
              <button
                className="cancelBtn"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
    );
};

export default Modal;