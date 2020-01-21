
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) {}

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     let token = window.localStorage.getItem('token');
    //     if (token) {
    //       request = request.clone({
    //         setHeaders: {
    //           Authorization: 'Bearer ' + token
    //         }
    //       });
    //     }
    //     return next.handle(request);
    //   }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     console.log("In auth interceptor");
    //     // console.log("currentUser=" + localStorage.getItem('currentUser'));
    //     // console.log("access_token=" + localStorage.getItem('access_token'));
    //     // console.log(localStorage.getItem('access_token'));
    //     const authToken = this.authService.getAuthorizationToken();
    //     console.log("back to auth interceptor");
    //     console.log("authtoken="+authToken);
    //     if (authToken) {
    //         console.log("In auth interceptor2");
    //         req = req.clone({
    //             setHeaders:
    //                 { Authorization: 'Bearer' + authToken }
    //             }
    //         );
    //     }
    //     else {
    //         console.log("Invalid!!!!!!!!!!!!!!");
    //         // this.authService.showToaster();
    //     }

        
    //     return next.handle(req);
    // }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("From intercept");
    
        return next.handle(request).do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              console.log("from 1st if of intercept");
            // do stuff with response if you want
            console.log(this.authService.getAuthorizationToken())
            request = request.clone({
                            setHeaders:
                                { Authorization: 'Bearer' + this.authService.getAuthorizationToken() }
                            }
                        );
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
              console.log("from 2nd if of intercept");
              console.log(err.status);
              
            if (err.status === 401) {
                console.log("from 3rd if of intercept");
              // redirect to the login route
              // or show a modal
              this.authService.showUnauthorizedToaster();
            //   this.authService.navigate();
                this.router.navigate(['']);
            }

            if (err.status === 0) {
                this.authService.showServerErrorToaster();
                this.authService.navigate();
            }
          }
        });
      }
}
