import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LenghtService {
  constructor() {}

  caracteresDescripcion(description: string, limit: number): string {
    if (description.length > limit) {
      return description.slice(0, limit) + '...';
    }
    return description;
  }
}
