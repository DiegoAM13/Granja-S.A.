import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h1 class="h3 mb-0">Gestión de Clientes</h1>
            <p class="text-muted">Administra la información de los clientes</p>
          </div>
          <img src="assets/Ingenieria.png" alt="Logo Politécnico" class="logo-header">
        </div>
      </div>

      <!-- Formulario -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">{{editando ? 'Editar' : 'Registrar'}} Cliente</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="guardarCliente()" #clienteForm="ngForm">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="cedula" class="form-label">Cédula</label>
                    <input type="text" class="form-control" id="cedula" 
                           [(ngModel)]="cliente.cedula" name="cedula" 
                           [readonly]="editando" required maxlength="10">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" 
                           [(ngModel)]="cliente.nombre" name="nombre" required maxlength="50">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="apellido" class="form-label">Apellido</label>
                    <input type="text" class="form-control" id="apellido" 
                           [(ngModel)]="cliente.apellido" name="apellido" required maxlength="50">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input type="text" class="form-control" id="telefono" 
                           [(ngModel)]="cliente.telefono" name="telefono" required maxlength="15">
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 mb-3">
                    <label for="direccion" class="form-label">Dirección</label>
                    <input type="text" class="form-control" id="direccion" 
                           [(ngModel)]="cliente.direccion" name="direccion" required maxlength="50">
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn" style="background: linear-gradient(135deg, #2d5016, #4a7c59); color: white; border: none;" [disabled]="!clienteForm.form.valid">
                    <i class="fas fa-save me-2"></i>{{editando ? 'Actualizar' : 'Guardar'}}
                  </button>
                  <button type="button" class="btn" style="background: linear-gradient(135deg, #6c757d, #868e96); color: white; border: none;" (click)="cancelarEdicion()">
                    <i class="fas fa-times me-2"></i>Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de Clientes -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Lista de Clientes</h5>
            </div>
            <div class="card-body">
              <div *ngIf="cargando" class="text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
              </div>
              <div *ngIf="!cargando && clientes.length === 0" class="text-center text-muted">
                No hay clientes registrados
              </div>
              <div *ngIf="!cargando && clientes.length > 0" class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Cédula</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Teléfono</th>
                      <th>Dirección</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let cliente of clientes">
                      <td>{{cliente.cedula}}</td>
                      <td>{{cliente.nombre}}</td>
                      <td>{{cliente.apellido}}</td>
                      <td>{{cliente.telefono}}</td>
                      <td>{{cliente.direccion}}</td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-sm" style="background: linear-gradient(135deg, #6b9b6b, #8db38d); color: white; border: none;" (click)="editarCliente(cliente)">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-sm" style="background: linear-gradient(135deg, #dc3545, #c82333); color: white; border: none;" (click)="eliminarCliente(cliente.cedula)">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alertas -->
      <div *ngIf="mensaje" class="alert" [ngClass]="{'alert-success': !error, 'alert-danger': error}" 
           role="alert">
        {{mensaje}}
      </div>

      <!-- Footer -->
      <footer class="footer mt-5">
        <div class="footer-content">
          <p class="footer-year">2025 - Politécnico Colombiano Jaime Isaza Cadavid</p>
          <p class="footer-developers">
            Desarrollado por: 
            <a href="https://github.com/DiegoAM13" target="_blank" class="footer-link">Diego Mejía</a> y 
            <a href="https://github.com/EstivenUribe" target="_blank" class="footer-link">Rafael Uribe</a>
          </p>
          <p class="footer-professor">
            Profesor: <a href="https://github.com/hrecaman" target="_blank" class="footer-link">Hernando Recamán Chaux</a>
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    * {
      font-family: 'Poppins', sans-serif;
    }
    
    .card {
      border: none;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .card-header {
      background: linear-gradient(135deg, #f8fdf8, #e8f5e8);
      border-bottom: 1px solid #d4edda;
      border-radius: 15px 15px 0 0 !important;
    }
    
    .btn {
      border-radius: 10px;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    .btn:disabled {
      opacity: 0.6;
      transform: none !important;
    }
    
    .form-control {
      border-radius: 10px;
      border: 2px solid #e8f5e8;
      transition: border-color 0.3s ease;
    }
    
    .form-control:focus {
      border-color: #4a7c59;
      box-shadow: 0 0 0 0.2rem rgba(74, 124, 89, 0.25);
    }
    
    .table {
      border-radius: 10px;
      overflow: hidden;
    }
    
    .table thead th {
      background: linear-gradient(135deg, #2d5016, #4a7c59);
      color: white;
      border: none;
      font-weight: 600;
    }
    
    .table tbody tr:hover {
      background-color: #f8fdf8;
    }
    
    .alert-success {
      background: linear-gradient(135deg, #d4edda, #c3e6cb);
      border-color: #4a7c59;
      color: #2d5016;
    }
    
    .alert-danger {
      background: linear-gradient(135deg, #f8d7da, #f5c6cb);
      border-color: #dc3545;
      color: #721c24;
    }
    
    .logo-header {
      height: 60px;
      width: auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .logo-header:hover {
      transform: scale(1.05);
    }
    
    .footer {
      background: linear-gradient(135deg, #2d5016, #4a7c59);
      color: white;
      padding: 20px 0;
      border-radius: 15px 15px 0 0;
      margin-top: 3rem;
    }
    
    .footer-content {
      text-align: center;
    }
    
    .footer-year {
      font-size: 0.85rem;
      margin-bottom: 8px;
      color: #e8f5e8;
    }
    
    .footer-developers {
      font-size: 0.8rem;
      margin-bottom: 6px;
      color: #d4edda;
    }
    
    .footer-professor {
      font-size: 0.8rem;
      margin-bottom: 0;
      color: #d4edda;
    }
    
    .footer-link {
      color: #a8d5a8;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .footer-link:hover {
      color: white;
      text-decoration: underline;
    }
  `]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  
  cliente: Cliente = {
    cedula: '',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: ''
  };

  editando = false;
  cargando = false;
  mensaje = '';
  error = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: (error) => {
        this.mostrarMensaje('Error al cargar clientes', true);
        this.cargando = false;
      }
    });
  }

  guardarCliente(): void {
    if (this.editando) {
      this.clienteService.actualizarCliente(this.cliente.cedula, this.cliente).subscribe({
        next: (response) => {
          this.mostrarMensaje('Cliente actualizado exitosamente');
          this.cancelarEdicion();
          this.cargarClientes();
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          // Si el error es 200, 201 (éxito pero mal manejado), mostrar éxito
          if (error.status === 200 || error.status === 201 || error.status === 0) {
            this.mostrarMensaje('Cliente actualizado exitosamente');
            this.cancelarEdicion();
            this.cargarClientes();
          } else {
            this.mostrarMensaje('Error al actualizar cliente: ' + (error.error || error.message), true);
          }
        }
      });
    } else {
      this.clienteService.guardarCliente(this.cliente).subscribe({
        next: (response) => {
          this.mostrarMensaje('Cliente registrado exitosamente');
          this.limpiarFormulario();
          this.cargarClientes();
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          // Si el error es 200, 201 (éxito pero mal manejado), mostrar éxito
          if (error.status === 200 || error.status === 201 || error.status === 0) {
            this.mostrarMensaje('Cliente registrado exitosamente');
            this.limpiarFormulario();
            this.cargarClientes();
          } else {
            this.mostrarMensaje('Error al registrar cliente: ' + (error.error || error.message), true);
          }
        }
      });
    }
  }

  editarCliente(cliente: Cliente): void {
    this.cliente = { ...cliente };
    this.editando = true;
  }

  eliminarCliente(cedula: string): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(cedula).subscribe({
        next: () => {
          this.mostrarMensaje('Cliente eliminado exitosamente');
          this.cargarClientes();
        },
        error: (error) => this.mostrarMensaje('Error al eliminar cliente', true)
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.cliente = {
      cedula: '',
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: ''
    };
  }

  mostrarMensaje(mensaje: string, esError = false): void {
    this.mensaje = mensaje;
    this.error = esError;
    setTimeout(() => this.mensaje = '', 5000);
  }
}
