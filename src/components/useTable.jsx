import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TablePagination, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light
        },
        '& tbody td': {
            fontWeight: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        }
    }
}));

export default function useTable(records, headCells) {
    const classes = useStyles();

    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {
        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}>
                            {headCell.label}
                        </TableCell>)
                    )
                }
            </TableRow>
        </TableHead>)
    }

    const handleChangePage = (_, newPage) => setPage(newPage);
    
    const handleChangeRowsPerPage = event => setRowsPerPage(parseInt(event.target.value, 10));

    const recordsAfterPagingAndSorting = () => {
        return records.slice();
    }

    const TblPagination = () => (<TablePagination 
        component='div'
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />)
    
    return {
        TblContainer,
        TblPagination,
        TblHead
    }
}