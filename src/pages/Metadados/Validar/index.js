import React, { useState } from 'react'

import { Grid, Button } from '@material-ui/core'
import { connect } from 'react-redux'

import { validarMetadado } from '../../../services/metadados'
import { Container, MessageArea, List, Section, Header } from './styles'

const Validar = ({ validarMetadado }) => {
  const [validados, setValidados] = useState([])
  const [loading, setLoading] = useState(false)

  const handleValidar = async () => {
    setLoading(true)

    const response = await validarMetadado()

    setLoading(false)
    setValidados(response.cabecalho)
  }

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Section>
            <Header style={{ marginTop: '-35px', marginBottom: '10px' }}>
              <h3>Validação</h3>
            </Header>
            <Button variant='contained' onClick={handleValidar}>
              Validar Objetos
            </Button>
            <MessageArea>
              <code>
                {loading ? (
                  'Em processamento. Pode demorar alguns minutos...'
                ) : (
                  <List>
                    {validados.length <= 0 && <li>Área da mensagem</li>}
                    {validados.map((validado, index) => (
                      <li key={index}>Tabela: {validado.tabela}</li>
                    ))}
                  </List>
                )}
              </code>
            </MessageArea>
          </Section>
        </Grid>
      </Grid>
    </Container>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  validarMetadado: () => dispatch(validarMetadado()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Validar)
