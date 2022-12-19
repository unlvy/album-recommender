import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environment";


@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private http: HttpClient) { }

  public getArtists(): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.get(environment.artistsUrl, options);
  }

  public getLikedArtists(userID: string): Observable<any> {
    const params: HttpParams = new HttpParams();
    params.append(userID, 1);
    const options: Object = {
      observe: 'response',
      responseType: 'text',
      params: params
    }
    return this.http.get(`${environment.artistsUrl}/${userID}`, options);
  }

  public likeArtist(userID: string, artistID: string): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.post(`${environment.artistsUrl}/like`, { userID: userID, artistID: artistID }, options);
  }

  public dislikeArtist(userID: string, artistID: string): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.post(`${environment.artistsUrl}/dislike`, { userID: userID, artistID: artistID }, options);
  }

  public createArtist(artistName: string): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.post(`${environment.artistsUrl}/new`, { artistName: artistName }, options);
  }
};