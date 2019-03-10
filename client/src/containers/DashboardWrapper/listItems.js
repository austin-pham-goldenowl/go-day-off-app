import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LogOutIcon from '@material-ui/icons/Input';
import PendingIcon from '@material-ui/icons/AccessTime';
import ApprovedIcon from '@material-ui/icons/DoneAll';
import RejectedIcon from '@material-ui/icons/HighlightOffOutlined';

import { withStyles } from '@material-ui/core/styles';

import * as Permissions from '../../constants/permission';

const styles = theme => ({
  logOutIcon: {
    transform: 'rotate(180deg)'
  }
})

export const MainListItems =  (props) => {
  const {permission, } = props; 
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="My Requests" />
      </ListItem>
      <ListSubheader inset>Requests</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="All Requests" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PendingIcon />
        </ListItemIcon>
        <ListItemText primary="Pending Requests" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ApprovedIcon />
        </ListItemIcon>
        <ListItemText primary="Approved Requests" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <RejectedIcon />
        </ListItemIcon>
        <ListItemText primary="Rejected Requests" />
      </ListItem>
    </div>
  );
}

MainListItems.propTypes = {
  permission: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
}

export const SecondaryListItems = withStyles(styles)((props) =>  {
  const { classes } = props;
  return (
      <div>
        <ListItem button>
          <ListItemIcon>
            <LogOutIcon className={classes.logOutIcon}/>
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </div>
  )
});

