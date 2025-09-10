import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Raza } from '../models/raza.model';

@Injectable({
  providedIn: 'root'
})
export class RazaService {
  private apiUrl = 'http://localhost:8080/Raza';

  constructor(private http: HttpClient) { }

  obtenerRazas(): Observable<Raza[]> {
    return this.http.get<Raza[]>(this.apiUrl);
  }

  guardarRaza(raza: Raza): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Guardar`, raza);
  }

  actualizarRaza(id: number, raza: Raza): Observable<Raza> {
    return this.http.put<Raza>(`${this.apiUrl}/Actualizar/${id}`, raza);
  }

  eliminarRaza(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/Eliminar/${id}`);
  }
}
