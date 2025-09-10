import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../services/reporte.service';
import { ClienteService } from '../../services/cliente.service';
import { ReporteClientePorcino } from '../../models/reporte.model';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h1 class="h3 mb-0">Reportes</h1>
            <p class="text-muted">Información detallada sobre clientes y porcinos</p>
          </div>
          <img src="assets/Ingenieria.png" alt="Logo Politécnico" class="logo-header">
        </div>
      </div>

      <!-- Filtros -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Filtros de Reporte</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="tipoReporte" class="form-label">Tipo de Reporte</label>
                  <select class="form-control" id="tipoReporte" [(ngModel)]="tipoReporte" (change)="cambiarTipoReporte()">
                    <option value="todos">Todos los Clientes y Porcinos</option>
                    <option value="cliente">Por Cliente Específico</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3" *ngIf="tipoReporte === 'cliente'">
                  <label for="clienteSeleccionado" class="form-label">Cliente</label>
                  <select class="form-control" id="clienteSeleccionado" [(ngModel)]="clienteSeleccionado" (change)="filtrarPorCliente()">
                    <option value="">Seleccionar cliente</option>
                    <option *ngFor="let cliente of clientes" [value]="cliente.cedula">
                      {{cliente.nombre}} {{cliente.apellido}} - {{cliente.cedula}}
                    </option>
                  </select>
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="btn" style="background: linear-gradient(135deg, #2d5016, #4a7c59); color: white; border: none;" (click)="generarReporte()">
                  <i class="fas fa-chart-bar me-2"></i>Generar Reporte
                </button>
                <button class="btn" style="background: linear-gradient(135deg, #4a7c59, #6b9b6b); color: white; border: none;" (click)="exportarExcel()" [disabled]="reporteData.length === 0">
                  <i class="fas fa-file-excel me-2"></i>Exportar a Excel
                </button>
                <button class="btn" style="background: linear-gradient(135deg, #6b9b6b, #8db38d); color: white; border: none;" (click)="imprimirReporte()" [disabled]="reporteData.length === 0">
                  <i class="fas fa-print me-2"></i>Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estadísticas del Reporte -->
      <div class="row mb-4" *ngIf="reporteData.length > 0">
        <div class="col-md-3 mb-3">
          <div class="card text-white" style="background: linear-gradient(135deg, #2d5016, #4a7c59);">
            <div class="card-body text-center">
              <h4>{{totalClientes}}</h4>
              <p class="mb-0">Clientes</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card text-white" style="background: linear-gradient(135deg, #4a7c59, #6b9b6b);">
            <div class="card-body text-center">
              <h4>{{totalPorcinos}}</h4>
              <p class="mb-0">Porcinos</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card text-white" style="background: linear-gradient(135deg, #6b9b6b, #8db38d);">
            <div class="card-body text-center">
              <h4>{{pesoPromedio | number:'1.2-2'}} kg</h4>
              <p class="mb-0">Peso Promedio</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card text-white" style="background: linear-gradient(135deg, #8db38d, #a8d5a8);">
            <div class="card-body text-center">
              <h4>{{edadPromedio | number:'1.0-0'}} meses</h4>
              <p class="mb-0">Edad Promedio</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de Reporte -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Reporte de Clientes y Porcinos</h5>
            </div>
            <div class="card-body">
              <div *ngIf="cargando" class="text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Generando reporte...</span>
                </div>
              </div>
              <div *ngIf="!cargando && reporteData.length === 0" class="text-center text-muted">
                No hay datos para mostrar. Seleccione los filtros y genere el reporte.
              </div>
              <div *ngIf="!cargando && reporteData.length > 0" class="table-responsive">
                <table class="table table-hover table-striped" id="tablaReporte">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Cédula</th>
                      <th>Teléfono</th>
                      <th>Dirección</th>
                      <th>Porcino ID</th>
                      <th>Edad</th>
                      <th>Peso</th>
                      <th>Raza</th>
                      <th>Alimentación</th>
                      <th>Dosis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of reporteData">
                      <td>{{item.clienteNombre}} {{item.clienteApellido}}</td>
                      <td>{{item.clienteCedula}}</td>
                      <td>{{item.clienteTelefono}}</td>
                      <td>{{item.clienteDireccion}}</td>
                      <td>{{item.porcinoIdentificacion}}</td>
                      <td>{{item.porcinoEdad}} meses</td>
                      <td>{{item.porcinoPeso}} kg</td>
                      <td>{{item.razaNombre}}</td>
                      <td>{{item.alimentacionDescripcion}}</td>
                      <td>{{item.alimentacionDosis}} kg</td>
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
    
    .table-responsive {
      max-height: 600px;
      overflow-y: auto;
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
    
    @media print {
      .card-header, .btn, .form-control, .form-label, .footer {
        display: none !important;
      }
      
      .card {
        border: none !important;
        box-shadow: none !important;
      }
      
      .table {
        font-size: 12px;
      }
      
      .logo-header {
        display: none !important;
      }
    }
  `]
})
export class ReportesComponent implements OnInit {
  reporteData: ReporteClientePorcino[] = [];
  clientes: Cliente[] = [];
  
  tipoReporte = 'todos';
  clienteSeleccionado = '';
  
  totalClientes = 0;
  totalPorcinos = 0;
  pesoPromedio = 0;
  edadPromedio = 0;
  
  cargando = false;
  mensaje = '';
  error = false;

  constructor(
    private reporteService: ReporteService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
    this.generarReporte();
  }

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (error) => this.mostrarMensaje('Error al cargar clientes', true)
    });
  }

  cambiarTipoReporte(): void {
    this.clienteSeleccionado = '';
    this.reporteData = [];
  }

  filtrarPorCliente(): void {
    if (this.clienteSeleccionado) {
      this.generarReportePorCliente();
    }
  }

  generarReporte(): void {
    this.cargando = true;
    
    if (this.tipoReporte === 'todos') {
      this.reporteService.obtenerReporteClientesPorcinos().subscribe({
        next: (data) => {
          this.reporteData = data;
          this.calcularEstadisticas();
          this.cargando = false;
          this.mostrarMensaje('Reporte generado exitosamente');
        },
        error: (error) => {
          this.mostrarMensaje('Error al generar reporte', true);
          this.cargando = false;
        }
      });
    } else if (this.tipoReporte === 'cliente' && this.clienteSeleccionado) {
      this.generarReportePorCliente();
    } else {
      this.cargando = false;
      this.mostrarMensaje('Seleccione un cliente para generar el reporte', true);
    }
  }

  generarReportePorCliente(): void {
    this.cargando = true;
    this.reporteService.obtenerReportePorCliente(this.clienteSeleccionado).subscribe({
      next: (data) => {
        this.reporteData = data;
        this.calcularEstadisticas();
        this.cargando = false;
        this.mostrarMensaje('Reporte generado exitosamente');
      },
      error: (error) => {
        this.mostrarMensaje('Error al generar reporte por cliente', true);
        this.cargando = false;
      }
    });
  }

  calcularEstadisticas(): void {
    if (this.reporteData.length === 0) {
      this.totalClientes = 0;
      this.totalPorcinos = 0;
      this.pesoPromedio = 0;
      this.edadPromedio = 0;
      return;
    }

    // Clientes únicos
    const clientesUnicos = new Set(this.reporteData.map(item => item.clienteCedula));
    this.totalClientes = clientesUnicos.size;
    
    // Total porcinos
    this.totalPorcinos = this.reporteData.length;
    
    // Peso promedio
    const pesoTotal = this.reporteData.reduce((sum, item) => sum + item.porcinoPeso, 0);
    this.pesoPromedio = pesoTotal / this.totalPorcinos;
    
    // Edad promedio
    const edadTotal = this.reporteData.reduce((sum, item) => sum + item.porcinoEdad, 0);
    this.edadPromedio = edadTotal / this.totalPorcinos;
  }

  exportarExcel(): void {
    // Simulación de exportación a Excel
    const csvContent = this.convertirACSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_granja_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.mostrarMensaje('Reporte exportado exitosamente');
  }

  convertirACSV(): string {
    const headers = [
      'Cliente', 'Cédula', 'Teléfono', 'Dirección', 'Porcino ID', 
      'Edad', 'Peso', 'Raza', 'Alimentación', 'Dosis'
    ];
    
    const csvRows = [headers.join(',')];
    
    this.reporteData.forEach(item => {
      const row = [
        `"${item.clienteNombre} ${item.clienteApellido}"`,
        item.clienteCedula,
        item.clienteTelefono,
        `"${item.clienteDireccion}"`,
        item.porcinoIdentificacion,
        `${item.porcinoEdad} meses`,
        `${item.porcinoPeso} kg`,
        `"${item.razaNombre}"`,
        `"${item.alimentacionDescripcion}"`,
        `${item.alimentacionDosis} kg`
      ];
      csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
  }

  imprimirReporte(): void {
    window.print();
  }

  mostrarMensaje(mensaje: string, esError = false): void {
    this.mensaje = mensaje;
    this.error = esError;
    setTimeout(() => this.mensaje = '', 5000);
  }
}
