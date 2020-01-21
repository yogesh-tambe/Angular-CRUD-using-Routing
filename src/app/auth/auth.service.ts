import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './login/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://localhost:3000';
  errorData: {};

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  redirectUrl: string;

  login(username: string, password: string) {
    console.log("from log in");
    return this.http.post<any>(this.serverUrl + "/auth/login", {email: username, password: password})
    .pipe(map(user => {
      console.log("logggginnn222222222222");
        if(user) {
          this.showSuccessToaster();
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log("from log in");
          console.log("user from log in " + localStorage.getItem('currentUser'));
        }
      }),
      catchError(this.handleError)
    );
  }

  showToaster(){
    this.toastr.error("You need to login to access this page!")
  }

  showSuccessToaster(){
    this.toastr.success("Looged in successfully!")
  }

  showServerErrorToaster() {
    this.toastr.error("No response from the server!");
  }

  showUnauthorizedToaster(){
    this.toastr.error("Incorrect username or password!")
  }

  navigate() {
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    console.log("In get authorization");
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("current user" + currentUser);
    // return currentUser;
    console.log("Returning current user from get authorization token" + currentUser);
    // return localStorage.getItem('currentUser');
        return currentUser;

  }

  logout() {
    console.log('From logout');
    // console.log(localStorage.currentUser);
    localStorage.removeItem('currentUser');
    // console.log(localStorage.currentUser);
    // localStorage.removeItem('access_token');
    console.log("currentUser=" + localStorage.getItem('currentUser'));
    // console.log("access_token=" + localStorage.getItem('access_token'));
    // localStorage.clear
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      // errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
