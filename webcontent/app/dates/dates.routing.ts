import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateChooserComponent } from './date-chooser.component';
import { PrimaryOutletComponent } from '../core/components/primary-outlet.component';

const datesRoutes: Routes = [
  { path: '', component: PrimaryOutletComponent, children: [
    {path: 'dates', data: {breadcrumb: "Dates"}, component: DateChooserComponent },
  ]},
];

export const datesRoutingProviders: any[] = [];

export const datesRouting: ModuleWithProviders = RouterModule.forChild(datesRoutes);
