import * as React from 'react';
import { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import { useNavigate } from "react-router-dom";
import useUserStore from '../../store/UserStore';


const LoginRegister = ['Login', 'Register'];
const settings = ['Profile', 'Logout'];

function TopBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {auth, setAuth, user} = useUserStore();
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLoginRegister = (page) => {
    if (page === 'Login') {
      return navigate('/login');
    } else {
      return navigate('/register');
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Profile') {
      return navigate('/profile');
    } else {
      localStorage.removeItem("token"); 
      setAuth(false);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
    else {
      setAuth(false);
    }
  },[auth]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>

            <MonochromePhotosIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >

              PHOTO SHARING
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MonochromePhotosIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 0,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PHOTO SHARING
            </Typography>
          </Box>

          {(!auth && <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
            {LoginRegister.map((page) => (
              <Button
                key={page}
                onClick={() => handleLoginRegister(page)}
                sx={{ my: 2, color: 'white', display: 'block', padding: '10px', margin: '0 10px'}}
              >
                {page}
              </Button>
            ))}
          </Box>)}

          {(auth && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center" >{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>)}
        </Toolbar>
      </Container>
    </AppBar>
  );

}
export default TopBar;
