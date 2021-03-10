import React from 'react';
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
    isPermanent: false
}

export default function EmployeeForm() {
    const validate = (fieldValues = values) => {
        let temp = {...errors};

        if ('fullName' in fieldValues) temp.fullName = fieldValues.fullName ? '' : 'This field is required';
        if ('email' in fieldValues)  temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? '' : 'Email must be a valid email';
        if ('mobile' in fieldValues) temp.mobile = fieldValues.mobile.length > 9 && !isNaN(values.mobile) ? '' : 'Minimum 10 numbers required';
        if ('departmentId' in fieldValues) temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'Department is required.'

        setErrors({ ...temp });

        if(fieldValues === values) return Object.values(temp).every(x => x === '')
    }

    const { values, setValues, handleInputChange, errors, setErrors, resetForm } = useForm(initialFieldValues, true, validate);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(validate()) {
            employeeService.insertEmployee(values);
            resetForm();
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input 
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input 
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input 
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                    <Controls.Input 
                        label="Mobile Number"
                        name="mobile"
                        value={values.mobile}
                        error={errors.mobile}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup 
                        name="gender" 
                        label="Gender" 
                        value={values.gender} 
                        items={genderItems} 
                        onChange={handleInputChange} 
                    />
                    <Controls.Select 
                        name="departmentId" 
                        label="Department" 
                        value={values.departmentId} 
                        error={errors.departmentId}
                        onChange={handleInputChange} 
                        options={employeeService.getDepartmentCollection()} 
                    />
                    <Controls.DatePicker 
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox 
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermament}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                        />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
