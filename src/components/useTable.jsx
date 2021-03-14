import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableSortLabel, TablePagination, makeStyles } from '@material-ui/core';

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

export default function useTable(records, headCells, filterFn) {
    const classes = useStyles();

    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState();

    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const handleChangePage = (_, newPage) => setPage(newPage);
    
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getComparator = (order, orderBy) => order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        } else if (b[orderBy] > a[orderBy]) {
            return 1;
        } else return 0;
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    const handleSortRequest = (id) => {
        const isAsc = orderBy === id && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(id);
    }

    const TblHead = () => {
        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}>
                            {headCell.disableSort ? headCell.label : (
                                <TableSortLabel 
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => handleSortRequest(headCell.id)}
                                >   
                                    {headCell.label}    
                                </TableSortLabel>
                            )}
                        </TableCell>)
                    )
                }
            </TableRow>
        </TableHead>)
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
        TblHead,
        recordsAfterPagingAndSorting
    }
}
