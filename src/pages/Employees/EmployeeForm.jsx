import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import * as employeeService from '../../services/employeeService';

import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' }
]

const initialFieldValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermament: false
}

export default function EmployeeForm() {
    const { values, setValues, handleInputChange } = useForm(initialFieldValues);

    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input 
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleInputChange}
                    />
                    <Controls.Input 
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup name="gender" label="Gender" value={values.gender} items={genderItems} onChange={handleInputChange} />
                    <Controls.Select name="departmentId" label="Department" value={values.departmentId} onChange={handleInputChange} options={employeeService.getDepartmentCollection} />
                </Grid>
            </Grid>
        </Form>
    )
}
