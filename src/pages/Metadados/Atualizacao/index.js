import React from 'react'

import {
  Grid,
  Card,
  Typography,
  CircularProgress,
  IconButton,
  Paper,
  makeStyles,
} from '@material-ui/core'
import Edit from '@material-ui/icons/EditTwoTone'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CustomDialog from '../../../components/Dialog'
import Objetos from '../../../components/Objetos'
import CustomTable from '../../../components/Table'
import Toast from '../../../components/Toast'
import {
  removeMetadado,
  setMessage,
  updateMetadado,
  MTT_METADADOTABELA,
  MTA_METADADOATRIBUTO,
} from '../../../services/metadados'
import {
  getAllMetadadoSelectedCabecalho,
  getMetadadoSelectedLoading,
  getAllMetadadosTotal,
  getAllMetadadoSelectedTabela,
  getAllMetadadoSelectedCampos,
  getAllMetadadoSelectedEditaveis,
  getAllMetadadoSelectedMessage,
} from '../../../store/selectors/metadados'
import { Container, CardContent } from './styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '16px',
  },
  paper: {
    padding: theme.spacing(2),
    height: 520,
    overflow: 'auto',
    margin: '8px',
    borderTop: '2px solid #318EDA',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  header: {
    alignItems: 'center',
    background: '#1E74BB',
    color: 'white',
    paddingLeft: '8px',
    margin: '-16px',
    lineHeight: '1.5',
  },
}))

