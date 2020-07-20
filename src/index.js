import React from 'react'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'

import BasePage from './layout/BasePage'
import * as GeoEspaciais from './pages/GeoEspaciais'
import Home from './pages/Home'
import * as Metadados from './pages/Metadados'
import NotFound from './pages/NotFound'
import * as ObjetosTabulares from './pages/ObjetosTabulares'
import { configureStore } from './store'
import GlobalStyle from './styles/global'

const store = configureStore()
const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <BrowserRouter basename='/'>
        <BasePage>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              path='/metadados/consultar'
              component={Metadados.Consultar}
            />
            <Route path='/metadados/validar' component={Metadados.Validar} />
            <Route
              path='/metadados/atualizacao'
              component={Metadados.Atualizacao}
            />
            <Route path='/metadados/exclusao' component={Metadados.Exclusao} />
            <Route
              path='/geo-espaciais/consulta'
              component={GeoEspaciais.Consulta}
            />
            <Route
              path='/geo-espaciais/inclusao'
              component={GeoEspaciais.Inclusao}
            />
            <Route
              path='/objetos-tabulares/atualizacao'
              component={ObjetosTabulares.Atualizacao}
            />
            <Route component={NotFound} />
          </Switch>
        </BasePage>
        <GlobalStyle />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
