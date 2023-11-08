import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, BehaviorSubject, tap, throwError } from 'rxjs';

import { CatalogoModel, adminModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class catalogoService {
  private catalogoUrl = 'http://localhost:3000/api/catalogo';

  constructor(private http: HttpClient) {}

  // -------------------------  CATALOGO
  public getCatalogo(): Observable<CatalogoModel[]> {
    return this.http
      .get<CatalogoModel[]>(this.catalogoUrl)
      .pipe(catchError(this.handleError));
  }

  public getCatalogoById(id: number): Observable<CatalogoModel> {
    const url = `${this.catalogoUrl}/${id}`;
    return this.http.get<CatalogoModel>(url).pipe(catchError(this.handleError));
  }

  public createCatalogo(C: CatalogoModel): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.catalogoUrl}`, C)
      .pipe(catchError(this.handleError));
  }

  public deleteCatalogo(Id: number): void {
    this.http
      .delete(`${this.catalogoUrl}/${Id}`)
      .pipe(catchError(this.handleError))
      .subscribe();
  }

  public updateCatalogo(C: CatalogoModel, Id: number): Observable<boolean> {
    return this.http
      .put<boolean>(`${this.catalogoUrl}/${Id}`, C)
      .pipe(catchError(this.handleError));
  }

  // ------------------------- ERROR
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
