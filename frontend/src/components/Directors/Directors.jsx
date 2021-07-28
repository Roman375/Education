import React, { useState } from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import DirectorsTable from '../DirectorsTable/DirectorsTable';
import DirectorsForm from '../DirectorsForm/DirectorsForm';

import withHocs from './DirectorsHoc';

const Directors = ({classes}) => {
  const [state, setState] = useState({
    open: false,
    name: '',
    age: 0,
  })

  const handleClickOpen = (data) => {
    setState({
      ...state,
      open: true,
      ...data,
    });
  };

  const handleClose = () => { setState({ name: '', age: 0, id: null, open: false }); };

  const handleChange = name => ({ target }) => { setState({ ...state, [name]: target.value }); };

  const { name, age, id, open } = state;

    return (
      <>
        <DirectorsForm handleChange={handleChange} selectedValue={{ name, age, id }} open={open} onClose={handleClose} />
        <div className={classes.wrapper}>
          <DirectorsTable onOpen={handleClickOpen} onClose={handleClose} />
          <Fab onClick={() => handleClickOpen(null)} color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }

export default withHocs(Directors);
