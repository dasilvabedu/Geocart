/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Draggable from 'react-draggable'

import '../Table/scroll.css'

const PaperComponent = (props) => {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} style={{ borderTop: '3px solid #318EDA' }} />
    </Draggable>
  )
}

const CustomDialog = (props) => {
  const {
    open,
    handleClose,
    labelButton,
    action,
    message,
    dialogTitle,
    data = [],
    campos = [],
    editaveis = [],
    editData = false,
  } = props

  const [state, setState] = React.useState({
    // name: null,
    // value: null,
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name.split(' (')[1].replace(')', '')]: value })
  }

  const onCloseDialog = () => {
    setState({
      /* name: null, value: null */
    })
    handleClose()
  }

  const isUpdateDisabled = (entry) => {
    if (!editData) return editData

    // console.log(`Pesquisando? ${entry}`);
    const elementoEditavel = editaveis.find((currElement) => {
      // eslint-disable-next-line array-callback-return
      // eslint-disable-next-line no-unused-vars

      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(currElement)) {
        if (entry === `${value})`) return currElement
      }
      return null
    })

    const updateDisabled =
      elementoEditavel &&
      elementoEditavel[
        Object.keys(elementoEditavel)[Object.keys(elementoEditavel).length - 1]
      ] !== 'sim'

    // console.log(`Editavel? ${elementoEditavel[Object.keys(elementoEditavel)[Object.keys(elementoEditavel).length - 1]]}`);

    return updateDisabled
  }

  console.log(data)

  return (
    <form>
      <Dialog
        open={open}
        onClose={onCloseDialog}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          {dialogTitle || 'Todos os Dados'}
        </DialogTitle>
        <DialogContent>
          {message ||
            campos.map((campo) =>
              !editData ? (
                <Typography variant='body2' gutterBottom>
                  <strong>{campo.dado.split(' - ')[1]}: </strong>
                  {data[campo.dado]}
                </Typography>
              ) : (
                <TextField
                  name={campo.dado.split(' - ')[1]}
                  label={campo.dado.split(' - ')[1]}
                  defaultValue={data[campo.dado]}
                  InputProps={{
                    disabled: isUpdateDisabled(campo.dado.split(' (')[1]),
                  }}
                  style={{ width: '100%' }}
                  onChange={handleChange}
                />
              )
            )}
        </DialogContent>
        <DialogActions>
          {!action ? null : (
            <Button
              // disabled={updateDisabled}
              autoFocus
              color='primary'
              onClick={() => {
                let dataToUpdate = state
                dataToUpdate = {
                  ...dataToUpdate,
                }
                action(data[Object.keys(data)[0]], dataToUpdate)
                onCloseDialog()
              }}
            >
              {labelButton || 'None'}
            </Button>
          )}
          <Button autoFocus color='primary' onClick={onCloseDialog}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default CustomDialog
