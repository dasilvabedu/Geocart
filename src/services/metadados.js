import {
  loadMetadadosInProgress,
  loadMetadadosSuccess,
  loadMetadadosFailure,
  loadMetadadoSelectedInProgress,
  loadMetadadoSelectedSuccess,
  loadMetadadoSelectedSuccessEditaveis,
  loadMetadadoSelectedFailure,
  removeMetadadoSelected,
  updateMetadadoSelected,
  setMetadadoSelectedMessage,
} from '../store/actions/metadados'

const urlBase = 'http://moduloespacializacao.herokuapp.com/seguranca_barragem'

export const MTT_METADADOTABELA = 'mtt_metadadotabela'

export const MTA_METADADOATRIBUTO = 'mta_metadadoatributo'

export const loadMetadados = () => async (dispatch) => {
  try {
    dispatch(loadMetadadosInProgress())
    const response = await fetch(
      'http://localhost:8080/seguranca_barragem/metadado/simple'
    )
    const metadados = await response.json()

    if (metadados.aresposta.codigo === 200)
      dispatch(loadMetadadosSuccess(metadados.cabecalho))
    else throw new Error(metadados.aresposta.mensagem)
  } catch (e) {
    dispatch(loadMetadadosFailure())
    dispatch(
      setMetadadoSelectedMessage({
        open: true,
        text: `Erro ao processar a requisição ${e}`,
        tipo: 'error',
        loading: false,
      })
    )
  }
}

export const loadMetadadosTotal = () => async (dispatch) => {
  const loadMetadadosTotalUrl =
    '/metadado/total?campos=mtt_tabela,mtt_descricao'

  try {
    dispatch(loadMetadadosInProgress())
    const response = await fetch(`${urlBase}${loadMetadadosTotalUrl}`)
    const metadados = await response.json()

    if (metadados.aresposta.codigo === 200)
      dispatch(loadMetadadosSuccess(metadados.cabecalho))
    else throw new Error(metadados.aresposta.mensagem)

    dispatch(loadDadoParaValidacao(MTA_METADADOATRIBUTO))
    dispatch(loadDadoParaValidacao(MTT_METADADOTABELA))
  } catch (e) {
    dispatch(loadMetadadosFailure())
    dispatch(
      setMetadadoSelectedMessage({
        open: true,
        text: `Erro ao processar a requisição ${e}`,
        tipo: 'error',
        loading: false,
      })
    )
  }
}

export const loadDadoPorExtenso = (mttTabela) => async (dispatch) => {
  const onTabelaSelectedUrl = `/dado/extenso?mtt_tabela=${mttTabela}&limite=5`

  try {
    dispatch(loadMetadadoSelectedInProgress())
    const response = await fetch(`${urlBase}${onTabelaSelectedUrl}`)
    const metadados = await response.json()

    if (metadados.aresposta.codigo === 200)
      dispatch(loadMetadadoSelectedSuccess(mttTabela, metadados))
    else throw new Error(metadados.aresposta.mensagem)
  } catch (e) {
    dispatch(loadMetadadoSelectedFailure())
    dispatch(
      setMetadadoSelectedMessage({
        open: true,
        text: `Erro ao processar a requisição ${e}`,
        tipo: 'error',
        loading: false,
      })
    )
  }
}

export const loadDadoParaValidacao = (mttTabela) => async (dispatch) => {
  const onTabelaSelectedUrl = `/dado/extenso?mtt_tabela=${mttTabela}`

  try {
    const response = await fetch(urlBase + onTabelaSelectedUrl)
    const metadados = await response.json()

    dispatch(loadMetadadoSelectedSuccessEditaveis(metadados, mttTabela))
  } catch (e) {
    dispatch(loadMetadadoSelectedFailure())
    dispatch(
      setMetadadoSelectedMessage({
        open: true,
        text: `Erro ao processar a requisição ${e}`,
        tipo: 'error',
        loading: false,
      })
    )
  }
}

export const removeMetadado = (mttTabela, id) => async (dispatch) => {
  const removeMetadadoUrl = `/dado/excluido?mtt_tabela=${mttTabela}&identificador=${id}`
  try {
    const response = await fetch(`${urlBase}${removeMetadadoUrl}`, {
      method: 'GET', // OR DELETE
    })
    const removedMetadado = await response.json()
    dispatch(removeMetadadoSelected(removedMetadado.excluido))
    dispatch(
      setMetadadoSelectedMessage({
        open: true,
        text: removedMetadado.aresposta.mensagem,
        loading: false,
        tipo: removedMetadado.aresposta.codigo === 200 ? 'success' : 'error',
      })
    )
  } catch (e) {
    dispatch(
      setMetadadoSelectedMessage({
        open: true,
        text: `Erro ao processar a exclusão ${e}`,
        tipo: 'error',
        loading: false,
      })
    )
  }
}

export const updateMetadado = (id, json) => async (dispatch) => {
  const updateMetadadoUrl = `/dado/convencional/atualizado`
  try {
    const body = JSON.stringify(json)
    const response = await fetch(`${urlBase}${updateMetadadoUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    })
    const updatedMetadado = await response.json()
    dispatch(updateMetadadoSelected(id, json))
    dispatch(
      setMetadadoSelectedMessage({
        open: true,
        text: updatedMetadado.aresposta.mensagem,
        loading: false,
        tipo: updatedMetadado.aresposta.codigo === 200 ? 'success' : 'error',
      })
    )
  } catch (e) {
    dispatch(
      setMetadadoSelectedMessage({
        open: true,
        text: `Erro ao processar a atualizacão ${e}`,
        tipo: 'error',
        loading: false,
      })
    )
  }
}

export const setMessage = (message) => async (dispatch) => {
  dispatch(setMetadadoSelectedMessage(message))
}

export const displayAlert = (text) => () => {
  alert(`Error ${text}`)
}

export const validarMetadado = () => async () => {
  const response = await fetch(urlBase + `/metadado/validado`)
  return await response.json()
}
