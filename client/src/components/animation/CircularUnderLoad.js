import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default (props) => {
  return (
    <CircularProgress disableShrink {...props}/>
  );
}