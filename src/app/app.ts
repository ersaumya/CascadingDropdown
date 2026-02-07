import { Component, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
export interface State {
  stateId: string;
  stateName: string;
}
export interface City {
  cityId: string;
  stateId: string;
  cityName: string;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('dependent-dropdown');
  selectedState: string = '';
  filteredCity: City[] = [];
  stateData: State[] = [
    { stateId: '1', stateName: 'Maharashtra' },
    { stateId: '2', stateName: 'Gujarat' },
    { stateId: '3', stateName: 'Rajasthan' },
    { stateId: '4', stateName: 'Punjab' },
  ];

  cityDate: City[] = [
    { cityId: '1', stateId: '1', cityName: 'Mumbai' },
    { cityId: '2', stateId: '1', cityName: 'Pune' },
    { cityId: '3', stateId: '2', cityName: 'Ahmedabad' },
    { cityId: '4', stateId: '2', cityName: 'Surat' },
    { cityId: '5', stateId: '3', cityName: 'Jaipur' },
    { cityId: '6', stateId: '3', cityName: 'Jodhpur' },
    { cityId: '7', stateId: '4', cityName: 'Amritsar' },
    { cityId: '8', stateId: '4', cityName: 'Ludhiana' },
  ];

  onStateChange() {
    this.filteredCity = this.cityDate.filter((city) => city.stateId == this.selectedState);
  }
}
