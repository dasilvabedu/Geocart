import React, { useEffect } from 'react'

import { Grid, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'

import Map from '../../../components/Map'
import Objetos from '../../../components/Objetos'
import { loadDadoParaValidacao } from '../../../services/metadados'
import { fetchMetadadoByType } from '../../../services/metadados.v2'
import {
  getMetadadoSelectedLoading,
  getAllMetadadoSelectedCabecalho,
} from '../../../store/selectors/metadados'
import { Container, Section, Header } from './styles'

function Consulta({
  metadadoSelectedCabecalho,
  isLoadingMetadadoSelected,
  startLoadingMetadados,
}) {
  const metadadoSelected = useSelector((state) => state.metadadoSelected)

  useEffect(() => {
    startLoadingMetadados('espacial')
  }, [startLoadingMetadados])

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item>
          <Section>
            <Header style={{ marginTop: '-35px', marginBottom: '10px' }}>
              <h3>Objetos</h3>
            </Header>
            <Objetos />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section>
            <Header style={{ marginTop: '-35px', marginBottom: '10px' }}>
              <h3>{'Objeto ' + metadadoSelected.mttTabela}</h3>
            </Header>
            {isLoadingMetadadoSelected ? (
              <CircularProgress />
            ) : (
              <Map metadado={metadadoSelectedCabecalho[0]} />
            )}
          </Section>
        </Grid>
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  isLoadingMetadadoSelected: getMetadadoSelectedLoading(state),
  metadadoSelectedCabecalho: getAllMetadadoSelectedCabecalho(state),
})

const mapDispatchToProps = (dispatch) => ({
  startLoadingMetadados: (type) => dispatch(fetchMetadadoByType(type)),
})

Consulta.propTypes = {
  metadadoSelectedCabecalho: PropTypes.array,
  isLoadingMetadadoSelected: PropTypes.bool,
  startLoadingMetadados: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Consulta)
