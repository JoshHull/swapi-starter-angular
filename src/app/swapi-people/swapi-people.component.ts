import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { Sorter } from '../sorter';

@Component({
  selector: 'app-swapi-people',
  templateUrl: './swapi-people.component.html',
  styleUrls: ['./swapi-people.component.css']
})

export class SwapiPeopleComponent implements OnInit {

  allCharacters: any[] = [];
  randomlyChosenPerson: any;

  hints: any[] = [];
  peopleThatMatchTheHints: any[] = [];

  guessedCharacter: any;
  numberOfGuesses = 0;
  correctGuess = false;

  constructor(private sorter: Sorter, private swapiService: SwapiService) { }

  ngOnInit() {
    this.swapiService.getAllPeople().subscribe(data => {

      this.allCharacters = this.allCharacters.concat(data);
      this.sorter.sort(this.allCharacters, 'name');

      this.setUpGame();

    });
  }

  setUpGame() {
      const i: number = Math.round(Math.random() * this.allCharacters.length);
      this.randomlyChosenPerson = this.allCharacters[i];

      this.hintAndFilterEyeColor();
  }

  hintAndFilterFilms() {
    this.swapiService.getAllObjectsFor(this.randomlyChosenPerson.films).subscribe(
        films => {
          films.forEach(film => this.hints.push(film.title));
        }
    );

    this.allCharacters.forEach(person => {
        let hasFilmMatch = false;
        this.randomlyChosenPerson.films.forEach(film => { if (person.films.indexOf(film) > 0) { hasFilmMatch = true; } } );
        if (hasFilmMatch) {
          this.peopleThatMatchTheHints.push(person);
        }
    });
  }

  hintAndFilterSpecies() {
    this.swapiService.getObjectFor(this.randomlyChosenPerson.species).subscribe(
        species => {
          this.hints.push(species.name);
        }
    );

    this.allCharacters.forEach(person => {
        if (this.randomlyChosenPerson.species === person.species) {
          this.peopleThatMatchTheHints.push(person);
        }
    });
  }

  hintAndFilterEyeColor() {
    this.hints.push(this.randomlyChosenPerson.eye_color);

    this.allCharacters.forEach(person => {
        if (this.randomlyChosenPerson.eye_color === person.eye_color) {
          this.peopleThatMatchTheHints.push(person);
        }
    });
  }

  evaluateCharacterGuess() {
    this.numberOfGuesses++;

    if (this.randomlyChosenPerson.name === this.guessedCharacter.name) {
      this.correctGuess = true;
    } else {
      this.correctGuess = false;
      if (this.numberOfGuesses % 2 === 0) {
        this.hintAndFilterSpecies();
      } else {
        this.hintAndFilterFilms();
      }
    }
  }
}
