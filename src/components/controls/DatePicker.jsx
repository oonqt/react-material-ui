import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';
import DateUtils from '@date-io/date-fns';

export default function DatePicker(props) {
    const { name, label, value, onChange } = props;

    const convertToEventParam = (name, value) => ({
        target: {
            name,
            value
        }
    });

    return (
        <MuiPickersUtilsProvider utils={DateUtils}>
            <KeyboardDatePicker 
                label={label}
                format="MM/dd/yyyy"
                name={name}
                value={value}
                onChange={date => onChange(convertToEventParam(name, date))}
            />
        </MuiPickersUtilsProvider>
    )
}
