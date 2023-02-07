import React, {useState} from "react";
import './styles.css';

const Modal = ({ setIsOpen, userData, columns, submitHandler }) => {

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

    return (
        <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Editar</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className="modalContent">
              <div className='dashboard-content-form' id="proveedor-form">
                {Object.entries(userData).map(([key, value]) => {
                    if (key === "id") return;

                    return (
                        <div className='dashboard-content-form-item'>
                            <label htmlFor={key}>{columns[key]}</label>
                            <input type="text" id={key} name={key} className='dashboard-content-input' value={currentValues[key]} onChange={valueChangeHandler} />
                        </div>
                    )
                })
                }
                <div className='dashboard-content-form-item'>
                    <button className="dashbord-form-btn" onClick={() => {submitHandler(currentValues)}}>Guardar</button>
                </div>

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