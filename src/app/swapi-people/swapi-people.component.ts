import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-swapi-people',
  templateUrl: './swapi-people.component.html',
  styleUrls: ['./swapi-people.component.css']
})
export class SwapiPeopleComponent implements OnInit {

  characters: any[];
  selectedPerson: any;

  constructor(private swapiService: SwapiService) { }

  ngOnInit() {
    this.swapiService.getPeople().subscribe(people => this.characters = people);
  }

}
