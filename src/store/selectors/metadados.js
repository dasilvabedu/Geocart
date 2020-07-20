import { createSelector } from 'reselect'

export const getMetadados = (state) => state.metadados.data
export const getMetadadosLoading = (state) => state.metadados.isLoading

export const getMetadadosTotal = (state) => state.metadados.data
export const getMetadadosTotalLoading = (state) => state.metadados.isLoading

export const getMetadadoSelected = (state) => state.metadadoSelected.data
export const getMetadadoSelectedLoading = (state) =>
  state.metadadoSelected.isLoading

export const getMetadadoSelectedCabecalho = (state) =>
  state.metadadoSelected.cabecalho
export const getMetadadoSelectedCampos = (state) =>
  state.metadadoSelected.campos
export const getMetadadoSelectedDados = (state) => state.metadadoSelected.dados
export const getMetadadoSelectedTabela = (state) =>
  state.metadadoSelected.mttTabela
export const getMetadadoSelectedEditaveis = (state) => [
  ...state.metadadoSelected.editaveis,
  ...state.metadadoSelected.camposTabelaEditaveis,
]
export const getMetadadoSelectedMessage = (state) =>
  state.metadadoSelected.message

export const getIncompleteMetadados = createSelector(
  getMetadados,
  (metadados) => metadados.filter((metadado) => !metadado.isCompleted)
)

export const getCompleteMetadados = createSelector(getMetadados, (metadados) =>
  metadados.filter((metadado) => metadado.isCompleted)
)

export const getAllMetadados = createSelector(
  getMetadados,
  (metadados) => metadados
)

export const getAllMetadadosTotal = createSelector(
  getMetadadosTotal,
  (metadados) => metadados
)

export const getAllMetadadoSelected = createSelector(
  getMetadadoSelected,
  (metadados) => metadados
)

export const getAllMetadadoSelectedCabecalho = createSelector(
  getMetadadoSelectedCabecalho,
  (metadados) => metadados
)

export const getAllMetadadoSelectedCampos = createSelector(
  getMetadadoSelectedCampos,
  (metadados) => metadados
)

export const getAllMetadadoSelectedDados = createSelector(
  getMetadadoSelectedDados,
  (metadados) => metadados
)

export const getAllMetadadoSelectedTabela = createSelector(
  getMetadadoSelectedTabela,
  (metadados) => metadados
)

export const getAllMetadadoSelectedMessage = createSelector(
  getMetadadoSelectedMessage,
  (metadados) => metadados
)

export const getAllMetadadoSelectedEditaveis = createSelector(
  getMetadadoSelectedEditaveis,
  (metadados) => metadados
)
