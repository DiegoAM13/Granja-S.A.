import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteClientePorcino } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:8080/Reportes';

  constructor(private http: HttpClient) { }

  obtenerReporteClientesPorcinos(): Observable<ReporteClientePorcino[]> {
    return this.http.get<ReporteClientePorcino[]>(`${this.apiUrl}/clientes-porcinos`);
  }

  obtenerReportePorCliente(cedula: string): Observable<ReporteClientePorcino[]> {
    return this.http.get<ReporteClientePorcino[]>(`${this.apiUrl}/clientes-porcinos/${cedula}`);
  }
}
