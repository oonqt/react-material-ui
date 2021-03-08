import React from 'react';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

export default function Checkbox(props) {
    const { name, label, value, onChange } = props;

    const convertToEventParam = (name, value) => ({
        target: {
            name,
            value
        }
    });

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox 
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToEventParam(name, e.target.value))}
                />} 
                label={label}
            />
        </FormControl>
    )
}
