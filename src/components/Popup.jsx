import React from 'react';
import Controls from './controls/Controls';

import { DialogContent, Dialog, DialogTitle, Typography, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: 0
    }
}));

export default function Popup(props) {
    const { title, children, open, setOpen } = props;
    const classes = useStyles();

    return (
        <Dialog classes={{ paper:classes.dialogWrapper }} open={open} maxWidth="md">
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: "flex" }}>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    <Controls.ActionButton 
                        text="X"
                        color="secondary"
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    )
}
