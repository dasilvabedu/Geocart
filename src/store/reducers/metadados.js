import { MTT_METADADOTABELA } from '../../services/metadados'
import {
  LOAD_METADADOS_FAILURE,
  LOAD_METADADOS_IN_PROGRESS,
  LOAD_METADADOS_SUCCESS,
  LOAD_METADADO_SELECTED_FAILURE,
  LOAD_METADADO_SELECTED_IN_PROGRESS,
  LOAD_METADADO_SELECTED_SUCCESS,
  LOAD_METADADO_SELECTED_SUCCESS_EDITAVEIS,
  REMOVE_METADADO_SELECTED,
  SET_METADADO_SELECTED_MESSAGE,
  UPDATE_METADADO_SELECTED,
} from '../actions/metadados'

const initialState = { isLoading: false, data: [] }
export const metadados = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_METADADOS_SUCCESS: {
      const { metadados } = payload
      return {
        ...state,
        isLoading: false,
        data: metadados,
      }
    }

    case LOAD_METADADOS_IN_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case LOAD_METADADOS_FAILURE: {
      return {
        ...state,
        isLoading: false,
      }
    }

    default:
      return state
  }
}

const initialStateSelected = {
  isLoading: false,
  data: [],
  cabecalho: [],
  campos: [],
  dados: [],
  editaveis: [],
  camposTabelaEditaveis: [],
  mttTabela: null,
  message: {
    open: false,
    text: null,
    tipo: 'success',
    loading: false,
  },
}
export const metadadoSelected = (state = initialStateSelected, action) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_METADADO_SELECTED_SUCCESS: {
      const { mttTabela, metadados } = payload
      return {
        ...state,
        isLoading: false,
        data: metadados,
        cabecalho: metadados.cabecalho,
        campos: metadados.campos,
        dados: metadados.dados,
        mttTabela,
        message: { open: false, text: null, tipo: 'success', loading: false },
      }
    }

    case LOAD_METADADO_SELECTED_SUCCESS_EDITAVEIS: {
      const { metadados, tabela } = payload

      if (tabela === MTT_METADADOTABELA) {
        return {
          ...state,
          camposTabelaEditaveis: metadados.campos,
        }
      }

      return {
        ...state,
        editaveis: metadados.campos,
      }
    }

    case REMOVE_METADADO_SELECTED: {
      const { metadadoId: metadadoIdToRemove } = payload
      return {
        ...state,
        dados: state.dados.filter(
          (dado) => dado[Object.keys(dado)[0]] !== metadadoIdToRemove
        ),
      }
    }

    case UPDATE_METADADO_SELECTED: {
      const { id: idToUpdate, campo: campoUpdated } = payload

      return {
        ...state,
        campos: state.campos.map((campo) => {
          if (campo[Object.keys(campo)[0]] === idToUpdate) {
            Object.entries(campo).map(([keyCampo]) => {
              Object.entries(campoUpdated).map(
                ([keyCampoUpdate, valCampoUpdate]) => {
                  if (keyCampo.split(' (')[1] === `${keyCampoUpdate})`) {
                    campo[keyCampo] = valCampoUpdate
                  }
                }
              )
            })
          }
          return campo
        }),
        cabecalho: state.cabecalho.map((data) => {
          if (data[Object.keys(data)[0]] == idToUpdate) {
            Object.entries(data).map(([keyCampo]) => {
              Object.entries(campoUpdated).map(
                ([keyCampoUpdate, valCampoUpdate]) => {
                  if (keyCampo.split(' (')[1] === `${keyCampoUpdate})`) {
                    data[keyCampo] = valCampoUpdate
                  }
                }
              )
            })
          }
          return data
        }),
      }
    }

    case SET_METADADO_SELECTED_MESSAGE: {
      const { message } = payload
      return {
        ...state,
        message,
      }
    }

    case LOAD_METADADO_SELECTED_IN_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case LOAD_METADADO_SELECTED_FAILURE: {
      return {
        ...state,
        isLoading: false,
      }
    }

    default:
      return state
  }
}
