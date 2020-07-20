import React from 'react'

import PropTypes from 'prop-types'

import Footer from '../Footer'
import Header from '../Header'
import { ContentWrapper, PageWrapper } from './styles'

const HEADER_HEIGHT = 50
const FOOTER_HEIGHT = 30

function BasePage({ children }) {
  const contentMinHeight = window.innerHeight - (HEADER_HEIGHT + FOOTER_HEIGHT)

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper
        style={{
          minHeight: contentMinHeight,
          marginTop: '20px',
          padding: '0 10px',
        }}
      >
        {children}
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  )
}

BasePage.propTypes = {
  children: PropTypes.any,
}

export default BasePage
