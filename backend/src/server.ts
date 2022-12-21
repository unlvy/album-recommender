import express from 'express';
import { AuthController } from './controllers/auth-controller';
import { DatabaseManager } from './db/database-manager' 

import { AlbumsController } from './controllers/albums-controller';
import { GenresController } from './controllers/genres-controller';
import { ArtistsController } from './controllers/artists-controller';
import { RecommendedController } from './controllers/recommended-manager';

const port = process.env.PORT;
const dbURI = process.env.DB_URI;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const dbManager = new DatabaseManager(dbURI, dbUser, dbPassword);
const authController = new AuthController(dbManager);
const albumsController = new AlbumsController(dbManager);
const genresController = new GenresController(dbManager);
const artistsController = new ArtistsController(dbManager);
const recommendedController = new RecommendedController(dbManager);
const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

// auth
app.post('/auth/login', (req, res) => authController.login(req, res));
app.post('/auth/register', (req, res) => authController.register(req, res));

// albums
app.get('/albums', (res, req) => albumsController.getAlbums(res, req));
app.get('/albums/:userID', (res, req) => albumsController.getAlbumsUserRatings(res, req));
app.post('/albums/rate', (res, req) => albumsController.rateAlbum(res, req));
app.post('/albums/change-rating', (res, req) => albumsController.changeAlbumRating(res, req));
app.post('/albums/new', (res, req) => albumsController.createAlbum(res, req));

// genres
app.get('/genres', (res, req) => genresController.getGenres(res, req));
app.get('/genres/:userID', (res, req) => genresController.getUserLikedGenres(res, req));
app.post('/genres/like', (res, req) => genresController.likeGenre(res, req));
app.post('/genres/dislike', (res, req) => genresController.dislikeGenre(res, req));
app.post('/genres/new', (res, req) => genresController.createGenre(res, req));

// artists
app.get('/artists', (res, req) => artistsController.getArtists(res, req));
app.get('/artists/:userID', (res, req) => artistsController.getUserLikedArtists(res, req));
app.post('/artists/like', (res, req) => artistsController.likeArtist(res, req));
app.post('/artists/dislike', (res, req) => artistsController.dislikeArtist(res, req));
app.post('/artists/new', (res, req) => artistsController.createArtist(res, req));

// recommendations
app.get('/recommendations/albums/:userID', (res, req) => recommendedController.getRecommendedAlbums(res, req));

app.listen(port);
