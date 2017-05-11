import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapiPeopleComponent } from './swapi-people.component';

describe('SwapiPeopleComponent', () => {
  let component: SwapiPeopleComponent;
  let fixture: ComponentFixture<SwapiPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapiPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapiPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
