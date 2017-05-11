import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Sorter } from './sorter';

@Injectable()
export class SwapiService {
  swapiUrl = 'http://swapi.co/api/';

  constructor(private http: Http, private sorter: Sorter) { }

  getPeople() {
    return this.http.get(this.swapiUrl + 'people/')
               .map((response: Response) => {
                    const people = response.json().results;
                    this.sorter.sort(people, 'name');
                    return people;
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
