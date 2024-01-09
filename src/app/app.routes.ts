import { Routes } from '@angular/router';
import { CardEmployeeComponent } from './card-employee/card-employee.component';
import { DetailsEmployeeComponent } from './details-employee/details-emploee.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import{ PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    },
    {
        path: '**/:error',
        component: PageNotFoundComponent,
        title:'Error Page',
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        title:'Page Not Found',
    }
];

export default routes;