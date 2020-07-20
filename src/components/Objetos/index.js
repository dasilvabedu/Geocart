import React, { useState, useEffect } from 'react'

import { NativeSelect } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  loadMetadadosTotal,
  loadDadoPorExtenso,
} from '../../services/metadados'
import {
  getAllMetadadosTotal,
  getAllMetadadoSelectedTabela,
} from '../../store/selectors/metadados'

function Objetos({
  metadados,
  startLoadingMetadados,
  metadadoSelectedTabela,
  onTabelaSelected,
}) {
  useEffect(() => {
    startLoadingMetadados()
  }, [startLoadingMetadados])

  const tabelaSelecionada = metadados.find((metadado) => {
    return metadado.mtt_tabela === metadadoSelectedTabela
  })

  const [state, setState] = useState({
    name: tabelaSelecionada ? tabelaSelecionada.mtt_tabela : '',
    mtt_descricao: tabelaSelecionada ? tabelaSelecionada.mtt_descricao : '',
    mtt_tabela: tabelaSelecionada ? tabelaSelecionada.mtt_tabela : '',
  })

  const metadadosSorted = metadados.slice(0)
  metadadosSorted.sort(function (a, b) {
    const x = a.mtt_tabela.toLowerCase()
    const y = b.mtt_tabela.toLowerCase()
    return x < y ? -1 : x > y ? 1 : 0
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

  return (
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
  )
}

const mapStateToProps = (state) => ({
  metadados: getAllMetadadosTotal(state),
  metadadoSelectedTabela: getAllMetadadoSelectedTabela(state),
})

const mapDispatchToProps = (dispatch) => ({
  onTabelaSelected: (mttTababela) => dispatch(loadDadoPorExtenso(mttTababela)),
  startLoadingMetadados: () => dispatch(loadMetadadosTotal()),
})

Objetos.propTypes = {
  metadados: PropTypes.array,
  onTabelaSelected: PropTypes.func.isRequired,
  startLoadingMetadados: PropTypes.func.isRequired,
  metadadoSelectedTabela: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Objetos)
