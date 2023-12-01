/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Checkbox, Chip, Grid, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { deleteArticle, removeAsFavorite, setAsFavorite } from '../store/articles';

import ConfirmDeleteArticle from './ConfirmDeleteArticle';
import formatTime from '../utils/formatTime';
import getUniqueKey from '../utils/getUniqueKey';

import avatarPicture from '../assets/images/avatar.png';

const ArticlePreview = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { article, singlePage } = props;

  const userLoggedIn = useSelector((state) => state.user.username);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(article?.favorited || false);
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);

  const articleCreator = article.author.username;

  const closeModal = () => setModalIsOpen(false);

  const openModal = () => setModalIsOpen(true);

  const handleCheckboxClick = (event) => {
    if (event.target.checked) {
      dispatch(setAsFavorite(article.slug));
      setCheckFavorite(true);
      setFavoriteCount(favoriteCount + 1);
    } else {
      dispatch(removeAsFavorite(article.slug));
      setCheckFavorite(false);
      setFavoriteCount(favoriteCount - 1);
    }
  };

  const removeArticle = () => {
    dispatch(deleteArticle(article.slug));
    setModalIsOpen(false);
    navigate('/articles', { replace: true });
  };

  return (
    <>
      {/* eslint-disable-next-line id-length */}
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={9}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ mb: 1, gap: 1 }}>
            {!singlePage && (
              <Link to={`${article.slug}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h5" color="#1890FF">
                  {article.title}
                </Typography>
              </Link>
            )}
            {singlePage && (
              <Typography variant="h5" color="#1890FF">
                {article.title}
              </Typography>
            )}
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: 'red' }} />}
              disabled={!userLoggedIn}
              checked={checkFavorite}
              onClick={(event) => handleCheckboxClick(event)}
            />
            <Typography sx={{ mr: '5px' }}>{favoriteCount}</Typography>
          </Grid>
          {article.tagList.map(
            (tag) =>
              tag && (
                <Chip
                  key={getUniqueKey()}
                  label={tag}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1, borderRadius: '4px' }}
                />
              )
          )}
          <Typography align="justify" sx={{ mt: 1 }}>
            {article.description}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="row-reverse" sx={{ mb: 3 }}>
            <Avatar alt="Avatar" src={article.author.image || avatarPicture} sx={{ width: 46, height: 46 }} />
            <Box sx={{ mr: 1 }}>
              <Typography variant="h6" align="right">
                {article.author.username}
              </Typography>
              <Typography variant="body2" align="right" sx={{ color: '#808080' }}>
                {formatTime(article.createdAt)}
              </Typography>
            </Box>
          </Grid>

          {singlePage && userLoggedIn === articleCreator && (
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button color="error" variant="outlined" sx={{ textTransform: 'none', mr: 3 }} onClick={openModal}>
                Delete
              </Button>
              {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
              <Link to="edit" style={{ textDecoration: 'none' }}>
                <Button color="success" variant="outlined" sx={{ textTransform: 'none' }}>
                  Edit
                </Button>
              </Link>
            </Box>
          )}
        </Grid>
      </Grid>
      <ConfirmDeleteArticle modalIsOpen={modalIsOpen} handleCloseModal={closeModal} handleClickDelete={removeArticle} />
    </>
  );
};

export default ArticlePreview;
