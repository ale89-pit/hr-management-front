import { Routes } from '@angular/router';
import { CardEmployeeComponent } from './card-employee/card-employee.component';
import { DetailsEmployeeComponent } from './details-employee/details-emploee.component';
import { DashboradComponent } from './dashborad/dashborad.component';

const routes: Routes = [
    {
        path:'',
        component:DashboradComponent,
        title:'Home Page',
    },
    {
        path:'details/:id',
        component: DetailsEmployeeComponent,
        title:'Details Page',
    }
];

export default routes;