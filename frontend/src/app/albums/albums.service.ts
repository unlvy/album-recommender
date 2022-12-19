import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environment";
import { Album } from "./i-album";


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) { }

  public getAlbums(): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.get(environment.albumsUrl, options);
  }

  public getAlbumsUserRatings(userID: string): Observable<any> {
    const params: HttpParams = new HttpParams();
    params.append(userID, 1);
    const options: Object = {
      observe: 'response',
      responseType: 'text',
      params: params
    }
    return this.http.get(`${environment.albumsUrl}/${userID}`, options);
  }

  public rateAlbum(userID: string, albumID: string, rating: number): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.post(`${environment.albumsUrl}/rate`, { userID: userID, albumID: albumID, rating: rating }, options);
  }

  public changeAlbumRating(userID: string, albumID: string, rating: number): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.post(`${environment.albumsUrl}/change-rating`, { userID: userID, albumID: albumID, rating: rating }, options);
  }

  public getArtists(): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.get(environment.artistsUrl, options);
  }

  public getGenres(): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.get(environment.genresUrl, options);
  }

  public createAlbum(album: Album) {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.post(`${environment.albumsUrl}/new`, album, options);
  }

};