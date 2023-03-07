export const dummyUsersData = [
    {
        id: 1,
        username: 'juan@example.com',
        name: 'Juan',
        lastname: 'Perez',
        therapy_type: 'pt',
        esn: true,
        ess: true,
        current_hs: 2,
        available_hs: 6,
        zip_codes: [
            1000,
            1200
        ],
        urgency: "high"
    },
    {
        id: 2,
        username: 'juana@example.com',
        name: 'Juana',
        lastname: 'Rodriguez',
        therapy_type: 'ota',
        esn: true,
        ess: true,
        current_hs: 2,
        available_hs: 6,
        zip_codes: [
            1000,
            1200
        ],
        urgency: ""
    },
];

export const dummyUsersColumns = {
    username: 'Username',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    therapyType: 'Therapy Type',
    esn: 'ESN',
    ess: 'ESS',
    currentHours: "Current Hours",
    availableHours: "Available Hours",
    zipcodes: "Zipcodes",
    urgency: "Urgency"
}