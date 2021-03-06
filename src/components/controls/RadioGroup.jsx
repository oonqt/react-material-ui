import { FormControlLabel, Radio, FormControl, RadioGroup as MuiRadioGroup, FormLabel } from '@material-ui/core';
import React from 'react'

export default function RadioGroup(props) {
    const { name, label, value, onChange, items } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row name={name} value={value} items={items} onChange={onChange}>
                {items.map((item, index) => (
                    <FormControlLabel key={index} value={item.id} control={<Radio />} label={item.title} />
                ))}
            </MuiRadioGroup>
        </FormControl>
    )
}
