import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'principal', loadChildren: './pages/principal/principal.module#PrincipalPageModule' },
  { path: 'horarios', loadChildren: './pages/horarios/horarios.module#HorariosPageModule' },
  { path: 'profesores', loadChildren: './pages/profesores/profesores.module#ProfesoresPageModule' },
  { path: 'modal', loadChildren: './pages/modal/modal.module#ModalPageModule' },
  {
    path: 'pdf',
    loadChildren: () => import('./pages/pdf/pdf.module').then( m => m.PdfPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
