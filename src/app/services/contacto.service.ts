import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, BehaviorSubject, tap, throwError } from 'rxjs';

import { ContactoModel } from '../models/contacto.model';

@Injectable({
  providedIn: 'root',
})
export class contactoService {
  private contactoUrl = 'http://localhost:3000/api/contacto';

  constructor(private http: HttpClient) {}

  public getContacto(): Observable<ContactoModel[]> {
    return this.http
      .get<ContactoModel[]>(this.contactoUrl)
      .pipe(catchError(this.handleError));
  }

  public getContactoById(id: number): Observable<ContactoModel> {
    const url = `${this.contactoUrl}/${id}`;
    return this.http.get<ContactoModel>(url).pipe(catchError(this.handleError));
  }

  public createContact(C: ContactoModel): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.contactoUrl}`, C)
      .pipe(catchError(this.handleError));
  }

  public deleteContacto(Id: number): void {
    this.http
      .delete(`${this.contactoUrl}/${Id}`)
      .pipe(catchError(this.handleError))
      .subscribe();
  }

  // ------------------------- ERROR
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
