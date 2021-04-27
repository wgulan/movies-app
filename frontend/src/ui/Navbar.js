import { AppBar, IconButton, makeStyles, Tab, Tabs, Toolbar} from "@material-ui/core";
import TheatersIcon from "@material-ui/icons/Theaters";
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
    iconButton: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        "padding-right": "0px",
        "padding-left": "0px",
    },
    tab: {
        "fontSize": "18px",
        "fontWeight": "600",
        "padding": "12px 6px"
    }
}));

const Navbar = (props) => {
    const classes = useStyles(props.theme);
    
    return (
        <AppBar position="static" style={{ backgroundColor: "#111218", paddingTop: '5px' }}>
            <Toolbar>
                <IconButton
                    component={Link}
                    to={"/"}
                    className={classes.iconButton}
                    disableRipple 
                    color="primary"
                >
                    <TheatersIcon
                        style={{
                            fontSize: 42,
                            marginRight: '24px'
                        }}
                    />
                </IconButton>
                <SearchBar />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
