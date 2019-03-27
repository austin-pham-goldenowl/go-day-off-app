import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Creatable from 'react-select/lib/Creatable';
import { components as RSelectComps } from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropdownIcon from '@material-ui/icons/ArrowDropDown';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import { EMAIL_PATTERN } from '../constants/regexPatterns'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  dropDownIndicatorWrapper: {
    padding: '0!important',
  },
  dropDownIndicatorIcon: {
    color: `rgb(0, 0, 0, 0.54)!important`,
  }
});

function DropdownIndicator (props) {
  return (
    <RSelectComps.DropdownIndicator className={props.selectProps.classes.dropDownIndicatorWrapper}  {...props}>
      <ArrowDropdownIcon className={props.selectProps.classes.dropDownIndicatorIcon}/>
    </RSelectComps.DropdownIndicator>
  );
}

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control (props) {
  return (
    <TextField
      fullWidth 
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  DropdownIndicator,
};

class IntegrationReactSelect extends React.Component {
  state = {
    inputValue: '',
  }

  handleChangeValue = (values, others) => {
    const { field: { name }, form: { setFieldValue }} = this.props; //For Formik
    /**
     * `others`: 
          "select-option",
          "deselect-option",
          "remove-value",
          "pop-value",
          "set-value",
          "clear",
          "create-option"
     */
    //
    if (others.action !== 'create-option') {
      setFieldValue(name, values);
    }
    else {
      let newObject = values.find(o => o.__isNew__);
      if (typeof(newObject) !== 'undefined' && EMAIL_PATTERN.test(newObject.value)) {
        newObject.additionInfo = `${newObject.value}`
        setFieldValue(name, values);
      }
    }
  }
  
  render() {
    const { label, classes, theme, options } = this.props;
    const { field: { value, onBlur } } = this.props; //For Formik
    console.log(this.props.field);
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
      clearIndicator: base => ({
        ...base,
        display: 'none'
      }),
      indicatorSeparator: base => ({
        ...base,
        display: 'none'
      })
    };
    return (
      <Creatable
        classes={classes}
        styles={selectStyles}
        textFieldProps={{
          label: label,
          InputLabelProps: {
            shrink: true,
          }
        }}
        isMulti
        value={value}
        options={options}
        placeholder={`Select or type...`}
        components={components}
        inputValue={this.state.inputValue}
        onBlur={(e) => {
          console.log(e.target);
          //This `onBlur` event is issued by the `input` element, not the `Select`, we have to point to the `Select`
          onBlur(e);
        }}
        onChange={this.handleChangeValue}
        onKeyDown={(e => {
          if (e.key === 'Enter' && !EMAIL_PATTERN.test(e.target.value)) {
            e.preventDefault()
          }
        })}
        onInputChange={(inputValue, actions) => {
          if (actions.action !== 'input-blur' && actions.action !== 'menu-close') {
            this.setState({ inputValue })
          }
        }}
      />
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);