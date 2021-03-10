import { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialFieldValues, validateOnChange=false, validate) {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const {name,value} = e.target;

        setValues({
            ...values,
            [name]: value
        });

        if (validateOnChange) {
            validate({ [name]: value });
        }
    }

    const resetForm = () => {
        setValues(initialFieldValues);
        setErrors({});
    }

    return {
        values, setValues, handleInputChange, errors, setErrors, resetForm
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}));

export function Form(props) {
    const classes = useStyles();
    const { children, ...other} = props;

    return (
        <form autoComplete='off' className={classes.root} {...other}>
            {children}
        </form>
    )
}
