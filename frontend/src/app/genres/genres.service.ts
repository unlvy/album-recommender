import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environment";


@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  public getGenres(): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.get(environment.genresUrl, options);
  }

  public getLikedGenres(userID: string): Observable<any> {
    const params: HttpParams = new HttpParams();
    params.append(userID, 1);
    const options: Object = {
      observe: 'response',
      responseType: 'text',
      params: params
    }
    return this.http.get(`${environment.genresUrl}/${userID}`, options);
  }

  public likeGenre(userID: string, genreID: string): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.post(`${environment.genresUrl}/like`, { userID: userID, genreID: genreID }, options);
  }

  public dislikeGenre(userID: string, genreID: string): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.post(`${environment.genresUrl}/dislike`, { userID: userID, genreID: genreID }, options);
  }

  public createGenre(genreName: string): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.post(`${environment.genresUrl}/new`, { genreName: genreName }, options);
  }
};