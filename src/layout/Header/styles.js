import { AppBar as MaterialAppBar } from '@material-ui/core'
import styled from 'styled-components'

export const LogoImage = styled.img`
  display: block;
  max-width: 132px;
  height: auto;
  margin-right: 15px;
`

export const AppBar = styled(MaterialAppBar)`
  && {
    background: #fff;
  }
`
export const Actions = styled.div`
  margin-left: auto;
`
