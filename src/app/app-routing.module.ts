import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';

const appRoutes: Routes = [
  { path: 'demo', component: DemoComponent },
 
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  { path: '**',redirectTo: '', component: DemoComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
