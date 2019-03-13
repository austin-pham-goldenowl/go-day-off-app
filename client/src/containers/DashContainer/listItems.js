import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SendIcon from "@material-ui/icons/Send";
import HistoryIcon from "@material-ui/icons/History";

import { Link, withRouter } from "react-router-dom";

const styles = theme => ({
  undecoratedLink: {
    textDecoration: "none"
  },
  selectedLink: {
    backgroundColor: "rgba(0, 0, 0, 0.08)"
  }
});

const isSelectedLink = (history, pathname, classes) =>
  pathname === history.location.pathname ? classes.selectedLink : "";

const PersonnelListItems = props => {
  const { classes, history } = props;
  return (
    <>
      <br />
      <Link to="/" className={classes.undecoratedLink}>
        <ListItem button className={isSelectedLink(history, "/", classes)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to="/leave-request/create" className={classes.undecoratedLink}>
        <ListItem
          button
          className={isSelectedLink(history, "/leave-request/create", classes)}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Create leave letter" />
        </ListItem>
      </Link>
      <Link to="/history" className={classes.undecoratedLink}>
        <ListItem
          button
          className={isSelectedLink(history, "/history", classes)}
        >
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
      </Link>
      <br />
    </>
  );
};

const HRListItems = props => {
  const { classes, history } = props;
  return (
    <>
      <Divider />
      <br />
      <Link to="/leave-request/all" className={classes.undecoratedLink}>
        <ListItem
          button
          className={isSelectedLink(history, "/leave-request/all", classes)}
        >
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="List all letters" />
        </ListItem>
      </Link>
    </>
  );
};

const AdminListItems = props => {
  const { classes, history } = props;
  return (
    <>
      <Divider />
      <br />
      <Link to="/create-user" className={classes.undecoratedLink}>
        <ListItem
          button
          className={isSelectedLink(history, "/create-user", classes)}
        >
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create user" />
        </ListItem>
      </Link>
      <Link to="/users-management" className={classes.undecoratedLink}>
        <ListItem
          button
          className={isSelectedLink(history, "/users-management", classes)}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="List all users" />
        </ListItem>
      </Link>
    </>
  );
};

export const PersonnelList = withStyles(styles)(withRouter(PersonnelListItems));
export const HRList = withStyles(styles)(withRouter(HRListItems));
export const AdminList = withStyles(styles)(withRouter(AdminListItems));
