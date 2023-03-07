import React, { useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import DataTable from 'react-data-table-component';
import { HiPencilSquare } from 'react-icons/hi2';
import { MdDelete, MdOutlineCancel } from 'react-icons/md';
import { apiHost } from '../../constants/api';

import { usersColumns } from '../../constants/usersColumns';

import '../styles.css';
import Modal from '../../components/Modal';
import { useEffect } from 'react';

// AUX FUNCTIONS TO CSV EXPORT

function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(usersColumns);

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

const getUsers = async () => {
    const res = await fetch(apiHost + '/provider');
    const users = await res.json();
    // console.log(users.data);
    return users.data;
}

const createUser = async (userData) => {
    const res = await fetch(apiHost + '/user', {
        method: "POST",
        body: JSON.stringify(userData)
    })

    return res
}

const putUser = async (userData) => {
    const res = await fetch(apiHost + '/user/' + userData.id, {
        method: "PUT",
        body: JSON.stringify(userData)
    })

    return res;
}

const Export = ({ onExport }) => <button className="dashbord-content-btn" onClick={e => onExport(e.target.value)}>Export</button>;
const NewUser = ({ onNewUser }) => <button className="dashbord-content-btn" onClick={() => onNewUser()}>New User</button>;
const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<input
			id="search"
			type="text"
			placeholder="Search"
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
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lastname,
            sortable: true,
        },
        {
            name: 'Therapy type',
            selector: row => row.therapy_type,
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
            selector: row => row.current_hs,
            sortable: true,
        },
        {
            name: 'Available Hours',
            selector: row => row.available_hs,
            sortable: true,
        },
        {
            name: 'Zipcodes',
            selector: row => Array.isArray(row) ? row.zip_codes.map(zipcode => zipcode + " ") : '',
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

    const [usersData, setUsersData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState({
        open: false,
        type: "newUser"
    });
    const [activeUser, setActiveUser] = useState({
        id: 0,
        username: '',
        password: '',
        name: '',
        lastname: '',
        therapy_type: '',
        esn: '',
        ess: '',
        current_hs: 0,
        available_hs: 0,
        zip_codes: [],
        urgency: ''
    });

    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const [filteredItems,setFilteredItems] = useState(usersData);

    useEffect(()=>{
        (async()=>{
            const users = await getUsers();
            for (const user of users.provider) {
                user.id = user.user_guid;
                user.ess ? user.ess = "yes" : user.ess = "no";
                user.esn ? user.esn = "yes" : user.esn = "no";
            }
            console.log(users.provider)
            setUsersData(users.provider)
        })()
    },[]);

    useEffect(()=>{
        setFilteredItems(usersData.filter(
            item => {
                for (const property in item) {
                    // try {
                        
                        if (item[property] && typeof item[property] === "string" && item[property].toLowerCase().includes(filterText.toLowerCase())) {
                            return true;
                        } else if (item[property] && Array.isArray(item[property])) {
                            item[property].forEach(elem => {
                                if (elem.includes(filterText.toLowerCase())) {
                                    return true;
                                }
                            })
                        }
                    // } catch(err) {
                    //     console.log(property)
                    //     console.log(item[property])
                    // }

                }


                return false;
            }
        ));
    },[usersData, filterText])



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

    const actionsMemo = React.useMemo(() => 
        <div className="admin-actions">
            <NewUser onNewUser={()=>{openModal()}}></NewUser>
            <Export onExport={() => downloadCSV(filteredItems)} />
        </div>
    , [filteredItems]);

    const openModal = (rowId = null) => {
        if (rowId) {
            setActiveUser(usersData.find(elem => elem.id === rowId));
            setIsModalOpen({
                open: true,
                type: "editUser"
            });
        } else {
            //post to api before updating the state
            setActiveUser({
                id: 0,
                username: '',
                name: '',
                lastname: '',
                therapy_type: '',
                esn: '',
                ess: '',
                current_hs: 0,
                available_hs: 0,
                zip_codes: [],
                urgency: ''
            })

            setIsModalOpen({
                open: true,
                type: "newUser"
            });
        }

    }

    const deleteRecord = () => {
        console.log("deleted record")
    }

    const handleUsersDataChange = (currentValues) => {

        if (isModalOpen.type === "editUser") {
            const res = putUser(currentValues);
            //validate response and set erro message if occurs
        } else if (isModalOpen.type === "newUser"){
            const res = createUser(currentValues);
            //validate response and set erro message if occurs
        }

        currentValues.esn ? currentValues.esn = "yes" : currentValues.esn = "no";
        currentValues.ess ? currentValues.ess = "yes" : currentValues.ess = "no";
        setUsersData([
            ...usersData.filter(user =>
                user.id !== currentValues.id
            ),
            currentValues
        ]
        );

        setIsModalOpen({
            open: false, 
            type: "editUser"
        });

    }

    return (
        <div className='dashboard-content'>
            {isModalOpen.open &&
                <Modal
                    type={isModalOpen.type}
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