import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { apiService } from '../services/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | import('@angular/router').UrlTree> => {
  const router = inject(Router);

  const isLogged = inject(apiService);
  return isLogged.LoggedIn.pipe(
    map((token) => (token ? true : router.createUrlTree(['/login'])))
  );
};
