import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutComponent } from './components/auth/logout/logout.component';
import { BaseComponent } from './components/base/base.component';

import { TasksComponent } from './components/base/tasks/tasks.component';
import { ExpenseGroupsComponent } from './components/base/expense-groups/expense-groups.component';
import { BillsComponent } from './components/base/bills/bills.component';
import { MappingsComponent } from './components/base/mappings/mappings.component';
import { SettingsComponent } from './components/base/settings/settings.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { AuthComponent } from './components/auth/auth.component';

import { AuthGuard } from './components/auth/auth.guard'
import { FyleCallbackComponent } from './components/base/settings/fyle-callback/fyle-callback.component';
import { QBOCallbackComponent } from './components/base/settings/qbo-callback/qbo-callback.component';
import { CategoryComponent } from './components/base/mappings/category/category.component';
import { EmployeeComponent } from './components/base/mappings/employee/employee.component';
import { GeneralComponent } from './components/base/mappings/general/general.component';
import { ProjectComponent } from './components/base/mappings/project/project.component';
import { CostCenterComponent } from './components/base/mappings/cost-center/cost-center.component';

const authRoutes: Routes = [
  {
    path: '',
    redirectTo: '/workspaces',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'workspaces',
    pathMatch: 'full'
  },
];

const baseModuleRoutes: Routes = [
  {
    path: 'workspaces',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':workspace_id/tasks', component: TasksComponent },
      {
        path: ':workspace_id/expense_groups',
        component: ExpenseGroupsComponent,
      },
      { path: ':workspace_id/bills', component: BillsComponent },
      { 
        path: ':workspace_id/mappings', 
        component: MappingsComponent,
        children: [
          { path: 'general', component: GeneralComponent },
          { path: 'categories', component: CategoryComponent },
          { path: 'employees', component: EmployeeComponent },
          { path: 'projects', component: ProjectComponent },
          { path: 'cost_centers', component: CostCenterComponent },
        ]
      },
      { path: ':workspace_id/settings', component: SettingsComponent },
      { path: 'fyle/callback', component: FyleCallbackComponent },
      { path: 'qbo/callback', component: QBOCallbackComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(baseModuleRoutes),
    RouterModule.forRoot(authRoutes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
