import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of, tap } from "rxjs";

import { User } from "./user";
import { environment } from "src/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User = undefined!;
  public LOGGED_PATH: string = '/albums';

  constructor(private http: HttpClient, private router: Router) { }

  public login(credentials: any): Observable<any> {
    const options: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response',
      responseType: 'text'
    }

    return this.http.post(environment.loginUrl, credentials, options)
      .pipe(tap((res: any) => { this.user = new User(credentials.username, res.body); }));
  }

  public register(credentials: any): Observable<any>  {
    const options: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response',
      responseType: 'text'
    }

    return this.http.post(environment.registerUrl, credentials, options);
  }

  public logout(): void {
    this.user = undefined!;
    this.router.navigate(['/']);
  }

  public isLoggedIn$(): Observable<boolean> {
    if (this.user) {
      return of(true);
    } else {
      return of(false);
    }
  }

  public getUserID(): string {
    return this.user.getID();
  }

};