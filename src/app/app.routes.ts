import { Routes } from '@angular/router';
import { CardEmployeeComponent } from './card-employee/card-employee.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    {
        path:'',
        component:CardEmployeeComponent,
        title:'Home Page',
    },
    {
        path:'details/:id',
        component: DetailsComponent,
        title:'Details Page',
    }
];

export default routes;