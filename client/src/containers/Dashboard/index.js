import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SimpleLineChart from "./SimpleLineChart";
import SimpleTable from "./SimpleTable";

const styles = theme => ({
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  }
});

const Dashboard = props => {
  const { classes } = props;

  return (
    <div>
      <Typography variant="h4" gutterBottom component="h2">
        Orders
      </Typography>
      <Typography component="div" className={classes.chartContainer}>
        <SimpleLineChart />
      </Typography>
      <Typography variant="h4" gutterBottom component="h2">
        Products
      </Typography>
      <div className={classes.tableContainer}>
        <SimpleTable />
      </div>
    </div>
  );
};

export default withStyles(styles)(Dashboard);
