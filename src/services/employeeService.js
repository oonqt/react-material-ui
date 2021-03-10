const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId'
}

export const getDepartmentCollection = () => ([
    { id: 1, title: 'Development' },
    { id: 2, title: 'Marketing' },
    { id: 3, title: 'Accounting' },
    { id: 4, title: 'HR' }
]);

const generateEmployeeId = () => {
    let id = parseInt(localStorage.getItem(KEYS.employeeId) || 0);
    localStorage.setItem(KEYS.employeeId, (++id).toString());
    return id;
}

export const insertEmployee = (data) => {
    const employees = getAllEmployees();
    data['id'] = generateEmployeeId();
    employees.push(data);
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export const getAllEmployees = () => {
    const employees = JSON.parse(localStorage.getItem(KEYS.employees)) || [];
    const departments = getDepartmentCollection();
    return employees.map(e => ({
        ...e,
        department: departments[e.departmentId - 1].title
    }));
}