import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin(): boolean {
    return this.isAuthenticated() && this.user.role === "admin";
  }

  public get user(): any {
    if (!this._user) {
      const token = this.jwtHelper.tokenGetter();
      this._user = this.jwtHelper.decodeToken(token).user;
    }
    return this._user;
  }

  public login(email: string, password: string) {
    return this.http.post<any>('/api/auth', { email, password })
      .pipe(
        map((response: { token: string }) => {
          if (response && response.token) {
            localStorage.setItem('access_token', response.token);
            const decoded = this.jwtHelper.decodeToken(response.token);
            this._user = decoded.user;
            return this._user;
          } else {
            return null;
          }
        })
      ).toPromise();
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  public updateUserToken(newToken: string) {
    localStorage.setItem('access_token', newToken);
    this._user = this.jwtHelper.decodeToken(newToken).data;
    return this._user;
  }
}
