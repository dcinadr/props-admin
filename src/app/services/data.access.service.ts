import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MatchCardFirebaseApi } from '../api/api.firebase.match-card';
import { MatchCard } from '../models/match-card';

@Injectable()
export class DataAccessService {

    constructor(private matchCardApi: MatchCardFirebaseApi) { }

    // todo - think about changing it from Observable<any> to Observable<MatchCard>
    getAllMatchCards(): Observable<any> {
        return this.matchCardApi.get(); // <-- does there need to be more to this?
    }

    addNewMatchCard(matchCard: MatchCard): void {
        // TODO - catch and handle exception
        this.matchCardApi.post(matchCard);
    }

    updateMatchCard(matchCard: MatchCard): void {
        this.matchCardApi.update(matchCard);
    }
}