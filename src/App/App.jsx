import React from "react";
import {
  makeStyles,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import "./App.css";

import SideMenu from "../components/SideMenu";
import PageHeader from "../components/PageHeader";
import Header from "../components/Header";

import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)"
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <PageHeader title="Page Header" subTitle="Page description" icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
