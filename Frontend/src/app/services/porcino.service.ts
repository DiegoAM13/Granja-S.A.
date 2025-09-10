import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PorcinoDTO } from '../models/porcino.model';

@Injectable({
  providedIn: 'root'
})
export class PorcinoService {
  private apiUrl = 'http://localhost:8080/Porcino';

  constructor(private http: HttpClient) { }

  obtenerPorcinos(): Observable<PorcinoDTO[]> {
    return this.http.get<PorcinoDTO[]>(this.apiUrl);
  }

  guardarPorcino(porcino: PorcinoDTO): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Guardar`, porcino);
  }

  actualizarPorcino(identificacion: string, porcino: PorcinoDTO): Observable<PorcinoDTO> {
    return this.http.put<PorcinoDTO>(`${this.apiUrl}/Actualizar/${identificacion}`, porcino);
  }

  eliminarPorcino(identificacion: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/Eliminar/${identificacion}`);
  }
}
