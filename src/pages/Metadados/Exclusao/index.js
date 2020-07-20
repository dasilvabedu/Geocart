import React, { useState, useEffect } from 'react'

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import { connect } from 'react-redux'

import Toast from '../../../components/Toast'
import * as Service from '../../../services/metadados.v2'
import Objetos from './Objetos'
import { Container, Section, Header } from './styles'

function Exclusao() {
  const [objeto, setObjeto] = useState({})
  const [objetos, setObjetos] = useState([])
  const [dialogState, setDialogState] = useState(false)
  const [toast, setToast] = useState({
    open: false,
    severity: 'success',
    text: '',
  })

  useEffect(() => {
    async function fetchObjetos() {
      const response = await Service.fetchObjetoAptoExclusao()
      setObjetos(response.cabecalho)
    }

    fetchObjetos()
  }, [])

  const handleCloseDialog = () => setDialogState(false)

  const handleChange = async (event) => {
    setObjeto({ mtt_tabela: event.target.value })
    setDialogState(true)
  }

  const handleDelete = async () => {
    await Service.excluirObjeto(objeto.mtt_tabela)

    setDialogState(false)
    setToast({ ...toast, open: true, text: 'Objeto excluido!' })
  }

  return (
    <Container>
      <Toast
        open={toast.open}
        handleClose={() => {
          setToast({ ...toast, open: false })
        }}
        severity={toast.severity}
      >
        {toast.text}
      </Toast>
      <Dialog open={dialogState} onClose={handleCloseDialog}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Realmente deseja excluir o objeto selecionado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleDelete}>Sim</Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Section>
            <Header style={{ marginTop: '-35px', marginBottom: '10px' }}>
              <h3>Exclusão</h3>
            </Header>
            <Objetos data={objetos} value={objeto} onChange={handleChange} />
          </Section>
        </Grid>
      </Grid>
    </Container>
  )
}

export default connect()(Exclusao)
