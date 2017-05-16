import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { Sorter } from '../sorter';

@Component({
  selector: 'app-swapi-people',
  templateUrl: './swapi-people.component.html',
  styleUrls: ['./swapi-people.component.css']
})

export class SwapiPeopleComponent implements OnInit {

  userClimate: string;
  selectedPerson: any;

  people: any[] = [];
  films: any[] = [];

  constructor(private sorter: Sorter, private swapiService: SwapiService) { }

  ngOnInit() {
    this.swapiService.getAllPeople().subscribe(data => {
      this.people = this.people.concat(data);
      this.sorter.sort(this.people, 'name');
    });
  }

  evaluatePersonChoice() {
    console.log(this.selectedPerson.films);
    this.films = [];
    this.swapiService.getAllObjectsFor(this.selectedPerson.films).subscribe(
      films => this.films = this.films.concat(films)
    );
  }
}
