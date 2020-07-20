import React, { useEffect, useState } from 'react'

import {
  Grid,
  Card,
  CardContent,
  NativeSelect,
  Button,
} from '@material-ui/core'

import Map from '../../../components/Map'
import { Container, CardHeader } from './styles'

function Inclusao() {
  const [objetos, setObjetos] = useState([])
  const [objeto, setObjeto] = useState({ mtt_tabela: '', mtt_descricao: '' })

  useEffect(() => {
    async function fetchObjetos() {
      const response = await fetch(
        'http://moduloespacializacao.herokuapp.com/seguranca_barragem/metadado/total?mtt_tipo=espacial'
      )
      setObjetos((await response.json()).cabecalho)
    }

    fetchObjetos()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setObjeto({
      mtt_tabela: value,
    })
  }

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Objetos' />
            <CardContent>
              <NativeSelect
                value={objeto.mtt_descricao}
                onChange={handleChange}
                inputProps={{
                  id: 'mtt_tabela',
                  name: 'mtt_descricao',
                }}
              >
                {objeto.mtt_tabela ? (
                  <option value={objeto.mtt_tabela}>
                    {objeto.mtt_descricao} ({objeto.mtt_tabela})
                  </option>
                ) : (
                  <option value=''>Selecione</option>
                )}

                {objetos.map((objeto, index) => (
                  <option key={index} value={objeto.mtt_tabela}>
                    {objeto.mtt_descricao} ({objeto.mtt_tabela})
                  </option>
                ))}
              </NativeSelect>
              <div style={{ marginTop: '20px' }}>
                <Button variant='contained'>Incorporar</Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginTop: '10px' }}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Objeto a incorporar' />
            <CardContent>
              <Map metadado={objeto} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Objeto existente' />
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Inclusao
