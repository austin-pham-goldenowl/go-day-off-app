import React from "react";
import { Typography } from "@material-ui/core";
import DashContainer from "../DashContainer";
import LettersManagement from "../../components/LettersManagement";
import { getAllLeaveLetters } from "../../apiCalls/leaveLetterAPI";

function AllLettersManagement() {
  return (
    <DashContainer>
      <Typography component="h1" variant="h4">
        All request letters
      </Typography>
      <br />
      <LettersManagement api={getAllLeaveLetters} type="hr"  />
    </DashContainer>
  );
}

export default AllLettersManagement;
