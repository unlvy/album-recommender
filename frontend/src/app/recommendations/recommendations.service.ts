import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environment";


@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private http: HttpClient) { }

  public getRecommendedAlbums(userID: string): Observable<any> {
    const options: Object = {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.get(`${environment.recommendationsUrl}/albums/${userID}`, options);
  }
};