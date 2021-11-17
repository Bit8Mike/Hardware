import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHardwareComponent } from './components/add-hardware/add-hardware.component';
import { ListHardwareComponent } from './components/list-hardware/list-hardware.component';

const routes: Routes = [
  {path : '', redirectTo: 'list-hardware', pathMatch: 'full'},
  {path : 'list-hardware', component: ListHardwareComponent},
  {path : 'add-hardware', component: AddHardwareComponent},
  {path : 'edit-hardware/:id', component: AddHardwareComponent},
  {path : '**', redirectTo: 'list-hardware', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
