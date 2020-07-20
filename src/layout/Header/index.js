import React from 'react'

import { MenuItem, Button, Toolbar } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

import logo from '../../assets/logo.png'
import MenuButton from '../../components/Nav/MenuButton'
import { AppBar, LogoImage, Actions } from './styles'

export default function Header() {
  const closeWindow = () => {
    // redirect to anywhere ?
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <NavLink to='/'>
          <LogoImage src={logo} />
        </NavLink>
        <MenuButton name='Metadados'>
          <MenuItem component={NavLink} to='/metadados/consultar'>
            Consultar
          </MenuItem>
          <MenuItem component={NavLink} to='/metadados/validar'>
            Validação
          </MenuItem>
          <MenuItem component={NavLink} to='/metadados/atualizacao'>
            Atualização
          </MenuItem>
          <MenuItem component={NavLink} to='/metadados/exclusao'>
            Exclusão
          </MenuItem>
        </MenuButton>
        <MenuButton name='Objetos Geoespaciais'>
          <MenuItem component={NavLink} to='/geo-espaciais/consulta'>
            Consultar
          </MenuItem>
        </MenuButton>
        <MenuButton name=' Objetos Tabulares'>
          <MenuItem component={NavLink} to='/objetos-tabulares/atualizacao'>
            Atualização
          </MenuItem>
        </MenuButton>
        <Actions>
          <Button color='primary' component={NavLink} to='/'>
            Voltar
          </Button>
          <Button color='primary' onClick={closeWindow}>
            Sair
          </Button>
        </Actions>
      </Toolbar>
    </AppBar>
  )
}
