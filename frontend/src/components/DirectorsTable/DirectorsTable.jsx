import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import MoreIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

import DirectorsDialog from '../DirectorsDialog/DirectorsDialog'
import DirectorsSearch from '../DirectorsSearch/DirectorsSearch'

import withHocs from './DirectorsTableHoc'

const DirectorsTable = ({ classes, data, onOpen }) => {
  const [state, setState] = useState({
    anchorEl: null,
    openDialog: false,
    name: '',
  })

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value })
  }

  const handleSearch = (e) => {
    const { name } = state

    if (e.charCode === 13) {
      data.fetchMore({
        variables: { name },
        updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
      })
    }
  }

  const handleDialogOpen = () => {
    setState({ ...state, openDialog: true })
  }
  const handleDialogClose = () => {
    setState({ ...state, openDialog: false })
  }

  const handleClick = ({ currentTarget }, data) => {
    setState({
      ...state,
      anchorEl: currentTarget,
      data,
    })
  }

  const handleClose = () => {
    setState({ ...state, anchorEl: null })
  }

  const handleEdit = (row) => {
    onOpen(state.data)
    handleClose()
  }

  const handleDelete = () => {
    handleDialogOpen()
    state.openDialog && handleClose()
  }

  const { anchorEl, openDialog, data: activeElem = {}, name } = state
  const { directors = [] } = data

  return (
    <>
      <Paper>
        <DirectorsSearch
          name={name}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />
      </Paper>
      <DirectorsDialog
        open={openDialog}
        handleClose={handleDialogClose}
        id={activeElem.id}
      />
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell>Movies</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {directors.map((director) => {
              return (
                <TableRow key={director.id}>
                  <TableCell component="th" scope="row">
                    {director.name}
                  </TableCell>
                  <TableCell align="right">{director.age}</TableCell>
                  <TableCell>
                    {director.movies.map((movie, key) => (
                      <div key={movie.name}>
                        {`${key + 1}. `}
                        {movie.name}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <>
                      <IconButton
                        color="inherit"
                        onClick={(e) => handleClick(e, director)}
                      >
                        <MoreIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleEdit(director)}>
                          <CreateIcon /> Edit
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                          <DeleteIcon /> Delete
                        </MenuItem>
                      </Menu>
                    </>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}

export default withHocs(DirectorsTable)
