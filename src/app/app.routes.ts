import { Routes } from '@angular/router';
import { CardEmployeeComponent } from './card-employee/card-employee.component';
import { DetailsComponent } from './details/details.component';
import { DashboradComponent } from './dashborad/dashborad.component';

const routes: Routes = [
    {
        path:'',
        component:DashboradComponent,
        title:'Home Page',
    },
    {
        path:'details/:id',
        component: DetailsComponent,
        title:'Details Page',
    }
];

export default routes;