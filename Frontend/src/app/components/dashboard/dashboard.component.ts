import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { PorcinoService } from '../../services/porcino.service';
import { AlimentacionService } from '../../services/alimentacion.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h1 class="h3 mb-0">Dashboard - Granja S.A.</h1>
            <p class="text-muted">Resumen general del sistema</p>
          </div>
          <img src="assets/Ingenieria.png" alt="Logo Politécnico" class="logo-header">
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 mb-4">
          <div class="card text-white" style="background: linear-gradient(135deg, #2d5016, #4a7c59);">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h4 class="card-title">{{totalPorcinos}}</h4>
                  <p class="card-text">Total Porcinos</p>
                </div>
                <div class="align-self-center">
                  <i class="fas fa-piggy-bank fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 mb-4">
          <div class="card text-white" style="background: linear-gradient(135deg, #4a7c59, #6b9b6b);">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h4 class="card-title">{{totalClientes}}</h4>
                  <p class="card-text">Total Clientes</p>
                </div>
                <div class="align-self-center">
                  <i class="fas fa-users fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 mb-4">
          <div class="card text-white" style="background: linear-gradient(135deg, #6b9b6b, #8db38d);">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h4 class="card-title">{{totalAlimentacion}}</h4>
                  <p class="card-text">Tipos de Alimentación</p>
                </div>
                <div class="align-self-center">
                  <i class="fas fa-seedling fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 mb-4">
          <div class="card text-white" style="background: linear-gradient(135deg, #8db38d, #a8d5a8);">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h4 class="card-title">{{pesoPromedio | number:'1.2-2'}} kg</h4>
                  <p class="card-text">Peso Promedio</p>
                </div>
                <div class="align-self-center">
                  <i class="fas fa-weight fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Acciones Rápidas</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <a routerLink="/porcinos" class="btn" style="background: linear-gradient(135deg, #2d5016, #4a7c59); color: white; border: none;">
                  <i class="fas fa-plus me-2"></i>Registrar Porcino
                </a>
                <a routerLink="/clientes" class="btn" style="background: linear-gradient(135deg, #4a7c59, #6b9b6b); color: white; border: none;">
                  <i class="fas fa-user-plus me-2"></i>Registrar Cliente
                </a>
                <a routerLink="/reportes" class="btn" style="background: linear-gradient(135deg, #6b9b6b, #8db38d); color: white; border: none;">
                  <i class="fas fa-chart-bar me-2"></i>Ver Reportes
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Información del Sistema</h5>
            </div>
            <div class="card-body">
              <p><strong>Versión:</strong> 1.0.0</p>
              <p><strong>Última actualización:</strong> {{fechaActual | date:'dd/MM/yyyy'}}</p>
              <p><strong>Estado:</strong> <span class="badge bg-success">Operativo</span></p>
              <p class="mb-0"><strong>Base de datos:</strong> <span class="badge bg-info">PostgreSQL</span></p>
            </div>
          </div>
        </div>
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
    
    .badge {
      border-radius: 20px;
      padding: 8px 12px;
    }
    
    .bg-success {
      background: linear-gradient(135deg, #4a7c59, #6b9b6b) !important;
    }
    
    .bg-info {
      background: linear-gradient(135deg, #6b9b6b, #8db38d) !important;
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
export class DashboardComponent implements OnInit {
  totalPorcinos = 0;
  totalClientes = 0;
  totalAlimentacion = 0;
  pesoPromedio = 0;
  fechaActual = new Date();

  constructor(
    private clienteService: ClienteService,
    private porcinoService: PorcinoService,
    private alimentacionService: AlimentacionService
  ) { }

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (clientes) => this.totalClientes = clientes.length,
      error: (error) => console.error('Error al cargar clientes:', error)
    });

    this.porcinoService.obtenerPorcinos().subscribe({
      next: (porcinos) => {
        this.totalPorcinos = porcinos.length;
        if (porcinos.length > 0) {
          this.pesoPromedio = porcinos.reduce((sum, p) => sum + p.peso, 0) / porcinos.length;
        }
      },
      error: (error) => console.error('Error al cargar porcinos:', error)
    });

    this.alimentacionService.obtenerAlimentacion().subscribe({
      next: (alimentacion) => this.totalAlimentacion = alimentacion.length,
      error: (error) => console.error('Error al cargar alimentación:', error)
    });
  }
}
