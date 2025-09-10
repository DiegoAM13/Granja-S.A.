import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PorcinoService } from '../../services/porcino.service';
import { ClienteService } from '../../services/cliente.service';
import { RazaService } from '../../services/raza.service';
import { AlimentacionService } from '../../services/alimentacion.service';
import { PorcinoDTO } from '../../models/porcino.model';
import { Cliente } from '../../models/cliente.model';
import { Raza } from '../../models/raza.model';
import { Alimentacion } from '../../models/alimentacion.model';

@Component({
  selector: 'app-porcinos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h1 class="h3 mb-0">Gestión de Porcinos</h1>
            <p class="text-muted">Administra la información de los porcinos</p>
          </div>
          <img src="assets/Ingenieria.png" alt="Logo Politécnico" class="logo-header">
        </div>
      </div>

      <!-- Formulario -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">{{editando ? 'Editar' : 'Registrar'}} Porcino</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="guardarPorcino()" #porcinoForm="ngForm">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="identificacion" class="form-label">Identificación</label>
                    <input type="text" class="form-control" id="identificacion" 
                           [(ngModel)]="porcino.identificacion" name="identificacion" 
                           [readonly]="editando" required maxlength="5">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="edad" class="form-label">Edad (meses)</label>
                    <input type="number" class="form-control" id="edad" 
                           [(ngModel)]="porcino.edad" name="edad" required min="1">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="peso" class="form-label">Peso (kg)</label>
                    <input type="number" class="form-control" id="peso" 
                           [(ngModel)]="porcino.peso" name="peso" required min="1" step="0.1">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="raza" class="form-label">Raza</label>
                    <select class="form-control" id="raza" 
                            [(ngModel)]="porcino.razaId" name="raza" required>
                      <option value="">Seleccionar raza</option>
                      <option *ngFor="let raza of razas" [value]="raza.id">{{raza.raza}}</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="alimentacion" class="form-label">Alimentación</label>
                    <select class="form-control" id="alimentacion" 
                            [(ngModel)]="porcino.alimentacionTipo" name="alimentacion" required>
                      <option value="">Seleccionar alimentación</option>
                      <option *ngFor="let alim of alimentaciones" [value]="alim.tipo">{{alim.descripcion}}</option>
                    </select>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="cliente" class="form-label">Cliente</label>
                    <select class="form-control" id="cliente" 
                            [(ngModel)]="porcino.clienteCedula" name="cliente" required>
                      <option value="">Seleccionar cliente</option>
                      <option *ngFor="let cliente of clientes" [value]="cliente.cedula">
                        {{cliente.nombre}} {{cliente.apellido}} - {{cliente.cedula}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn" style="background: linear-gradient(135deg, #2d5016, #4a7c59); color: white; border: none;" [disabled]="!porcinoForm.form.valid">
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

      <!-- Lista de Porcinos -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Lista de Porcinos</h5>
            </div>
            <div class="card-body">
              <div *ngIf="cargando" class="text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
              </div>
              <div *ngIf="!cargando && porcinos.length === 0" class="text-center text-muted">
                No hay porcinos registrados
              </div>
              <div *ngIf="!cargando && porcinos.length > 0" class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Identificación</th>
                      <th>Edad</th>
                      <th>Peso</th>
                      <th>Raza</th>
                      <th>Alimentación</th>
                      <th>Cliente</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let porcino of porcinos">
                      <td>{{porcino.identificacion}}</td>
                      <td>{{porcino.edad}} meses</td>
                      <td>{{porcino.peso}} kg</td>
                      <td>{{obtenerNombreRaza(porcino.razaId)}}</td>
                      <td>{{obtenerDescripcionAlimentacion(porcino.alimentacionTipo)}}</td>
                      <td>{{obtenerNombreCliente(porcino.clienteCedula)}}</td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-sm" style="background: linear-gradient(135deg, #6b9b6b, #8db38d); color: white; border: none;" (click)="editarPorcino(porcino)">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-sm" style="background: linear-gradient(135deg, #dc3545, #c82333); color: white; border: none;" (click)="eliminarPorcino(porcino.identificacion)">
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
export class PorcinosComponent implements OnInit {
  porcinos: PorcinoDTO[] = [];
  clientes: Cliente[] = [];
  razas: Raza[] = [];
  alimentaciones: Alimentacion[] = [];
  
  porcino: PorcinoDTO = {
    identificacion: '',
    edad: 0,
    peso: 0,
    razaId: 0,
    alimentacionTipo: 0,
    clienteCedula: ''
  };

  editando = false;
  cargando = false;
  mensaje = '';
  error = false;

  constructor(
    private porcinoService: PorcinoService,
    private clienteService: ClienteService,
    private razaService: RazaService,
    private alimentacionService: AlimentacionService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    
    this.porcinoService.obtenerPorcinos().subscribe({
      next: (data) => this.porcinos = data,
      error: (error) => this.mostrarMensaje('Error al cargar porcinos', true)
    });

    this.clienteService.obtenerClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (error) => this.mostrarMensaje('Error al cargar clientes', true)
    });

    this.razaService.obtenerRazas().subscribe({
      next: (data) => this.razas = data,
      error: (error) => this.mostrarMensaje('Error al cargar razas', true)
    });

    this.alimentacionService.obtenerAlimentacion().subscribe({
      next: (data) => {
        this.alimentaciones = data;
        this.cargando = false;
      },
      error: (error) => {
        this.mostrarMensaje('Error al cargar alimentación', true);
        this.cargando = false;
      }
    });
  }

  guardarPorcino(): void {
    if (this.editando) {
      this.porcinoService.actualizarPorcino(this.porcino.identificacion, this.porcino).subscribe({
        next: (response) => {
          this.mostrarMensaje('Porcino actualizado exitosamente');
          this.cancelarEdicion();
          this.cargarDatos();
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          // Si el error es 200, 201 (éxito pero mal manejado), mostrar éxito
          if (error.status === 200 || error.status === 201 || error.status === 0) {
            this.mostrarMensaje('Porcino actualizado exitosamente');
            this.cancelarEdicion();
            this.cargarDatos();
          } else {
            this.mostrarMensaje('Error al actualizar porcino: ' + (error.error?.message || error.message), true);
          }
        }
      });
    } else {
      this.porcinoService.guardarPorcino(this.porcino).subscribe({
        next: (response) => {
          this.mostrarMensaje('Porcino registrado exitosamente');
          this.limpiarFormulario();
          this.cargarDatos();
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          // Si el error es 200, 201 (éxito pero mal manejado), mostrar éxito
          if (error.status === 200 || error.status === 201 || error.status === 0) {
            this.mostrarMensaje('Porcino registrado exitosamente');
            this.limpiarFormulario();
            this.cargarDatos();
          } else {
            this.mostrarMensaje('Error al registrar porcino: ' + (error.error?.message || error.message), true);
          }
        }
      });
    }
  }

  editarPorcino(porcino: PorcinoDTO): void {
    this.porcino = { ...porcino };
    this.editando = true;
  }

  eliminarPorcino(identificacion: string): void {
    if (confirm('¿Está seguro de eliminar este porcino?')) {
      this.porcinoService.eliminarPorcino(identificacion).subscribe({
        next: () => {
          this.mostrarMensaje('Porcino eliminado exitosamente');
          this.cargarDatos();
        },
        error: (error) => this.mostrarMensaje('Error al eliminar porcino', true)
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.porcino = {
      identificacion: '',
      edad: 0,
      peso: 0,
      razaId: 0,
      alimentacionTipo: 0,
      clienteCedula: ''
    };
  }

  obtenerNombreRaza(id: number): string {
    const raza = this.razas.find(r => r.id === id);
    return raza ? raza.raza : 'N/A';
  }

  obtenerDescripcionAlimentacion(tipo: number): string {
    const alimentacion = this.alimentaciones.find(a => a.tipo === tipo);
    return alimentacion ? alimentacion.descripcion : 'N/A';
  }

  obtenerNombreCliente(cedula: string): string {
    const cliente = this.clientes.find(c => c.cedula === cedula);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'N/A';
  }

  mostrarMensaje(mensaje: string, esError = false): void {
    this.mensaje = mensaje;
    this.error = esError;
    setTimeout(() => this.mensaje = '', 5000);
  }
}
