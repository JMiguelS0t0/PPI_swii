import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, BehaviorSubject, tap, throwError } from 'rxjs';

import { adminModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class apiService {
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

  // ------------------------- ERROR
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
