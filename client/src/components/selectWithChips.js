import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
  Chip,
  Select,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import shortid from 'shortid';


const styles = theme => ({
  formControl: {
    margin:0,
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});


//   handleDeleteBound = value => event => {
//     console.log(value);
//     const {selected} = this.state;
//     let deleteItem = selected.indexOf(value);
//     selected.splice(deleteItem, 1);
//     this.setState({
//       selected: selected
//     });
//   }

const SelectWithChips = ({ field, form, classes, label, multiple, options, ...otherProps}) => {

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
      <Select
        multiple
        value={field.value}
        input={<Input id="select-multiple-chip" />}
        onChange={({ target: {value} }) => 
          form.setFieldValue(field.name, value)
        }
        renderValue={selectedOptions => (
          <div className={classes.chips}>
            {selectedOptions.map(item => (
              <Chip 
                key={item.value} 
                label={item.label} 
                className={classes.chip} 
                onDelete={() => {
                  console.log('ChipSeelect -> onDelete -> item: ', item);
                  // form.setFieldValue(field.name, value);
                  const selected = form.values.informTo;
                  let deleteItem = selected.indexOf(item);
                  selected.splice(deleteItem, 1);
                  const payload = {...form.values, informTo: selected};
                  form.setValues(payload);
                  console.log(`Form values: `, selected);
                }}
              />
            ))}
          </div>
        )}
      >
        {options.map(item => {
          console.log(`item: `, item);
          return (
            <MenuItem 
              value={item}
              key={shortid.generate()} 
            >
            { `${item.label} (${item.value})`}
            {field.value.indexOf(item) !== -1 ? (<Icon>check</Icon>) : null}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

// class SelectWithChips extends React.Component {
//     state = {
//       selected: [],
//     }

//   handleChange = (event)=>{
//     console.log('Chosen value: ', event.target.value);
//     this.setState({
//       selected: event.target.value
//     });
//     this.props.onChange && this.props.onChange(event.target.value);
//   };

//   handleDeleteBound = value => event => {
//     console.log(value);
//     const {selected} = this.state;
//     let deleteItem = selected.indexOf(value);
//     selected.splice(deleteItem, 1);
//     this.setState({
//       selected: selected
//     });
//   }

//   render () {
//     const { classes, label, data } = this.props;
//     const { selected } = this.state;
//     return (
//       <FormControl className={classes.formControl}>
//         <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
//         <Select
//           multiple
//           value={selected}
//           onChange={this.handleChange}
//           input={<Input id="select-multiple-chip" />}
//           renderValue={selected => (
//             <div className={classes.chips}>
//               {selected.map(item => (
//                 <Chip 
//                   key={item.value} 
//                   label={item.label} 
//                   className={classes.chip} 
//                   onDelete={this.handleDeleteBound(item)}
//                 />
//               ))}
//             </div>
//           )}
//         >
//           {data.map(item => (
//               <MenuItem 
//                 key={shortid.generate()} 
//                 value={item}
//               >
//               { `${item.label} (${item.value})`}
//               {selected.indexOf(item) !== -1 ? (<Icon>check</Icon>) : null}
//               </MenuItem>
//             ))}
//         </Select>
//       </FormControl>
//     );
//   }
// }

SelectWithChips.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectWithChips);