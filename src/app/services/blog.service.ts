
import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient, HttpErrorResponse, HttpBackend, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  serverUrl = 'http://localhost:3000/blogs/';
  errorData: {};

  private http: HttpClient;

  constructor(handler: HttpBackend) { 
    this.http = new HttpClient(handler);
  }

  getBlogs() {
    return this.http.get<Blog>(this.serverUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAllBlogs(): Observable<Blog> {
    return this.http.get<Blog>(this.serverUrl).pipe(
      catchError(this.handleError)
    );
  }

  getBlogById(blogId: string): Observable <Blog>{
    return this.http.get<Blog>(this.serverUrl + blogId);
  }

  createBlog(blog: Blog): Observable<Blog>{
    let httpHeaders = new HttpHeaders().
    set('Content-Type', 'application/json');

    let options = {
      headers:httpHeaders
    };
    return this.http.post<Blog>(this.serverUrl, blog, options);
  }
  // getBlog(id: number) {
  //   return this.http.get<Blog>(this.serverUrl + '/blogs/' + id).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // createBlog(blog) {
  //   return this.http.post<any>(this.serverUrl + '/blogs', blog)
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  // }

  updateBlog(formData: FormData, blog: Blog): Observable<number> {
    let httpHeaders = new HttpHeaders().
    set('Content-Type', 'application/json');

    let options = {
      headers:httpHeaders
    };
    return this.http.put<number>(this.serverUrl + blog.id, blog, options);
  }

  deleteBlogById(blogId: string): Observable<number>{
    let httpHeaders = new HttpHeaders().
    set('Content-Type', 'application/json');

    return this.http.delete<number>(this.serverUrl + blogId);
  }

  // deleteBlog(id: number) {
  //   return this.http.delete(this.serverUrl + '/blogs/' + id).pipe(
  //     catchError(this.handleError)
  //   );
  // }

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
    
    return throwError('Something bad happened. Please try again later.');
  }
}
