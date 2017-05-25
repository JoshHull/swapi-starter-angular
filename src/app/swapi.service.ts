import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SwapiData } from './swapi-data';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';


@Injectable()
export class SwapiService {
  swapiUrl = 'http://swapi.co/api/';

  constructor(private http: Http, private swapiData: SwapiData) { }

  /* We didn't want you to spend your time paging
     if you didn't want to.  So we 'Explicitly Configured' the page numbers.
     The methods here eliminate the hi level resource paging at SWAPI.
  */

  getAllFilms() {
    return this.getAllPages([
      'films/'
    ]);
  }

  getAllPeople() {
    // return Observable.from(this.swapiData.people);


    return this.getAllPages([
      'people/'
      , 'people/?page=2'
      , 'people/?page=3'
      , 'people/?page=4'
      , 'people/?page=5'
      , 'people/?page=6'
      , 'people/?page=7'
      , 'people/?page=8'
      , 'people/?page=9'
    ]);
  }

  getAllPlanets() {
    return this.getAllPages([
      'planets/'
      , 'planets/?page=2'
      , 'planets/?page=3'
      , 'planets/?page=4'
      , 'planets/?page=5'
      , 'planets/?page=6'
      , 'planets/?page=7'
    ]);
  }

  getAllSpecies() {
    return this.getAllPages([
      'species/'
      , 'species/?page=2'
      , 'species/?page=3'
      , 'species/?page=4'
    ]);
  }

  getAllStarships() {
    return this.getAllPages([
      'starships/'
      , 'starships/?page=2'
      , 'starships/?page=3'
      , 'starships/?page=4'
    ]);
  }

  getAllVehicles() {
    return this.getAllPages([
      'vehicles/'
      , 'vehicles/?page=2'
      , 'vehicles/?page=3'
      , 'vehicles/?page=4'
    ]);
  }

  private getAllPages(pages: string[]) {
    const urlArray = [];
    pages.forEach(suffix => urlArray.push(this.swapiUrl + suffix));

    const obsArray = [];
    urlArray.forEach(url => obsArray.push(this.getResultArrayForPage(url)));

    return Observable.forkJoin(obsArray).map((obsResult: [any[], any[]]) => {
      let metaResults: any[] = [];
      obsResult.forEach(results => metaResults = metaResults.concat(results));
      return metaResults;
    });
  }

  // It's kind of fun to watch what happens when you use a merge instead of a forkJoin.
  getAllPeopleMerge() {
    return Observable.merge(
      this.getResultArrayForPage(this.swapiUrl + 'people/')
      , this.getResultArrayForPage(this.swapiUrl + 'people/?page=2')
      , this.getResultArrayForPage(this.swapiUrl + 'people/?page=3')
      , this.getResultArrayForPage(this.swapiUrl + 'people/?page=4')
      , this.getResultArrayForPage(this.swapiUrl + 'people/?page=5')
      , this.getResultArrayForPage(this.swapiUrl + 'people/?page=6')
      , this.getResultArrayForPage(this.swapiUrl + 'people/?page=7')
      , this.getResultArrayForPage(this.swapiUrl + 'people/?page=8')
      , this.getResultArrayForPage(this.swapiUrl + 'people/?page=9')
    );
  }

  private makeUrlsFromSuffix(suffixes: string[]) {
    const urlArray: any[] = [];
    suffixes.forEach(suffix => urlArray.push(this.swapiUrl + suffix));
    return urlArray;
  }

  private makeObservables(pages: string[]) {
    const obsArray: any[] = [];
    pages.forEach(url => obsArray.push(this.getResultArrayForPage(url)));
    return obsArray;
  }

  private getResultArrayForPage(url: string) {
    return this.http.get(url)
      .map((response: Response) => {
        return response.json().results;
      })
      .catch(this.handleError);
  }

  getAllObjectsFor(urls: string[]) {
    const obsArray = [];
    urls.forEach(suffix => obsArray.push(this.getObjectFor(suffix)));
    return Observable.forkJoin(obsArray).map(obsResult => {
      let metaResults: any[] = [];
      metaResults = metaResults.concat(obsResult);
      return metaResults;
    });
  }

  getObjectFor(url: string) {
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('server error:', error);

    if (error instanceof Response) {
      let errMessage = '';
      try {
        errMessage = error.json().error;
      } catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Server Error!!');
  }
}
