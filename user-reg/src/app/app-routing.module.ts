import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ShowDataComponent } from './show-data/show-data.component';

const routes: Routes = [
  {path:'',component:RegistrationComponent},
  {path:'show',component:ShowDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
