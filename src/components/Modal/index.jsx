import React, { useState } from "react";
import './styles.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'At least 6 characters long!')
        .max(50, 'Too Long!'),
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
})

const Modal = ({ type, setIsOpen, userData, submitHandler }) => {

    const [isAdmin, setIsAdmin] = useState(true);
    const handleIsAdmin = ()=>{
        setIsAdmin(!isAdmin);
    }

    return (
        <>
            <div className="darkBG" onClick={() => setIsOpen({
                open: false,
                type: "newUser"
            })} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">User Data</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setIsOpen({
                        open: false,
                        type: "newUser"
                    })}>
                        X
                    </button>
                    <div className="modalContent">
                        <Formik
                            initialValues={userData}
                            onSubmit={
                                values => {
                                    // same shape as initial values
                                    console.log("submit")
                                    values.isAdmin ? values.role = "admin" : values.role = "provider";
                                    values.ess === "yes" ? values.ess = true : values.ess = false;
                                    values.esn === "yes" ? values.esn = true : values.esn = false;
                                    console.log(values);
                                    submitHandler(values);
                                }
                            }
                            validationSchema={ValidationSchema}
                        >{({ errors, touched }) => (
                            <Form className='dashboard-content-form' id="user-form">
                                <div className='dashboard-content-form-items'>
                                    <div className='dashboard-content-form-item'>
                                        <label htmlFor="username">Username</label>
                                        <Field className='dashboard-content-input' id="username" name="username" type="text" />
                                        {errors.username && touched.username ? (
                                            <div className="dashboard-content-form-item-error" >{errors.username}</div>
                                        ) : null}
                                    </div>
                                    <div className='dashboard-content-form-item'>
                                        <label htmlFor="password">Password</label>
                                        <Field className='dashboard-content-input' type="password" id="password" name="password" />
                                        {errors.password && touched.password ? (
                                            <div className="dashboard-content-form-item-error" >{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className='dashboard-content-form-item'>
                                        <label htmlFor="name">First Name</label>
                                        <Field type="text" id="name" name="name" className='dashboard-content-input' />
                                        {errors.name && touched.name ? (
                                            <div className="dashboard-content-form-item-error" >{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className='dashboard-content-form-item'>
                                        <label htmlFor="lastname">Last Name</label>
                                        <Field type="text" id="lastname" name="lastname" className='dashboard-content-input' />
                                        {errors.lastname && touched.lastname ? (
                                            <div className="dashboard-content-form-item-error" >{errors.lastname}</div>
                                        ) : null}
                                    </div>
                                    <div className='dashboard-content-form-item'>
                                        <label htmlFor="isAdmin">Is Admin?</label>
                                        <input type="checkbox" defaultChecked={isAdmin} id="isAdmin" onChange={handleIsAdmin}/>
                                    </div>
                                    {!isAdmin && (
                                        <>
                                        
                                        <div className='dashboard-content-form-item'>
                                            <label htmlFor="therapy_type">Therapy Type</label>
                                            <Field as="select" id="therapy_type" name="therapy_type" placeholder="Therapy Types" className='dashboard-content-select' >
                                                <option value="" disabled>Therapy Types</option>
                                                <option value="PT">PT</option>
                                                <option value="PTA">PTA</option>
                                                <option value="OT">OT</option>
                                                <option value="OTA">OTA</option>
                                                <option value="ITDS">ITDS</option>
                                            </Field>
                                            {errors.therapy_type ? (
                                                <div className="dashboard-content-form-item-error" >{errors.therapy_type}</div>
                                            ) : null}
                                        </div>
                                        <div className='dashboard-content-form-item'>
                                            <label htmlFor="esn">ESN</label>
                                            <Field as="select" id="esn" name="esn" className='dashboard-content-select' >
                                                <option value="" disabled>ESN Types</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Field>
                                            {errors.esn ? (
                                                <div className="dashboard-content-form-item-error" >{errors.ess}</div>
                                            ) : null}
                                        </div>
                                        <div className='dashboard-content-form-item'>
                                            <label htmlFor="ess">ESS</label>
                                            <Field as="select" id="ess" name="ess" className='dashboard-content-select' >
                                                <option value="" disabled>ESS Types</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Field>
                                            {errors.ess ? (
                                                <div className="dashboard-content-form-item-error" >{errors.ess}</div>
                                            ) : null}
                                        </div>
                                        </>
                                    )}
                                </div>
                                <div className='dashboard-content-form-actions'>
                                    <div className='dashboard-content-form-action' >
                                        <button className="dashbord-form-btn" type="submit">Save</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                        </Formik>

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