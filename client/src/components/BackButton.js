import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const styles = theme => ({
  root: {
    fontSize: "2em"
  }
});

const BackButton = props => {
  const { to, classes } = props;
  return (
    <Link to={to || window.previousLocation} className={classes.root}>
      <ArrowBackIcon />
    </Link>
  );
};

export default withStyles(styles)(BackButton);
