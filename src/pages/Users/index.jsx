import React, { useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import DataTable from 'react-data-table-component';
import { HiPencilSquare } from 'react-icons/hi2';
import { MdDelete, MdOutlineCancel } from 'react-icons/md';


import { dummyUsersData, dummyUsersColumns } from '../../constants/dummyUsersData';


import '../styles.css';
import Modal from '../../components/Modal';

// AUX FUNCTIONS TO CSV EXPORT

function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(dummyUsersColumns);

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

const Export = ({ onExport }) => <button className="dashbord-content-btn" onClick={e => onExport(e.target.value)}>Export</button>;
const NewUser = ({ onNewUser }) => <button className="dashbord-content-btn" onClick={() => onNewUser()}>New User</button>;
const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<input
			id="search"
			type="text"
			placeholder="Filter By Last Name"
			aria-label="Search Input"
            // className='dashboard-content-input'
			value={filterText}
			onChange={onFilter}
		/>
		<MdOutlineCancel onClick={onClear}/>
	</>
);

function Users() {

    const columns = [
        {
            name: 'First name',
            selector: row => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true,
        },
        {
            name: 'Therapy type',
            selector: row => row.therapyType,
            sortable: true,
        },
        {
            name: 'ESN',
            selector: row => row.esn,
            sortable: true,
        },
        {
            name: 'ESS',
            selector: row => row.ess,
            sortable: true,
        },
        {
            name: 'Current Hours',
            selector: row => row.currentHours,
            sortable: true,
        },
        {
            name: 'Available Hours',
            selector: row => row.availableHours,
            sortable: true,
        },
        {
            name: 'Zipcodes',
            selector: row => row.zipcodes.map(zipcode => zipcode + " "),
        },
        {
            name: 'Urgency',
            selector: row => row.urgency,
            sortable: true,
        },

        {
            cell: row => <HiPencilSquare className="dashboard-content-action-svg" onClick={() => openModal(row.id)}/>,
            button: true,
            allowOverflow: true,
            ignoreRowClick: true,
        },
        {
            cell: row => <MdDelete className="dashboard-content-action-svg" onClick={() => deleteRecord()}/>,
            button: true,
            allowOverflow: true,
            ignoreRowClick: true,
        }
    ];

    const [usersData, setUsersData] = useState(dummyUsersData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeUser, setActiveUser] = useState({
        id: 0,
        firstName: '',
        lastName: '',
        therapyType: '',
        esn: '',
        ess: '',
        currentHours: 0,
        availableHours: 0,
        zipcodes: [],
        urgency: ''
    });

    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const filteredItems = usersData.filter(
		item => item.lastName && item.lastName.toLowerCase().includes(filterText.toLowerCase()),
	);

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

    const actionsMemo = React.useMemo(() => <div className="admin-actions"><NewUser onNewUser={()=>{openModal()}}></NewUser><Export onExport={() => downloadCSV(usersData)} /></div>, []);

    const openModal = (rowId = null) => {
        if (rowId) {
            setActiveUser(usersData.find(elem => elem.id === rowId));
        } else {
            //post to api before updating the state
            setActiveUser({
                id: Math.random(),
                firstName: '',
                lastName: '',
                therapyType: '',
                esn: '',
                ess: '',
                currentHours: 0,
                availableHours: 0,
                zipcodes: [],
                urgency: ''
            })
        }
        setIsModalOpen(true);
    }

    const deleteRecord = () => {
        console.log("deleted record")
    }

    const handleUsersDataChange = (currentValues) => {

        setUsersData([
            ...usersData.filter(usuario =>
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
                    submitHandler={handleUsersDataChange}
                />}
            <DashboardHeader />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Users</h2>
                </div>
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    actions={actionsMemo}
                    subHeader
			        subHeaderComponent={subHeaderComponentMemo}
                />
            </div>
        </div>

    )
}

export default Users;