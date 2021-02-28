import React from 'react';

import { makeStyles, Badge, IconButton, InputBase, AppBar, Toolbar, Grid } from '@material-ui/core';

import NotificationsIconNone from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff'
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1.5)
        }
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item>
                            <InputBase 
                                placeholder="Search topics"
                                className={classes.searchInput}
                                startAdornment={<SearchIcon fontSize="small" />}
                            />
                        </Grid>
                        <Grid item sm={true} />
                        <Grid item>
                            <IconButton>
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIconNone fontSize="small" />
                                </Badge>
                            </IconButton>
                            <IconButton>
                                <Badge badgeContent={3} color="primary">
                                    <ChatBubbleOutlineIcon fontSize="small" />
                                </Badge>
                            </IconButton>
                            <IconButton>
                                <PowerSettingsNewIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}
