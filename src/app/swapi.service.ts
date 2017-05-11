import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Sorter } from './sorter';

@Injectable()
export class SwapiService {
  url = 'http://swapi.co/api/';

  // *** TODO: Inject the Http and Sorter services into the constructor 
  // ***       (name the parameters "http" and "sorter" and make them private)
  constructor(private http: Http, private sorter: Sorter) { }

  getPeople() {
    // *** TODO: Use the Http get() function to retrieve films 
    // ***       (see the README for the code to use here)
    return this.http.get(this.url + 'people')
               .map((response: Response) => {
                    const films = response.json().results;
                    this.sorter.sort(films, 'name');
                    return films;
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
