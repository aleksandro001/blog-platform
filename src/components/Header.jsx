import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { logOut } from '../store/user';
import avatarPicture from '../assets/images/avatar.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useSelector((state) => state.user.username) || 'Jon Doe';
  const userEmail = useSelector((state) => state.user.email);
  const userAvatar = useSelector((state) => state.user.image) || avatarPicture;

  const fromPage = location.state?.from?.pathname || '/';

  const handleLogOutClick = () => {
    dispatch(logOut());
    navigate(fromPage, { replace: true });
  };

  return (
    <AppBar position="fixed" color="inherit" sx={{ boxShadow: 'unset' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Link style={{ textDecoration: 'none', flexGrow: 1 }} to="/articles">
          <Typography color="black" variant="h6" component="div">
            Realworld Blog
          </Typography>
        </Link>
        {!userEmail && (
          <>
            <Link to="/sign-in" style={{ textDecoration: 'none' }} state={{ from: location }}>
              <Button sx={{ textTransform: 'none', color: 'black' }}>Sign In</Button>
            </Link>

            <Link to="/sign-up" style={{ textDecoration: 'none' }}>
              <Button color="success" variant="outlined" sx={{ textTransform: 'none' }}>
                Sign Up
              </Button>
            </Link>
          </>
        )}
        {userEmail && (
          <>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" color="black">
                {userName}
              </Typography>
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Avatar alt="Avatar" src={userAvatar} sx={{ width: 46, height: 46 }} />
            </Link>
            <Button color="inherit" variant="outlined" sx={{ textTransform: 'none' }} onClick={handleLogOutClick}>
              Log Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
