import React from 'react'

import { NativeSelect } from '@material-ui/core'
import PropTypes from 'prop-types'

function Objetos({ data, value, onChange }) {
  const metadados = data.slice(0)
  metadados.sort(function (a, b) {
    const x = a.mtt_tabela.toLowerCase()
    const y = b.mtt_tabela.toLowerCase()
    return x < y ? -1 : x > y ? 1 : 0
  })

  return (
    <div>
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
          <option value=''>Selecione</option>
        )}

        {metadados.map((objeto, index) => (
          <option key={index} value={objeto.mtt_tabela}>
            {objeto.mtt_descricao} ({objeto.mtt_tabela})
          </option>
        ))}
      </NativeSelect>
    </div>
  )
}

Objetos.propTypes = {
  value: PropTypes.object,
  data: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

export default Objetos
