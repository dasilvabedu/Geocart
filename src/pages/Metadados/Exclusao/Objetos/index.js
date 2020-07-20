import React from 'react'

import { NativeSelect, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'

function Objetos({ data, value, onChange }) {
  return (
    <div>
      {data.length <= 0 ? (
        <CircularProgress />
      ) : (
        <NativeSelect
          value={value}
          inputProps={{
            name: 'mtt_descricao',
            id: 'mtt_tabela',
          }}
          onChange={onChange}
        >
          {value.mtt_tabela ? (
            <option value={value.mtt_tabela}>
              {value.mtt_descricao} ({value.mtt_tabela})
            </option>
          ) : (
            <option value=''>Selecione o objeto a excluir</option>
          )}

          {data.map((objeto, index) => (
            <option key={index} value={objeto.mtt_tabela}>
              {objeto.mtt_descricao} ({objeto.mtt_tabela})
            </option>
          ))}
        </NativeSelect>
      )}
    </div>
  )
}

Objetos.propTypes = {
  value: PropTypes.object,
  data: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

export default Objetos
