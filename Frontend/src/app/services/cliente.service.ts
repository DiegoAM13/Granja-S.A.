import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/Clientes';

  constructor(private http: HttpClient) { }

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  guardarCliente(cliente: Cliente): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Guardar`, cliente);
  }

  actualizarCliente(cedula: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/Actualizar/${cedula}`, cliente);
  }

  eliminarCliente(cedula: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/Eliminar/${cedula}`);
  }
}
