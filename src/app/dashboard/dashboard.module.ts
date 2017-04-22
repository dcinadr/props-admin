import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

// ngx-bootstrap
import { ModalModule } from 'ng2-bootstrap/modal';

@NgModule({
    imports: [
        DashboardRoutingModule,
        ChartsModule,
        ModalModule.forRoot(),
        CommonModule,
        FormsModule        
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
