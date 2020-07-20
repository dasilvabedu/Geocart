import {
  loadMetadadosInProgress,
  loadMetadadosSuccess,
  loadMetadadosFailure,
  setMetadadoSelectedMessage,
} from '../store/actions/metadados'

const URL = 'http://moduloespacializacao.herokuapp.com/seguranca_barragem'

export const fetchObjetosTotal = async (tipo = '') => {
  const response = await fetch(`${URL}/metadado/total?mtt_tipo=${tipo}`)

  return await response.json()
}

export const fetchObjetoTabelaExtenso = async (tabela = '') => {
  if (tabela === '') return {}

  const response = await fetch(`${URL}/dado/extenso?mtt_tabela=${tabela}`)

  return await response.json()
}

export const fetchObjetoAptoExclusao = async () => {
  const response = await fetch(`${URL}/metadado/aptoexclusao`)

  return await response.json()
}

export const excluirObjeto = async (tabela) => {
  const response = await fetch(`${URL}/metadado/excluido?mtt_tabela=${tabela}`)

  return await response.json()
}

export const fetchMetadadoByType = (mtt_tipo) => async (dispatch) => {
  try {
    dispatch(loadMetadadosInProgress())

    const response = await fetch(`${URL}/metadado/total?mtt_tipo=${mtt_tipo}`)
    const metadados = await response.json()

    if (metadados.aresposta.codigo === 200) {
      dispatch(loadMetadadosSuccess(metadados.cabecalho))
    } else {
      throw new Error(metadados.aresposta.mensagem)
    }
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
