import styled from '@emotion/styled'
import { AccountCircle } from '@mui/icons-material'
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material'
import React, { Fragment } from 'react'
import config from '../config.json'

export default function Header() {
    // State to control the dialog's open and close
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = React.useState(false);

    const [anchor, setAnchor] = React.useState(null)

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleMenuClose = () => {
      setAnchor(null)
    }

    // eslint-disable-next-line no-unused-vars
    const handleClose = () => {
      setOpen(false);
    };
    const isMenuOpen = Boolean(anchor)

    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)
    return (
        <Fragment>
            <AppBar position='fixed'>
                {/* <Toolbar>
      <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }}>
          <Typography variant="h6">Builder</Typography>
        </NavLink>
      </Box>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Log an issue
    </Button>
    <IconButton
    edge="end"
    onClick={(event) => {
      setAnchor(event.currentTarget)
    }}
    color="inherit"
  >
    <AccountCircle />
  </IconButton>
  <Menu
    anchorEl={anchor}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem
      onClick={() => {
        localStorage.removeItem("token")
        window.location.replace(config.redirect_url)
      }}
    >
      Logout
    </MenuItem>
    <MenuItem
      onClick={() => {
        window.location.href = `${config.redirect_url}authorised/city_plan`
        return null
      }}
    >
      Home
    </MenuItem>
  </Menu>
    </Toolbar> */}
                <Toolbar>
                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                        <Typography variant='h6'>Builder</Typography>
                    </Box>
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={handleClickOpen}>
                        Log an issue
                    </Button>
                    <IconButton
                    // size='large'
                        edge='end'
                        onClick={(event) => {
                            setAnchor(event.currentTarget)
                        }}
                        color='inherit'>
                        <AccountCircle fontSize='large' sx={{ml:'5px'}} />
                    </IconButton>
                    <Menu
          anchorEl={anchor}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              localStorage.removeItem("token")
              window.location.replace(config.redirect_url)
            }}
          >
            Logout
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location.href = `${config.redirect_url}authorised/city_plan`
              return null
            }}
          >
            Home
          </MenuItem>
        </Menu>
                </Toolbar>
            </AppBar>
            <Offset />
        </Fragment>
    )
}
