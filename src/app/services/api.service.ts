import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, BehaviorSubject, tap, throwError } from 'rxjs';

import { CatalogoModel, ServiciosModel, adminModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class apiService {
  private catalogoUrl = 'http://localhost:3000/api/catalogo';
  private serviciosUrl = 'http://localhost:3000/api/servicios';
  private adminUrl = 'http://localhost:3000/api/admin';

  public currentLoginOn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public currentUserData: BehaviorSubject<adminModel | null> =
    new BehaviorSubject<adminModel | null>(null);

  constructor(private http: HttpClient) {}

  // -------------------------  ADMIN
  public getAdmins(): Observable<adminModel[]> {
    return this.http.get<adminModel[]>(`${this.adminUrl}`);
  }

  public getAdmin(
    correo: string,
    contrasena: string
  ): Observable<adminModel[]> {
    return this.http
      .get<adminModel[]>(`${this.adminUrl}/${correo}/${contrasena}`)
      .pipe(
        tap((admindata: adminModel[]) => {
          this.currentUserData.next(admindata[0]);
          if (admindata.length > 0) {
            this.currentLoginOn.next(true);
          }
        }),
        catchError(this.handleError)
      );
  }

  get LoggedIn(): Observable<boolean> {
    return this.currentLoginOn.asObservable();
  }

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
