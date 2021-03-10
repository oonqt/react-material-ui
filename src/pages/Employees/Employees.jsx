import React, { useState } from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import useTable from '../../components/useTable';
import * as employeeService from '../../services/employeeService';

import EmployeeForm from './EmployeeForm';
import PageHeader from "../../components/PageHeader";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}));

const headCells = [
    { id: 'fullName', label: 'Employee Name' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'department', label: 'Department' }
];

export default function Employees() {
    const classes = useStyles();
    const [records, setRecords] = useState(employeeService.getAllEmployees());

    const { TblContainer, TblHead, TblPagination } = useTable(records, headCells);

    return (
        <>
            <PageHeader title="New Employee" subTitle="Form design with validation" icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
            <Paper className={classes.pageContent}>
                {/* <EmployeeForm /> */}
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            records.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                    <TblPagination />
                </TblContainer>
            </Paper>
        </>
    )
}
