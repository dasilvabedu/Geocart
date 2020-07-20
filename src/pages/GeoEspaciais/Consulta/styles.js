import { CardHeader as CardHeaderMui } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const Container = styled.div`
  /* width: 100vw; */
`

export const CardHeader = styled(CardHeaderMui)`
  background: #1e74bb;
  color: #fff;
`
export const Header = styled.div`
  align-items: center;
  background: #1e74bb;
  color: white;
  padding-left: 8px;
  margin: -16px;
  line-height: 1.5;
`
export const Section = styled(Paper)`
  padding: 16px;
  /* height: 520px; */
  overflow: auto;
  margin: 8px;
  border-top: 2px solid #318eda;
`
