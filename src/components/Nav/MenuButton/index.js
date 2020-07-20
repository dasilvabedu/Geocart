import React, { useState } from 'react'

import { Button, Menu } from '@material-ui/core'
import PropTypes from 'prop-types'

export default function MenuButton({ name, children }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Button
        color='primary'
        aria-owns={anchorEl ? 'menu-appbar' : null}
        aria-haspopup='true'
        onClick={handleMenu}
      >
        {name}
      </Button>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClickCapture={handleClose}
      >
        {children}
      </Menu>
    </>
  )
}

MenuButton.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any,
}
