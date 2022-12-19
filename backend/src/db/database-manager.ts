import { driver, Driver, auth } from "neo4j-driver";

import { QueryResult } from "./i-query-result";
import { QUERY } from "./queries";

export class DatabaseManager {

  private driver: Driver;

  constructor(dbURI: string, dbUser: string, dbPassword: string) {
    this.driver = driver(dbURI, auth.basic(dbUser, dbPassword));
    this.driver.verifyConnectivity();
  }

  public async registerUser(username: string, password: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.AUTH.REGISTER, { username: username, password: password });
  }

  public async validatePassword(username: string, password: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.AUTH.VALIDATE, { username: username, password: password });
  }

  public async getGenres(): Promise<QueryResult> {
    return await this.executeQuery(QUERY.GENRE.GET, {});
  }

  public async getUserLikedGenres(userID: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.GENRE.GET_LIKED, { userID: userID });
  }

  public async likeGenre(userID: string, genreID: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.GENRE.LIKE, { userID: userID, genreID: genreID });
  }

  public async dislikeGenre(userID: string, genreID: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.GENRE.DISLIKE, { userID: userID, genreID: genreID });
  }

  public async createGenre(genreName: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.GENRE.CREATE, { genreName: genreName });
  }

  public async getArtists(): Promise<QueryResult> {
    return await this.executeQuery(QUERY.ARTIST.GET, {});
  }

  public async getUserLikedArtists(userID: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.ARTIST.GET_LIKED, { userID: userID });
  }

  public async likeArtist(userID: string, artistID: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.ARTIST.LIKE, { userID: userID, artistID: artistID });
  }

  public async dislikeArtist(userID: string, artistID: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.ARTIST.DISLIKE, { userID: userID, artistID: artistID });
  }

  public async createArtist(artistName: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.ARTIST.CREATE, { artistName: artistName });
  }

  public async getAlbums(): Promise<QueryResult> {
    return await this.executeQuery(QUERY.ALBUM.GET, {});
  }

  public async getAlbumsRatings(userID: string): Promise<QueryResult> {
    return await this.executeQuery(QUERY.ALBUM.GET_RATINGS, { userID: userID });
  }

  public async rateAlbum(userID: string, albumID: string, rating: number): Promise<QueryResult> {
    return await this.executeQuery(QUERY.ALBUM.RATE, { userID: userID, albumID: albumID, rating: rating });
  }

  public async updateAlbumRating(userID: string, albumID: string, rating: number): Promise<QueryResult> {
    return await this.executeQuery(QUERY.ALBUM.UPDATE_RATING, { userID: userID, albumID: albumID, rating: rating });
  }

  public async createAlbum(album: any) {
    var lengthStr = 'PT';
    if (album.hours > 0) {
      lengthStr += album.hours + 'H';
    } 
    if (album.minutes > 0) {
      lengthStr += album.minutes + 'M';
    }
    if (album.seconds > 0) {
      lengthStr += album.seconds + 'S';
    }
    const res1 = await this.executeQuery(QUERY.ALBUM.CREATE, { name: album.name, year: album.year, length: lengthStr, numTracks: album.numTracks, imageUrl: album.imageUrl }); 
    await this.executeQuery(QUERY.ALBUM.ADD_ARTIST, { albumID: res1.result[0].id, artistID: album.artistID });
    return await this.executeQuery(QUERY.ALBUM.ADD_GENRES, { albumID:  res1.result[0].id, genresIDs: album.genresIDs });
  }

  public async getRecommendedAlbums(userID: string) {
    return await this.executeQuery(QUERY.RECOMMENDED.GET_ALBUMS, { userID: userID });
  }

  private async executeQuery(query: string, params: any): Promise<QueryResult> {
    const session = this.driver.session();
    let queryResult: QueryResult = { success: true };

    try {
      const res = await session.run(query, params);
      queryResult.result = res.records.map((r) => r.toObject());
    } catch (ignored) {
      queryResult.success = false;
    }

    await session.close();
    return queryResult;
  }
}