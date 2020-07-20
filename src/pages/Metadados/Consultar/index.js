import React, { useEffect } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import NativeSelect from '@material-ui/core/NativeSelect'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

import CustomDialog from '../../../components/Dialog'
import Map from '../../../components/Map'
import CustomTable from '../../../components/Table'
import Toast from '../../../components/Toast'
import {
  loadMetadadosTotal,
  loadDadoPorExtenso,
  setMessage,
  updateMetadado,
} from '../../../services/metadados'
import {
  getMetadadosTotalLoading,
  getAllMetadadosTotal,
  getMetadadoSelectedLoading,
  getAllMetadadoSelectedCabecalho,
  getAllMetadadoSelectedCampos,
  getAllMetadadoSelectedDados,
  getAllMetadadoSelectedTabela,
  getAllMetadadoSelectedMessage,
  getAllMetadadoSelectedEditaveis,
} from '../../../store/selectors/metadados'

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

const Metadados = ({
  metadados,
  metadadoSelectedCabecalho,
  metadadoSelectedCampos,
  metadadoSelectedDados,
  metadadoSelectedTabela,
  metadadoSelectedMessage,
  metadadoSelectedEditaveis,
  onUpdatePressed,
  onTabelaSelected,
  onSetMessagePressed,
  isLoading,
  isLoadingMetadadoSelected,
  startLoadingMetadados,
}) => {
  useEffect(() => {
    startLoadingMetadados()
  }, [startLoadingMetadados])

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

  const handleChange = (event) => {
    const { name, value } = event.target
    onTabelaSelected(value)
    setState({
      ...state,
      [name]: value,
      mtt_tabela: value,
    })
  }

  const info = (dado, fields) => {
    const mensagem = {
      open: true,
      //texto: `Consultar/Update ${dado.id}`,
      tipo: 'success',
      data: dado,
      campos: fields,
      editData: false,
    }
    setState({ ...state, mensagem })
  }

  const update = (dado, fields) => {
    const mensagem = {
      open: true,
      //texto: `Consultar/Update ${dado.id}`,
      tipo: 'success',
      labelButton: 'Atualizar',
      dialogTitle: 'Atualizar atributo',
      data: dado,
      campos: fields,
      editData: true,
      action(id, dadoAlteracao) {
        setState({ ...state, mensagem: { openToast: false, open: false } })
        const dataToUpdate = {
          ...dadoAlteracao,
          // tabela: state.mtt_tabela,
          tabela: 'mta_metadadoatributo',
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

  String.prototype.replaceAll = function (find, replace) {
    const str = this
    return str.replace(
      new RegExp(find.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
      replace
    )
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
    for (const [, value] of Object.entries(elementsParse)) {
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

  const loadingMessage = <CircularProgress />
  const loadingAction = <LinearProgress />
  const metadadosSorted = metadados.slice(0)
  metadadosSorted.sort(function (a, b) {
    const x = a.mtt_tabela.toLowerCase()
    const y = b.mtt_tabela.toLowerCase()
    return x < y ? -1 : x > y ? 1 : 0
  })

  const content = (
    <>
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

      {metadadoSelectedMessage.loading ? loadingAction : null}

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

      <div className={classes.root}>
        <Grid container justify='center' alignItems='center' spacing={1}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <div className={classes.header} style={{ marginTop: '-35px' }}>
                <h3>Objetos</h3>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        value={state.mtt_descricao}
                        onChange={handleChange}
                        inputProps={{
                          name: 'mtt_descricao',
                          id: 'mtt_tabela',
                        }}
                      >
                        {state.mtt_tabela ? (
                          <option value={state.mtt_tabela}>
                            {state.mtt_descricao} ({state.mtt_tabela})
                          </option>
                        ) : (
                          <option value=''>Selecione</option>
                        )}

                        {metadadosSorted.map((metadado, index) => (
                          <option value={metadado.mtt_tabela} key={index}>
                            {metadado.mtt_descricao} ({metadado.mtt_tabela})
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <div className={classes.header}>
                <h3>Metadados do Objeto</h3>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid
                    item
                    xs
                    container
                    direction='column'
                    spacing={2}
                    alignItems='center'
                    justify='center'
                  >
                    <Grid item xs>
                      {isLoadingMetadadoSelected ? (
                        loadingMessage
                      ) : Array.isArray(metadadoSelectedCabecalho) &&
                        metadadoSelectedCabecalho.length ? (
                        metadadoSelectedCabecalho.map((currElement) =>
                          Object.entries(currElement).map(([key, val]) => (
                            <Typography variant='body2' gutterBottom key={key}>
                              <strong>{key.split(' - ')[1]}: </strong>
                              {val}
                            </Typography>
                          ))
                        )
                      ) : (
                        <h2 style={{ marginTop: '80px' }}>
                          {' '}
                          <strong>Bem vindo ao Módulo de Espacialização</strong>
                        </h2>
                      )}
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
                          infoDados={info}
                          updateDados={update}
                          contentMaxHeight={350}
                          customFilterCampos={customFilterCampos}
                          customFilterDados={customFilterDados}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <div className={classes.header} style={{ marginTop: '-35px' }}>
                <h3>Conteúdo do Objeto</h3>
              </div>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm
                  container
                  alignItems='center'
                  justify='center'
                >
                  {isLoadingMetadadoSelected ? (
                    loadingMessage
                  ) : Object.values(metadadoSelectedCabecalho)[0] &&
                    Object.values(metadadoSelectedCabecalho)[0][
                      'D - Tipo da Tabela (mtt_tipo)'
                    ] &&
                    Object.values(metadadoSelectedCabecalho)[0][
                      'D - Tipo da Tabela (mtt_tipo)'
                    ] === 'convencional' ? (
                    <CustomTable
                      dados={createKeyAndValueObjects(
                        metadadoSelectedDados,
                        'values'
                      )}
                      campos={createKeyAndValueObjects(
                        metadadoSelectedDados,
                        'key'
                      )}
                      infoDados={info} /*excluirDados = {dialogRemove}*/
                    />
                  ) : (
                    <Map
                      metadado={Object.values(metadadoSelectedCabecalho)[0]}
                    />
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )

  return isLoading ? loadingMessage : content
}

const mapStateToProps = (state) => ({
  isLoading: getMetadadosTotalLoading(state),
  metadados: getAllMetadadosTotal(state),
  isLoadingMetadadoSelected: getMetadadoSelectedLoading(state),
  metadadoSelectedCabecalho: getAllMetadadoSelectedCabecalho(state),
  metadadoSelectedCampos: getAllMetadadoSelectedCampos(state),
  metadadoSelectedDados: getAllMetadadoSelectedDados(state),
  metadadoSelectedTabela: getAllMetadadoSelectedTabela(state),
  metadadoSelectedMessage: getAllMetadadoSelectedMessage(state),
  metadadoSelectedEditaveis: getAllMetadadoSelectedEditaveis(state),
})

const mapDispatchToProps = (dispatch) => ({
  onTabelaSelected: (mttTababela) => dispatch(loadDadoPorExtenso(mttTababela)),
  onUpdatePressed: (id, json) => dispatch(updateMetadado(id, json)),
  onSetMessagePressed: (message) => dispatch(setMessage(message)),
  startLoadingMetadados: () => dispatch(loadMetadadosTotal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Metadados)
