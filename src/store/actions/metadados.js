export const LOAD_METADADOS_IN_PROGRESS = 'LOAD_METADADOS_IN_PROGRESS'
export const loadMetadadosInProgress = () => ({
  type: LOAD_METADADOS_IN_PROGRESS,
})

export const LOAD_METADADOS_SUCCESS = 'LOAD_METADADOS_SUCCESS'
export const loadMetadadosSuccess = (metadados) => ({
  type: LOAD_METADADOS_SUCCESS,
  payload: { metadados },
})

export const LOAD_METADADOS_FAILURE = 'LOAD_METADADOS_FAILURE'
export const loadMetadadosFailure = () => ({
  type: LOAD_METADADOS_FAILURE,
})

export const LOAD_METADADO_SELECTED_IN_PROGRESS =
  'LOAD_METADADO_SELECTED_IN_PROGRESS'
export const loadMetadadoSelectedInProgress = () => ({
  type: LOAD_METADADO_SELECTED_IN_PROGRESS,
})

export const LOAD_METADADO_SELECTED_SUCCESS = 'LOAD_METADADO_SELECTED_SUCCESS'
export const loadMetadadoSelectedSuccess = (mttTabela, metadados) => ({
  type: LOAD_METADADO_SELECTED_SUCCESS,
  payload: { mttTabela, metadados },
})

export const LOAD_METADADO_SELECTED_SUCCESS_EDITAVEIS =
  'LOAD_METADADO_SELECTED_SUCCESS_EDITAVEIS'
export const loadMetadadoSelectedSuccessEditaveis = (metadados, tabela) => ({
  type: LOAD_METADADO_SELECTED_SUCCESS_EDITAVEIS,
  payload: { metadados, tabela },
})

export const LOAD_METADADO_SELECTED_FAILURE = 'LOAD_METADADO_SELECTED_FAILURE'
export const loadMetadadoSelectedFailure = () => ({
  type: LOAD_METADADO_SELECTED_FAILURE,
})

export const REMOVE_METADADO_SELECTED = 'REMOVE_METADADO_SELECTED'
export const removeMetadadoSelected = (metadadoId) => ({
  type: REMOVE_METADADO_SELECTED,
  payload: { metadadoId },
})

export const UPDATE_METADADO_SELECTED = 'UPDATE_METADADO_SELECTED'
export const updateMetadadoSelected = (id, campo) => ({
  type: UPDATE_METADADO_SELECTED,
  payload: { id, campo },
})

export const SET_METADADO_SELECTED_MESSAGE = 'SET_METADADO_SELECTED_MESSAGE'
export const setMetadadoSelectedMessage = (message) => ({
  type: SET_METADADO_SELECTED_MESSAGE,
  payload: { message },
})
