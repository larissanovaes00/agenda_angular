import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {


  //fake api
  private url = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private httpClient: HttpClient ) { }

  getAll(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.url + '/contacts/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.url + '/contacts/', JSON.stringify(contact), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  
  update(id: number, contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(this.url + '/contacts/' + id, JSON.stringify(contact), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id) {
    return this.httpClient.delete<Contact>(this.url + '/contacts/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

