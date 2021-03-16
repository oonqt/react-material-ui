import React, { useState } from "react";
import * as employeeService from "../../services/employeeService";
import useTable from "../../components/useTable";

import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from "@material-ui/core";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from "@material-ui/icons/Close";

import EmployeeForm from "./EmployeeForm";
import Controls from "../../components/controls/Controls";
import PageHeader from "../../components/PageHeader";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: "75%"
    },
    newButton: {
        position: "absolute",
        right: "10px"
    }
}));

const headCells = [
    { id: "fullName", label: "Employee Name" },
    { id: "email", label: "Email Address (Personal)" },
    { id: "mobile", label: "Mobile Number" },
    { id: "department", label: "Department" },
    { id: "actions", label: "Actions", disableSort: true }
];

export default function Employees() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState(employeeService.getAllEmployees());
    const [filterFn, setFilterFn] = useState({ fn: items => items });
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' });

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        const target = e.target;
        setFilterFn({
            fn: items => !target.value.length ? items : items.filter(x => x.fullName.toLowerCase().includes(target.value))
        });
    }

    const addOrEdit = (employee, resetForm) => {
        if (!employee.id) {
            employeeService.insertEmployee(employee);
        } else {
            employeeService.updateEmployee(employee);
        }

        resetForm();
        setOpenPopup(false);
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message: 'Successfully submitted',
            type: 'success'
        });
    }

    const onDelete = (id) => {
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message: 'Deleted successfully',
            type: 'error'
        });
    }

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    return (
        <>
            <PageHeader title="New Employee" subTitle="Form design with validation" icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input 
                        label="Search Employees"
                        className={classes.searchInput}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                    />
                    <Controls.Button 
                        text="Add New"
                        variant="outlined"
                        className={classes.newButton}
                        startIcon={<AddIcon />}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null) }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => openInPopup(item)}
                                        >
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => setConfirmDialog({
                                                isOpen: true,
                                                title: "Are you sure you want to delete this record",
                                                subtitle: "You cannot undo this action",
                                                onConfirm: () => onDelete(item.id)
                                            })}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                    <TblPagination />
                </TblContainer>
            </Paper>
            <Popup title="Employee Form" open={openPopup} setOpen={setOpenPopup}>
                <EmployeeForm 
                    addOrEdit={addOrEdit} 
                    recordForEdit={recordForEdit}
                />
            </Popup>
            <Notification 
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
