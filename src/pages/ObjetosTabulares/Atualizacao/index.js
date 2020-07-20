import React, { useState, useEffect } from 'react'

import { Grid, CircularProgress, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CustomDialog from '../../../components/Dialog'
import CustomTable from '../../../components/Table'
import Toast from '../../../components/Toast'
import {
  MTA_METADADOATRIBUTO,
  removeMetadado,
  updateMetadado,
} from '../../../services/metadados'
import * as Service from '../../../services/metadados.v2'
import { getAllMetadadoSelectedEditaveis } from '../../../store/selectors/metadados'
import Objetos from './Objetos'
import { Container, Header, Section } from './styles'

function Atualizacao({
  metadadoSelectedEditaveis,
  onUpdatePressed,
  onRemovePressed,
}) {
  const [objeto, setObjeto] = useState({})
  const [objetos, setObjetos] = useState([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({
    open: false,
    text: '',
    severity: 'error',
  })
  const [dialog, setDialog] = useState({
    open: false,
    message: '',
    mensagem: '',
    campos: [],
    labelButton: '',
    dialogTitle: ' ',
    action: () => {},
  })

  useEffect(() => {
    async function populateObjetos() {
      const objetos = await Service.fetchObjetosTotal('convencional')
      setObjetos(objetos.cabecalho)
    }
    populateObjetos()
  }, [])

  const handleChange = async (event) => {
    setLoading(true)
    const mtt_tabela = event.target.value

    try {
      const objeto = await Service.fetchObjetoTabelaExtenso(mtt_tabela)
      setObjeto({ ...objeto, mtt_tabela })
    } catch (e) {
      setToast({
        open: true,
        severity: 'error',
        text: `Erro ao processar a requisição ${e}`,
      })
    } finally {
      setLoading(false)
    }
  }

  function onGeneratedData(elementsParse) {
    let jsonData = {}
    const tempData = []
    for (const [, value] of Object.entries(elementsParse)) {
      if (JSON.stringify(value).includes('A - ')) jsonData = {}
      for (const [keyValue, valueValue] of Object.entries(value)) {
        jsonData[keyValue] = valueValue
        if (keyValue.includes('A - ')) tempData.push(jsonData)
      }
    }
    return tempData
  }

  const createPropertyObject = (currElement, entryPreference) => {
    return Object.entries(currElement).map(([key, values]) => {
      return entryPreference === 'key'
        ? {
            titulo: `${key.split(' - ')[1]}`,
            dado: `${key}`,
          }
        : {
            [key]: `${values}`,
          }
    })
  }

  const createKeyAndValueObjects = (metadadoMap = [], entryPreference) => {
    let elementsKey = []
    let elementsParse = null
    const elements = metadadoMap.map((currElement) => {
      return (elementsKey = createPropertyObject(currElement, entryPreference))
    })

    if (entryPreference !== 'key') {
      const elementsStringify = JSON.stringify(elements)
        .replaceAll('[[[{', '[{')
        .replaceAll('}]]]', '}]')
        .replaceAll('}]],[[{', '},{')
        .replaceAll('[[{', '[{')
        .replaceAll('}]]', '}]')
        .replaceAll('}],[{', '},{')
      elementsParse = JSON.parse(elementsStringify)
      elementsParse = onGeneratedData(elementsParse)
    } else {
      elementsParse = elementsKey
    }

    return elementsParse
  }

  const dialogRemove = (dado) => {
    setDialog({
      open: true,
      labelButton: 'Sim',
      tipo: 'success',
      dialogTitle: 'Excluir',
      message: `Tem certeza que deseja excluir o dado [${
        dado[Object.keys(dado)[0]]
      } - ${dado[Object.keys(dado)[1]]}] da tabela ${
        objeto.mtt_tabela
      } permanentemente? `,
      action() {
        onRemovePressed(objeto.mtt_tabela, dado[Object.keys(dado)[0]])
        setToast({
          open: true,
          severity: 'success',
          text: `Dado excluído com sucesso`,
        })
      },
    })
  }

  const dialogUpdate = (dado, fields) => {
    setDialog({
      open: true,
      tipo: 'success',
      labelButton: 'Atualizar',
      dialogTitle: 'Atualizar atributo',
      data: dado.length > 0 ? dado[0] : dado,
      campos: fields,
      editData: true,
      action(id, dadoAlteracao) {
        const dataToUpdate = {
          ...dadoAlteracao,
          tabela: MTA_METADADOATRIBUTO,
          mta_identificador: id,
        }
        onUpdatePressed(id, dataToUpdate)
      },
    })
  }

  const dialogIncluir = async () => {
    const editaveis = await Service.fetchObjetoTabelaExtenso('')

    const metadados = await Service.fetchObjetoTabelaExtenso(
      'mtt_metadadotabela'
    )

    setDialog({
      open: true,
      tipo: 'success',
      labelButton: 'Salvar',
      dialogTitle: 'Incluir Novo',
      campos: createKeyAndValueObjects(metadados.cabecalho, 'key'),
      editaveis: metadados.campos,
      editData: true,
      action() {
        //
      },
    })
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
      <CustomDialog
        open={dialog.open}
        mensagem={dialog.mensagem}
        campos={dialog.campos}
        labelButton={dialog.labelButton}
        dialogTitle={dialog.dialogTitle}
        message={dialog.message}
        action={dialog.action}
        data={dialog.data}
        editData={dialog.editData}
        editaveis={metadadoSelectedEditaveis}
        handleClose={() => {
          setDialog({ ...dialog, open: false })
        }}
      />
      <Grid container direction='column' spacing={2}>
        <Grid item xs={6}>
          <Section>
            <Header style={{ marginTop: '-35px', marginBottom: '10px' }}>
              <h3>Objetos</h3>
            </Header>
            <Objetos data={objetos} value={objeto} onChange={handleChange} />
            <Button
              variant='contained'
              style={{ marginTop: '10px' }}
              onClick={dialogIncluir}
            >
              Incluir novo
            </Button>
            <Header style={{ marginTop: '-10px', marginBottom: '10px' }}>
              <h3>Conteúdo do objeto</h3>
            </Header>
            {loading ? (
              <CircularProgress />
            ) : (
              <CustomTable
                dados={createKeyAndValueObjects(objeto.dados, 'values')}
                campos={createKeyAndValueObjects(objeto.dados, 'key')}
                updateDados={dialogUpdate}
                excluirDados={dialogRemove}
              />
            )}
          </Section>
        </Grid>
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  metadadoSelectedEditaveis: getAllMetadadoSelectedEditaveis(state),
})

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (mttTababela, id) =>
    dispatch(removeMetadado(mttTababela, id)),
  onUpdatePressed: (id, json) => dispatch(updateMetadado(id, json)),
})

Atualizacao.propTypes = {
  metadadoSelectedEditaveis: PropTypes.array,
  onUpdatePressed: PropTypes.func,
  onRemovePressed: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Atualizacao)
