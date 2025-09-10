import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlimentacionService } from '../../services/alimentacion.service';
import { Alimentacion } from '../../models/alimentacion.model';

@Component({
  selector: 'app-alimentacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h1 class="h3 mb-0">Gestión de Alimentación</h1>
            <p class="text-muted">Administra los tipos de alimentación para porcinos</p>
          </div>
          <img src="assets/Ingenieria.png" alt="Logo Politécnico" class="logo-header">
        </div>
      </div>

      <!-- Formulario -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">{{editando ? 'Editar' : 'Registrar'}} Alimentación</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="guardarAlimentacion()" #alimentacionForm="ngForm">
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label for="tipo" class="form-label">Tipo</label>
                    <input type="number" class="form-control" id="tipo" 
                           [(ngModel)]="alimentacion.tipo" name="tipo" 
                           [readonly]="editando" required min="1" max="99">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="dosis" class="form-label">Dosis (kg)</label>
                    <input type="number" class="form-control" id="dosis" 
                           [(ngModel)]="alimentacion.dosis" name="dosis" required min="0.1" step="0.1">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <input type="text" class="form-control" id="descripcion" 
                           [(ngModel)]="alimentacion.descripcion" name="descripcion" required maxlength="100">
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn" style="background: linear-gradient(135deg, #2d5016, #4a7c59); color: white; border: none;" [disabled]="!alimentacionForm.form.valid">
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

      <!-- Lista de Alimentación -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Lista de Alimentación</h5>
            </div>
            <div class="card-body">
              <div *ngIf="cargando" class="text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
              </div>
              <div *ngIf="!cargando && alimentaciones.length === 0" class="text-center text-muted">
                No hay tipos de alimentación registrados
              </div>
              <div *ngIf="!cargando && alimentaciones.length > 0" class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Descripción</th>
                      <th>Dosis (kg)</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let alimentacion of alimentaciones">
                      <td>{{alimentacion.tipo}}</td>
                      <td>{{alimentacion.descripcion}}</td>
                      <td>{{alimentacion.dosis}}</td>
                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-sm" style="background: linear-gradient(135deg, #6b9b6b, #8db38d); color: white; border: none;" (click)="editarAlimentacion(alimentacion)">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-sm" style="background: linear-gradient(135deg, #dc3545, #c82333); color: white; border: none;" (click)="eliminarAlimentacion(alimentacion.tipo)">
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
export class AlimentacionComponent implements OnInit {
  alimentaciones: Alimentacion[] = [];
  
  alimentacion: Alimentacion = {
    tipo: 0,
    descripcion: '',
    dosis: 0
  };

  editando = false;
  cargando = false;
  mensaje = '';
  error = false;

  constructor(private alimentacionService: AlimentacionService) { }

  ngOnInit(): void {
    this.cargarAlimentaciones();
  }

  cargarAlimentaciones(): void {
    this.cargando = true;
    this.alimentacionService.obtenerAlimentacion().subscribe({
      next: (data) => {
        this.alimentaciones = data;
        this.cargando = false;
      },
      error: (error) => {
        this.mostrarMensaje('Error al cargar alimentaciones', true);
        this.cargando = false;
      }
    });
  }

  guardarAlimentacion(): void {
    if (this.editando) {
      this.alimentacionService.actualizarAlimentacion(this.alimentacion.tipo, this.alimentacion).subscribe({
        next: (response) => {
          this.mostrarMensaje('Alimentación actualizada exitosamente');
          this.cancelarEdicion();
          this.cargarAlimentaciones();
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          // Si el error es 200, 201 (éxito pero mal manejado), mostrar éxito
          if (error.status === 200 || error.status === 201 || error.status === 0) {
            this.mostrarMensaje('Alimentación actualizada exitosamente');
            this.cancelarEdicion();
            this.cargarAlimentaciones();
          } else {
            this.mostrarMensaje('Error al actualizar alimentación: ' + (error.error || error.message), true);
          }
        }
      });
    } else {
      this.alimentacionService.guardarAlimentacion(this.alimentacion).subscribe({
        next: (response) => {
          this.mostrarMensaje('Alimentación registrada exitosamente');
          this.limpiarFormulario();
          this.cargarAlimentaciones();
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          // Si el error es 200, 201 (éxito pero mal manejado), mostrar éxito
          if (error.status === 200 || error.status === 201 || error.status === 0) {
            this.mostrarMensaje('Alimentación registrada exitosamente');
            this.limpiarFormulario();
            this.cargarAlimentaciones();
          } else {
            this.mostrarMensaje('Error al registrar alimentación: ' + (error.error || error.message), true);
          }
        }
      });
    }
  }

  editarAlimentacion(alimentacion: Alimentacion): void {
    this.alimentacion = { ...alimentacion };
    this.editando = true;
  }

  eliminarAlimentacion(tipo: number): void {
    if (confirm('¿Está seguro de eliminar este tipo de alimentación?')) {
      this.alimentacionService.eliminarAlimentacion(tipo).subscribe({
        next: () => {
          this.mostrarMensaje('Alimentación eliminada exitosamente');
          this.cargarAlimentaciones();
        },
        error: (error) => this.mostrarMensaje('Error al eliminar alimentación', true)
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.alimentacion = {
      tipo: 0,
      descripcion: '',
      dosis: 0
    };
  }

  mostrarMensaje(mensaje: string, esError = false): void {
    this.mensaje = mensaje;
    this.error = esError;
    setTimeout(() => this.mensaje = '', 5000);
  }
}
