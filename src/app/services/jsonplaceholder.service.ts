// jsonplaceholder.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class JsonplaceholderService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(retry(1), catchError(this.handleError));
  }

  createPost(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, this.httpOptions).pipe(catchError(this.handleError));
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(() => error.message || 'Server error');
  }
}
