import React from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';

import {
  Paper,
  Button,
  Grid,
  CssBaseline,
  TextField,
  Typography
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import SelectCustom from '../../components/CustomSelect';
import DatePickerField from '../../components/DatePicker';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)] : {
      minWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)] : {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 6,
    },
  },
  buttonGroupTop: {
    justifyContent: 'flex-start',
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    [theme.breakpoints.up('sm')]:{
      display: 'flex'
    }
  },
  buttonGroupBottom: {
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 6,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.down('xs')]:{
      display: 'flex',
    }
  }
  ,
  button: {
    marginLeft: theme.spacing.unit,
    width: 100
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  smallIcon: {
    fontSize: 20,
  },
  formTitle: {
    marginBottom: theme.spacing.unit * 3,
  }
})

class AccountInfo extends React.Component {
  render () {
    const {
      classes,
      initialValues
    } = this.props;

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <CssBaseline />
          <Formik 
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              //Call api update here
            }}
          >
          {({ 
            errors,
            values,
            handleReset,
            handleSubmit,
            setFieldValue,
            handleChange,
            ...formikProps
          }) => {
            console.log(`Form values: `, values);
            return (
              <Form>
               {/* Top buttons */}
                <React.Fragment>
                  <Grid item container xs={12} className={classes.buttonGroupTop}>
                    <Field render={({ field, form }) => (
                      <Button
                        className={classes.button}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                      >
                        <Icon fontSize="small" className={classes.leftIcon}>
                          save
                        </Icon>
                        SAVE
                      </Button>
                    )} />
                    <Field render={({ field, form }) => (
                      <Button
                        className={classes.button}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={handleReset}
                      >
                      <Icon fontSize="small" className={classes.leftIcon}>delete_sweep</Icon>
                        Discard
                      </Button>
                    )}/>
                  </Grid>
                </React.Fragment>
             {/* End - Top buttons */}
              <React.Fragment>
                <Typography className={classes.formTitle} component="h1" variant="h5" align="center">
                  Edit account info
                </Typography>
              </React.Fragment>
              <React.Fragment>
              {/** First name */}
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={6}>
                    <Field 
                      name="firstName" 
                      render={({ field, form, ...otherProps}) => {
                        return (
                          <TextField 
                            fullWidth
                            label="First name"
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                          />
                        )
                      }}
                    />
                  </Grid>
              {/** Last name */}
                <Grid item xs={12} sm={6}>
                  <Field 
                    name="lastName" 
                    render={({ field, form, ...otherProps}) => {
                      return (
                        <TextField 
                          fullWidth
                          label="Last name"
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                        />
                      )
                    }}
                  />
                </Grid>
              {/** gender name */}
                <Grid item xs={12} sm={6}>
                  <Field 
                    name="gender"
                    render={({ field, form, ...otherProps }) => {
                      return (
                        <SelectCustom 
                          name={field.name}
                          label="Gender"
                          value={field.value}
                          options={mockup_gender}
                          onChange={handleChange}
                        />
                      )
                    }}/>
                </Grid>
              {/** birthday name */}
                <Grid item xs={12} sm={6}>
                  <Field 
                    fullWidth
                    name="bday" 
                    label="Birthday"
                    component={DatePickerField}
                  />
                </Grid>
                {/** email  */}
                <Grid item xs={12} sm={6}>
                  <Field 
                    name="email" 
                    render={({ field, form, ...otherProps}) => {
                      return (
                        <TextField 
                          fullWidth
                          label="Email"
                          value={field.value}
                          name={field.name}
                          onChange={handleChange}
                        />
                      )
                    }}
                  />
                </Grid>
                {/** phone number  */}
                <Grid item xs={12} sm={6}>
                  <Field 
                    name="phone" 
                    render={({ field, form, ...otherProps}) => {
                      return (
                        <TextField 
                          fullWidth
                          label="Phone"
                          value={field.value}
                          name={field.name}
                          onChange={handleChange}
                        />
                      )
                    }}
                  />
                </Grid>                
                {/** address  */}
                <Grid item xs={12}>
                  <Field 
                    name="address" 
                    render={({ field, form, ...otherProps}) => {
                      return (
                        <TextField 
                          multiline
                          fullWidth
                          label="Address"
                          value={field.value}
                          name={field.name}
                          onChange={handleChange}
                        />
                      )
                    }}
                  />
                </Grid>
                {/** team name */}
                <Grid item xs={12} sm={6}>
                  <Field
                    name="team"
                    render={({ field, form, ...otherProps }) => {
                      return (
                        <SelectCustom 
                          name={field.name}
                          label="Team"
                          value={field.value}
                          options={mockup_team}
                          onChange={handleChange}
                        />
                      )
                    }}
                  />
                </Grid>
                {/** position name */}
                <Grid item xs={12} sm={6}>
                  <Field
                    name="position"
                    render={({ field, form, ...otherProps }) => {
                      return (
                        <SelectCustom 
                          name={field.name}
                          label="Position"
                          value={field.value}
                          options={mockup_position}
                          onChange={handleChange}
                        />
                      )
                    }}
                  />
                </Grid>
                
              </Grid>
              </React.Fragment>
                <React.Fragment>
                {/* Bottom buttons */}
                <Grid item xs={12} className={classes.buttonGroupBottom} >
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                    <Icon fontSize="small" className={classes.leftIcon}>
                      save
                    </Icon>
                    SAVE
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={handleReset}
                    className={classes.button}
                  >
                    <Icon fontSize="small" className={classes.leftIcon}>
                      delete_sweep
                    </Icon>
                    Discard
                  </Button>
                </Grid>
              </React.Fragment>
              </Form>
            )
          }}
          </Formik>
        </Paper>
      </main>
    )
  }
}

AccountInfo.defaultProps = {
  initialValues: {
    firstName: 'Quoc Cuong',
    lastName: 'Nguyen',
    gender: 0,
    bday: new Date(),
    position: '111#',
    address: 'TPHCM',
    phone: '012345667',
    team: '#123',
    permission: '',
    email: 'abc@email.com'
  }
}

const mockup_gender = [
  {
    value: 0,
    label: "Female"
  },
  {
    value: 1,
    label: "Male"
  },
  {
    value: 2,
    label: "Others"
  },
]

const mockup_team = [
  {
    value: '#123', //team id
    label: "Ruby on Rails" //team name
  },
  {
    value: '#456',
    label: "Project Assistant"
  },
  {
    value: '#789',
    label: "JAVascript"
  },
]

const mockup_position = [
  {
    value: '111#', //team id
    label: "Developer" //team name
  },
  {
    value: '222#',
    label: "Intern/Fresher"
  },
  {
    value: '333#',
    label: "Tech Lead"
  },
]

export default withStyles(styles)(AccountInfo);