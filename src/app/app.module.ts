import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

import { AngularFireModule } from 'angularfire2';

// Routing Module
import { AppRoutingModule } from './app.routing';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';

import { DataAccessModule } from './services/data.access.module';

export const firebaseConfig = {
    apiKey: "AIzaSyCs25dhBpwgCyow88UI8ZrhJLtsQjtbtBg",
    authDomain: "props-155904.firebaseapp.com",
    databaseURL: "https://props-155904.firebaseio.com",
    storageBucket: "props-155904.appspot.com",
    messagingSenderId: "655279945221"
};

@NgModule({
    imports: [
        BrowserModule,
	BrowserAnimationsModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        DataAccessModule // <-- probably going to want to replace this with the dbaccess service layer (module)
    ],
    declarations: [
        AppComponent,
        FullLayoutComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
