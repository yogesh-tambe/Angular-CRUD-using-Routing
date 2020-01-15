
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("In auth interceptor");
        console.log(localStorage.getItem('access_token'));
        const authToken = this.authService.getAuthorizationToken();
        if (authToken) {
            console.log("In auth interceptor2");
            req = req.clone({
                setHeaders:
                    { Authorization: authToken }
                }
            );
        }
        
        return next.handle(req);
    }
}
