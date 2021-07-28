import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import MoviesTable from '../MoviesTable/MoviesTable'
import MoviesForm from '../MoviesForm/MoviesForm'

import withHocs from './MoviesHoc'

const Movies = ({ classes }) => {
  const [state, setState] = useState({
    open: false,
    name: '',
    genre: '',
    watched: false,
    rate: 0,
    directorId: '',
  })

  const handleClickOpen = (data = {}) => {
    setState({
      ...state,
      open: true,
      ...data,
      directorId: data.director ? data.director.id : '',
    })
  }

  const handleClose = () => {
    setState({
      ...state,
      name: '',
      genre: '',
      watched: false,
      rate: 0,
      directorId: '',
      open: false,
    })
  }

  const handleSelectChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value })
  }
  const handleCheckboxChange = (name) => ({ target }) => {
    setState({ ...state, [name]: target.checked })
  }
  const handleChange = (name) => ({ target }) => {
    setState({ ...state, [name]: target.value })
  }

  const { id, name, genre, watched, rate, directorId, open } = state

  return (
    <>
      <MoviesForm
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleCheckboxChange={handleCheckboxChange}
        selectedValue={{ id, name, genre, watched, rate, directorId }}
        open={open}
        onClose={handleClose}
      />
      <div className={classes.wrapper}>
        <MoviesTable onOpen={handleClickOpen} onClose={handleClose} />
        <Fab
          onClick={() => handleClickOpen()}
          color="primary"
          aria-label="Add"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}

export default withHocs(Movies)
