import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { ServiciosModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class servicioService {
  private serviciosUrl = 'http://localhost:3000/api/servicios';

  constructor(private http: HttpClient) {}

  //-------------------------SERVICIOS
  public getServicios(): Observable<ServiciosModel> {
    return this.http
      .get<ServiciosModel>(this.serviciosUrl)
      .pipe(catchError(this.handleError));
  }

  public getServicioById(id: number): Observable<ServiciosModel> {
    const url = `${this.serviciosUrl}/${id}`;
    return this.http
      .get<ServiciosModel>(url)
      .pipe(catchError(this.handleError));
  }

  public createServicio(S: ServiciosModel): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.serviciosUrl}`, S)
      .pipe(catchError(this.handleError));
  }

  public updateServicio(S: ServiciosModel, Id: number): Observable<boolean> {
    return this.http
      .put<boolean>(`${this.serviciosUrl}/${Id}`, S)
      .pipe(catchError(this.handleError));
  }

  public deleteServicio(Id: number): void {
    this.http
      .delete(`${this.serviciosUrl}/${Id}`)
      .pipe(catchError(this.handleError))
      .subscribe();
  }

  // ------------------------- ERROR
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
