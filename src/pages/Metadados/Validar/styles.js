import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const Container = styled.div`
  flex-grow: 1;
  margin-top: 16px;
`
export const MessageArea = styled.div`
  margin-top: 25px;
  border: 2px solid #999;
  /* height: 200px; */
  padding: 10px;
`
export const List = styled.ul`
  padding: 0px;
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
  height: 520px;
  overflow: auto;
  margin: 8px;
  border-top: 2px solid #318eda;
`
