export const dummyUsersData = [
    {
        id: 1,
        firstName: 'Juan',
        lastName: 'Perez',
        therapyType: 'pt',
        esn: 'yes',
        ess: 'yes',
        currentHours: 2,
        availableHours: 6,
        zipcodes: [
            1000,
            1200
        ],
        urgency: "high"
    },
    {
        id: 2,
        firstName: 'Juana',
        lastName: 'Rodriguez',
        therapyType: 'ota',
        esn: 'yes',
        ess: 'yes',
        currentHours: 2,
        availableHours: 6,
        zipcodes: [
            1000,
            1200
        ],
        urgency: ""
    },
];

export const dummyUsersColumns = {
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