import { Injectable, NgModule } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { MatchCard } from '../models/match-card';

@Injectable()
export class MatchCardFirebaseApi {

    constructor(private af: AngularFire) { }

    get(): Observable<any> {
        return this.af.database.list('/matchCards');
    }

    post(matchCard: MatchCard): void {
        // TODO - catch and handle exception
        this.af.database.list('/matchCards').push(matchCard);
    }

    update(matchCard: MatchCard): void {
        this.af.database.object('/matchCards/' + matchCard.id).update(matchCard);
    }

    // todo - below here should be removed when not needed as reference anymore
    //private matchCardUrl = 'api/matchCards';
    //private headers = new Headers({ 'Content-Type': 'application/json' });
    //private database = null;
    //items: FirebaseListObservable<any[]>;

    //private handleError(error: any): Promise<any> {
    //    console.error('An error occured', error);
    //    return Promise.reject(error.message || error);
    //}

    //getMatchCards(): Observable<any> {
    //    return this.af.database.list('/matchCards');
    //}
}
