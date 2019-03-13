import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SimpleTable from "./SimpleTable";
import Calendar from "../../components/Calendar";
import DashContainer from "../DashContainer";

const styles = theme => ({
  calendarContainer: { marginBottom: "2em" },
  tableContainer: {
    height: 320
  }
});

const Dashboard = props => {
  const { classes } = props;

  return (
    <DashContainer>
      <Typography variant="h4" gutterBottom component="h2">
        Calendar
      </Typography>
      <Typography component="div" className={classes.calendarContainer}>
        <Calendar />
      </Typography>
      <Typography variant="h4" gutterBottom component="h2">
        My letters
      </Typography>
      <div className={classes.tableContainer}>
        <SimpleTable />
      </div>
    </DashContainer>
  );
};

export default withStyles(styles)(Dashboard);
