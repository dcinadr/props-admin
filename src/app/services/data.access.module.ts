import { NgModule } from '@angular/core';

import { DataAccessService } from './data.access.service';
import { FirebaseApiModule } from '../api/api.firebase.module';

@NgModule({
    imports: [FirebaseApiModule],
    providers: [DataAccessService]
})
// internal service for accessing firebase
export class DataAccessModule { }