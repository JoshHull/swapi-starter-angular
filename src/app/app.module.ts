import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SwapiPeopleComponent } from './swapi-people/swapi-people.component';
import { SwapiService } from './swapi.service';
import { Sorter } from './sorter';

@NgModule({
  declarations: [
    AppComponent,
    SwapiPeopleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SwapiService, Sorter],
  bootstrap: [AppComponent]
})

export class AppModule { }
