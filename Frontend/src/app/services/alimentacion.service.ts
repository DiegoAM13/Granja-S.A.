import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alimentacion } from '../models/alimentacion.model';

@Injectable({
  providedIn: 'root'
})
export class AlimentacionService {
  private apiUrl = 'http://localhost:8080/Alimentacion';

  constructor(private http: HttpClient) { }

  obtenerAlimentacion(): Observable<Alimentacion[]> {
    return this.http.get<Alimentacion[]>(this.apiUrl);
  }

  guardarAlimentacion(alimentacion: Alimentacion): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Guardar`, alimentacion);
  }

  actualizarAlimentacion(tipo: number, alimentacion: Alimentacion): Observable<Alimentacion> {
    return this.http.put<Alimentacion>(`${this.apiUrl}/Actualizar/${tipo}`, alimentacion);
  }

  eliminarAlimentacion(tipo: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/Eliminar/${tipo}`);
  }
}
