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
  hiddenPerson: any;

  hints: any[] = [];

  people: any[] = [];
  filterPeople: any[] = [];
  films: any[] = [];

  choiceCount = 0;
  found = false;

  constructor(private sorter: Sorter, private swapiService: SwapiService) { }

  ngOnInit() {
    this.swapiService.getAllPeople().subscribe(data => {

      this.people = this.people.concat(data);
      this.sorter.sort(this.people, 'name');

      let i = Math.round(Math.random() * this.people.length);
      this.hiddenPerson = this.people[i];

      this.hintAndFilterEyeColor();

    });
  }

  hintAndFilterFilms() {
    this.swapiService.getAllObjectsFor(this.hiddenPerson.films).subscribe(
        films => {
          films.forEach(film => this.hints.push(film.title));
        }
    );

    this.people.forEach(person => {     
        let hasFilmMatch = false;
        this.hiddenPerson.films.forEach(film => {if (person.films.indexOf(film) > 0) {hasFilmMatch = true}})
        if (hasFilmMatch) {
          this.filterPeople.push(person);
        }
    });
  }

  hintAndFilterSpecies() {
    this.swapiService.getObjectFor(this.hiddenPerson.species).subscribe(
        species => {
          this.hints.push(species.name);
        }
    );
    
    this.people.forEach(person => {     
        if (this.hiddenPerson.species == person.species) this.filterPeople.push(person);
    });
  }

  hintAndFilterEyeColor() {
    this.hints.push(this.hiddenPerson.eye_color);
        
    this.people.forEach(person => {     
        if (this.hiddenPerson.eye_color == person.eye_color) this.filterPeople.push(person);
    });


  }
 

  evaluatePersonChoice() {
    this.choiceCount++;

    if (this.hiddenPerson.name === this.selectedPerson.name) {
      this.found = true;
    } else {
      this.found = false;
      if (this.choiceCount % 2 == 0) {
        this.hintAndFilterSpecies();
      } else {
        this.hintAndFilterFilms();
      }
    }
  }
}
