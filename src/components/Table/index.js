import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Info from '@material-ui/icons/Info'

import './scroll.css'
String.prototype.replaceAll = function (find, replace) {
  const str = this
  return str.replace(
    new RegExp(find.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
    replace
  )
}
const ButtonAction = ({ dado, campos, actionDados, Icon }) => {
  return !actionDados ? null : (
    <IconButton
      color='primary'
      aria-label='upload picture'
      component='span'
      onClick={() => {
        actionDados(dado, campos)
      }}
    >
      <Icon />
    </IconButton>
  )
}

const CellAction = ({ dado, campos, infoDados, updateDados, excluirDados }) => {
  if (!infoDados && !excluirDados && !updateDados) return null

  return (
    <TableCell align='center' style={{ width: '150px' }}>
      <ButtonAction
        dado={dado}
        campos={campos}
        actionDados={infoDados}
        Icon={Info}
      />
      <ButtonAction
        dado={dado}
        campos={campos}
        actionDados={updateDados}
        Icon={Edit}
      />
      <ButtonAction
        dado={dado}
        campos={campos}
        actionDados={excluirDados}
        Icon={Delete}
      />
    </TableCell>
  )
}

const TitleAction = ({ infoDados, excluirDados, updateDados }) => {
  if (!infoDados && !excluirDados && !updateDados) return null

  return <TableCell align='center'>AÇÕES</TableCell>
}

const CustomTable = (props) => {
  const {
    campos = [],
    dados,
    infoDados,
    excluirDados,
    updateDados,
    contentMaxHeight,
    customFilterCampos = [],
    customFilterDados = [],
  } = props

  return (
    <TableContainer style={{ maxHeight: contentMaxHeight }}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            {campos.map((campo) =>
              customFilterCampos.length ? (
                customFilterCampos.includes(campo.titulo) ? (
                  <TableCell align='center'>{campo.titulo}</TableCell>
                ) : null
              ) : (
                <TableCell align='center'>{campo.titulo}</TableCell>
              )
            )}
            {campos.length ? (
              <TitleAction
                infoDados={infoDados}
                excluirDados={excluirDados}
                updateDados={updateDados}
              />
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {dados.map((dado) => (
            <TableRow key={dado.id}>
              {campos.map((campo) =>
                customFilterDados.length ? (
                  customFilterDados.includes(campo.dado) ? (
                    <TableCell align='center'>{dado[campo.dado]}</TableCell>
                  ) : null
                ) : (
                  <TableCell align='center'>{dado[campo.dado]}</TableCell>
                )
              )}
              <CellAction
                dado={dado}
                campos={campos}
                infoDados={infoDados}
                updateDados={updateDados}
                excluirDados={excluirDados}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomTable
