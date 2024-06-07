import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Route, Navigate, BrowserRouter, Link } from 'react-router-dom';

export default function MenuAppBar() {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [accountAnchorEl, setAccountAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleAccountOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu
        </Typography>

        <Menu
          id="menu"
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="books" onClick={handleMenuClose}>
            Books
          </MenuItem>
          <MenuItem component={Link} to="users" onClick={handleMenuClose}>
            Users
          </MenuItem>
          <MenuItem component={Link} to="loans" onClick={handleMenuClose}>
            Loans
          </MenuItem>
        </Menu>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={accountAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(accountAnchorEl)}
            onClose={handleAccountClose}
          >
            <MenuItem
              component={Link}
              to="/profile"
              onClick={handleAccountClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              component={Link}
              to="/account"
              onClick={handleAccountClose}
            >
              My account
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