function Atualizacao({
  metadados,
  metadadoSelectedTabela,
  metadadoSelectedCampos,
  metadadoSelectedCabecalho,
  metadadoSelectedMessage,
  metadadoSelectedEditaveis,
  isLoadingMetadadoSelected,
  onRemovePressed,
  onUpdatePressed,
  onSetMessagePressed,
}) {
  const classes = useStyles()
  const tabelaSelecionada = metadados.find((metadado) => {
    return metadado.mtt_tabela === metadadoSelectedTabela
  })

  const [state, setState] = React.useState({
    name: tabelaSelecionada ? tabelaSelecionada.mtt_tabela : '',
    mtt_descricao: tabelaSelecionada ? tabelaSelecionada.mtt_descricao : '',
    mtt_tabela: tabelaSelecionada ? tabelaSelecionada.mtt_tabela : '',
    mensagem: {
      open: false,
      texto: '',
      tipo: 'success',
      data: null,
      campos: [],
      labelButton: null,
      dialogTitle: null,
      message: null,
      action: null,
      openToast: false,
      tipoToast: 'success',
      textoToast: null,
      editData: false,
    },
  })

  const editTabela = metadadoSelectedCabecalho.length ? (
    <IconButton
      color='primary'
      aria-label='upload picture'
      component='span'
      style={{ padding: 0 }}
      onClick={() => {
        updateTabela(
          createKeyAndValueObjects(metadadoSelectedCabecalho, 'values'),
          createKeyAndValueObjects(metadadoSelectedCabecalho, 'key')
        )
      }}
    >
      <Edit />
    </IconButton>
  ) : null

  const updateTabela = (dado, fields) => {
    update(dado, fields, true)
  }

  const update = (dado, fields, isMttTabela = false) => {
    const mensagem = {
      open: true,
      //texto: `Consultar/Update ${dado.id}`,
      tipo: 'success',
      labelButton: 'Atualizar',
      dialogTitle: 'Atualizar atributo',
      data: dado.length > 0 ? dado[0] : dado,
      campos: fields,
      editData: true,
      action(id, dadoAlteracao) {
        setState({
          ...state,
          mensagem: { openToast: false, open: false },
        })
        const dataToUpdate = isMttTabela
          ? {
              ...dadoAlteracao,
              tabela: MTT_METADADOTABELA,
              mtt_identificador: id,
            }
          : {
              ...dadoAlteracao,
              tabela: MTA_METADADOATRIBUTO,
              mta_identificador: id,
            }

        onSetMessagePressed({
          open: false,
          text: null,
          tipo: 'success',
          loading: true,
        })
        onUpdatePressed(id, dataToUpdate)
      },
    }
    setState({ ...state, mensagem })
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

  function onGeneratedData(elementsParse) {
    let jsonData = {}
    const tempData = []
    for (const [key, value] of Object.entries(elementsParse)) {
      if (JSON.stringify(value).includes('A - ')) jsonData = {}
      for (const [keyValue, valueValue] of Object.entries(value)) {
        jsonData[keyValue] = valueValue
        if (keyValue.includes('A - ')) tempData.push(jsonData)
        //console.log(key, value);
      }
    }
    //console.log(tempData);
    return tempData
  }

  const customFilterCampos = [
    'Nome Interno do Atributo na Tabela (mta_atributo)',
    'Descrição (mta_descricao)',
    'Tipo da Tabela (mta_tipo)',
  ]

  const customFilterDados = [
    'B - Nome Interno do Atributo na Tabela (mta_atributo)',
    'D - Descrição (mta_descricao)',
    'E - Tipo da Tabela (mta_tipo)',
  ]

  return (
    <Container>
      <Toast
        open={state.mensagem.openToast || metadadoSelectedMessage.open}
        handleClose={() => {
          setState({ ...state, mensagem: { openToast: false } })
          onSetMessagePressed({
            open: false,
            text: null,
            tipo: 'success',
            loading: false,
          })
        }}
        severity={
          state.mensagem.openToast
            ? state.mensagem.tipoToast
            : metadadoSelectedMessage.tipo
        }
      >
        {state.mensagem.textoToast}
        {metadadoSelectedMessage.text}
      </Toast>
      <CustomDialog
        open={state.mensagem.open}
        mensagem={state.mensagem}
        data={state.mensagem.data}
        campos={state.mensagem.campos}
        labelButton={state.mensagem.labelButton}
        dialogTitle={state.mensagem.dialogTitle}
        message={state.mensagem.message}
        action={state.mensagem.action}
        classes={classes}
        editData={state.mensagem.editData}
        editaveis={metadadoSelectedEditaveis}
        handleClose={() => setState({ ...state, mensagem: { open: false } })}
      />
      <Grid container direction='column' spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <Card>
              <CardContent>
                <div
                  className={classes.header}
                  style={{ marginTop: '-35px', marginBottom: '10px' }}
                >
                  <h3>Objetos</h3>
                </div>
                <Objetos />
              </CardContent>
              <CardContent>
                <div className={classes.header} style={{ marginTop: '-30px' }}>
                  <h3>
                    Metadados do objeto{' '}
                    {
                      metadadoSelectedCabecalho[0][
                        'B - Nome da Tabela (mtt_tabela)'
                      ]
                    }{' '}
                  </h3>
                </div>
                {isLoadingMetadadoSelected ? (
                  <CircularProgress />
                ) : Array.isArray(metadadoSelectedCabecalho) &&
                  metadadoSelectedCabecalho.length ? (
                  metadadoSelectedCabecalho.map((currElement) =>
                    Object.entries(currElement).map(([key, val]) => (
                      <div
                        key={key}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                        }}
                      >
                        <Typography
                          variant='body2'
                          gutterBottom
                          noWrap
                          style={{
                            flexDirection: 'column',
                          }}
                        >
                          <strong>{key.split(' - ')[1]}: </strong>
                          {val}
                        </Typography>
                        <Typography
                          noWrap
                          style={{
                            marginLeft: key.split(' - ')[0] === 'A' ? 230 : 0,
                          }}
                        >
                          {key.split(' - ')[0] === 'A' ? editTabela : null}
                        </Typography>
                      </div>
                    ))
                  )
                ) : (
                  <h2
                    style={{
                      marginTop: '80px',
                    }}
                  >
                    {' '}
                    <strong>Bem vindo ao Módulo de Espacialização</strong>
                  </h2>
                )}
              </CardContent>
              <CardContent>
                <div className={classes.header} style={{ marginTop: '-35px' }}>
                  <h3>Atributos do objeto</h3>
                </div>
                {isLoadingMetadadoSelected ? (
                  ''
                ) : (
                  <CustomTable
                    dados={createKeyAndValueObjects(
                      metadadoSelectedCampos,
                      'values'
                    )}
                    campos={createKeyAndValueObjects(
                      metadadoSelectedCampos,
                      'key'
                    )}
                    updateDados={update}
                    contentMaxHeight={350}
                    customFilterCampos={customFilterCampos}
                    customFilterDados={customFilterDados}
                  />
                )}
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  metadados: getAllMetadadosTotal(state),
  isLoadingMetadadoSelected: getMetadadoSelectedLoading(state),
  metadadoSelectedCabecalho: getAllMetadadoSelectedCabecalho(state),
  metadadoSelectedCampos: getAllMetadadoSelectedCampos(state),
  metadadoSelectedTabela: getAllMetadadoSelectedTabela(state),
  metadadoSelectedMessage: getAllMetadadoSelectedMessage(state),
  metadadoSelectedEditaveis: getAllMetadadoSelectedEditaveis(state),
})

const mapDispatchToProps = (dispatch) => ({
  // startLoadingMetadados: () => dispatch(loadMetadadosTotal()),
  onRemovePressed: (mttTababela, id) =>
    dispatch(removeMetadado(mttTababela, id)),
  onUpdatePressed: (id, json) => dispatch(updateMetadado(id, json)),
  onSetMessagePressed: (message) => dispatch(setMessage(message)),
})

Atualizacao.propTypes = {
  metadadoSelectedCabecalho: PropTypes.array,
  isLoadingMetadadoSelected: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(Atualizacao)
