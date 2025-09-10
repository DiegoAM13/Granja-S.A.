import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <div class="container-fluid">
      <!-- Sidebar -->
      <nav class="sidebar">
        <div class="sidebar-header">
          <h4><i class="fas fa-leaf"></i> Granja S.A.</h4>
          <p class="mb-0">Sistema de Gestión</p>
        </div>
        <ul class="sidebar-menu">
          <li>
            <a routerLink="/dashboard" routerLinkActive="active">
              <i class="fas fa-chart-pie"></i> Dashboard
            </a>
          </li>
          <li>
            <a routerLink="/porcinos" routerLinkActive="active">
              <i class="fas fa-piggy-bank"></i> Porcinos
            </a>
          </li>
          <li>
            <a routerLink="/clientes" routerLinkActive="active">
              <i class="fas fa-users"></i> Clientes
            </a>
          </li>
          <li>
            <a routerLink="/alimentacion" routerLinkActive="active">
              <i class="fas fa-seedling"></i> Alimentación
            </a>
          </li>
          <li>
            <a routerLink="/reportes" routerLinkActive="active">
              <i class="fas fa-chart-bar"></i> Reportes
            </a>
          </li>
        </ul>
      </nav>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    * {
      font-family: 'Poppins', sans-serif;
    }
    
    .container-fluid {
      padding: 0;
      display: flex;
      min-height: 100vh;
    }
    
    .sidebar {
      width: 250px;
      background: linear-gradient(135deg, #2d5016, #4a7c59);
      color: white;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    }
    
    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      text-align: center;
    }
    
    .sidebar-header h4 {
      margin: 0;
      font-weight: 600;
      color: #a8d5a8;
    }
    
    .sidebar-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .sidebar-menu li {
      margin: 0;
    }
    
    .sidebar-menu a {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      color: #e8f5e8;
      text-decoration: none;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }
    
    .sidebar-menu a:hover {
      background: rgba(255,255,255,0.1);
      border-left-color: #a8d5a8;
      color: white;
    }
    
    .sidebar-menu a.active {
      background: rgba(168,213,168,0.2);
      border-left-color: #a8d5a8;
      color: white;
      font-weight: 500;
    }
    
    .sidebar-menu a i {
      margin-right: 10px;
      width: 20px;
      text-align: center;
    }
    
    .main-content {
      margin-left: 250px;
      padding: 20px;
      flex: 1;
      background: #f8fdf8;
      min-height: 100vh;
    }
    
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
      
      .main-content {
        margin-left: 0;
      }
    }
  `]
})
export class AppComponent {
  title = 'granja-frontend';
}
