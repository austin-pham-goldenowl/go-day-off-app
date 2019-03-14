import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import {
  LEAVE_REQUEST_PENDING,
  LEAVE_REQUEST_APPROVED,
  LEAVE_REQUEST_REJECTED
} from "../constants/requestStatusType";
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 5
  },
  title: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    textAlign: "left"
  },
  btnLink: {
    textDecoration: "none"
  }
});

class LetterManagement extends Component {
  constructor() {
    super();
    this.state = {
      letters: []
    };
  }

  componentDidMount = async () => {
    try {
      const response = await this.props.api();
      const {
        status,
        data: { success, leaveLetters: letters }
      } = response;
      if (status !== 200 || !success) return;
      this.setState({ letters });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { letters } = this.state;
    console.log(letters);
    const { classes, title, type } = this.props;

    const tableInfo = {
      title: (
        <Typography component="p" variant="h5" className={classes.title}>
          {title}
        </Typography>
      ),
      data: Array.isArray(letters)
        ? letters.map(letter => {
            const { fFullName, fFromDT, fToDT, fStatus, fId, fRdt } = letter;
            if (type === "hr")
              return [
                fFullName || "Unknown",
                moment(fFromDT)
                  .locale("en")
                  .format("MM/DD/YYYY"),
                moment(fToDT)
                  .locale("en")
                  .format("MM/DD/YYYY"),
                <span
                  style={{
                    color:
                      fStatus === LEAVE_REQUEST_PENDING
                        ? "#ffe43a"
                        : fStatus === LEAVE_REQUEST_APPROVED
                        ? "#0eba25"
                        : "gray"
                  }}
                >
                  {fStatus === LEAVE_REQUEST_PENDING
                    ? "PENDING"
                    : fStatus === LEAVE_REQUEST_APPROVED
                    ? "APPROVED"
                    : "REJECTED"}
                </span>,
                <Link
                  to={`/leave-request/details?id=${fId}`}
                  className={classes.btnLink}
                >
                  <Button variant="contained" color="primary">
                    Details
                  </Button>
                </Link>
              ];
            else
              return [
                moment(fRdt)
                  .locale("en")
                  .format("MM/DD/YYYY"),
                moment(fFromDT)
                  .locale("en")
                  .format("MM/DD/YYYY"),
                moment(fToDT)
                  .locale("en")
                  .format("MM/DD/YYYY"),
                <span
                  style={{
                    color:
                      fStatus === LEAVE_REQUEST_PENDING
                        ? "#ffe43a"
                        : fStatus === LEAVE_REQUEST_APPROVED
                        ? "#0eba25"
                        : "gray"
                  }}
                >
                  {fStatus === LEAVE_REQUEST_PENDING
                    ? "PENDING"
                    : fStatus === LEAVE_REQUEST_APPROVED
                    ? "APPROVED"
                    : "REJECTED"}
                </span>,
                <Link
                  to={`/leave-request/details?id=${fId}`}
                  className={classes.btnLink}
                >
                  <Button variant="contained" color="primary">
                    Details
                  </Button>
                </Link>
              ];
          })
        : [],
      columns:
        type === "hr"
          ? ["Name", "From", "To", "Status", "Actions"]
          : ["When", "From", "To", "Status", "Actions"],
      options: {
        selectableRows: false,
        responsive: "scroll",
        print: true,
        download: true,
        viewColumns: false,
        filter: true,
        rowsPerPage: 10,
        rowsPerPageOptions: [5, 10, 15, 20]
      }
    };

    return (
      <MUIDataTable
        className={classes.paper}
        title={tableInfo.title}
        data={tableInfo.data}
        columns={tableInfo.columns}
        options={tableInfo.options}
      />
    );
  }
}

export default withStyles(styles)(LetterManagement);
