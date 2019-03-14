import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LettersManagement from "../../components/LettersManagement";
import DashContainer from "../DashContainer";

import { getMyLeaveLetters } from "../../apiCalls/leaveLetterAPI";

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
        My letters
      </Typography>
      <div className={classes.tableContainer}>
        <LettersManagement api={getMyLeaveLetters} />
      </div>
    </DashContainer>
  );
};

export default withStyles(styles)(Dashboard);
