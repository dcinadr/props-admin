import { NgModule } from '@angular/core';

import { MatchCardFirebaseApi } from './api.firebase.match-card';

@NgModule({
    providers: [MatchCardFirebaseApi]
})
// internal service for accessing firebase
export class FirebaseApiModule {}