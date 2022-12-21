const backendUrl = 'https://album-recommender-backend.onrender.com/';

export const environment = {
  loginUrl: `${backendUrl}/auth/login`,
  logoutUrl: `${backendUrl}/auth/logout`,
  registerUrl: `${backendUrl}/auth/register`,
  albumsUrl: `${backendUrl}/albums`,
  artistsUrl: `${backendUrl}/artists`,
  genresUrl: `${backendUrl}/genres`,
  recommendationsUrl: `${backendUrl}/recommendations`,
}