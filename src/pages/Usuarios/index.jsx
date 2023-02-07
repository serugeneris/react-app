import React, { useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import DataTable from 'react-data-table-component';

import { dummyUsuariosData, dummyUsuariosColumnas } from '../../constants/dummyUsuariosData';


import '../styles.css';
import Modal from '../../components/Modal';

// AUX FUNCTIONS TO CSV EXPORT
// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
	let result;

	const columnDelimiter = ',';
	const lineDelimiter = '\n';
	const keys = Object.keys(dummyUsuariosColumnas);

	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	array.forEach(item => {
		let ctr = 0;
		keys.forEach(key => {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];
			
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
	const link = document.createElement('a');
	let csv = convertArrayOfObjectsToCSV(array);
	if (csv == null) return;

	const filename = 'export.csv';

	if (!csv.match(/^data:text\/csv/i)) {
		csv = `data:text/csv;charset=utf-8,${csv}`;
	}

	link.setAttribute('href', encodeURI(csv));
	link.setAttribute('download', filename);
	link.click();
}

const Export = ({ onExport }) => <button className="dashbord-content-btn" onClick={e => onExport(e.target.value)}>Exportar</button>;

function Usuarios() {

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Apellido',
            selector: row => row.apellido,
            sortable: true,
        },
        {
            name: 'Tipo de terapia',
            selector: row => row.tipoDeTerapia,
        },
        {
            name: 'ESN',
            selector: row => row.esn,
            sortable: true,
        },
        {
            name: 'ESS',
            selector: row => row.ess,
        },
        {
            cell: row => <div className="dashbord-content-btn" onClick={()=>openModal(row.id)}>Editar</div>,
            button: true,
            allowOverflow: true,
            ignoreRowClick: true,
            style: {
                wordBreak: "unset"
            }
        }
    ];

    const [usuariosData, setUsuariosData] = useState(dummyUsuariosData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeUser, setActiveUser] = useState({});
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(usuariosData)} />, []);

    const openModal = (rowId) => {
        setActiveUser(usuariosData.find(elem => elem.id === rowId));
        setIsModalOpen(true);
    }

    const handleUsuariosDataChange = (currentValues) => {

        setUsuariosData([
            ...usuariosData.filter(usuario=>
                usuario.id !== currentValues.id
            ),
            currentValues
        ]
        );

        setIsModalOpen(false);

    }

    return (
        <div className='dashboard-content'>
            {isModalOpen && 
            <Modal 
                setIsOpen={setIsModalOpen} 
                userData={activeUser} 
                columns={dummyUsuariosColumnas}
                submitHandler={handleUsuariosDataChange}
            />}
            <DashboardHeader />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Usuarios</h2>
                </div>
                <DataTable
                    columns={columns}
                    data={usuariosData}
                    actions={actionsMemo}
                />
            </div>
        </div>

    )
}

export default Usuarios;