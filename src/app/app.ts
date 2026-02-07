import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, OnInit } from '@angular/core';
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
export interface Department {
  departmentId: number;
  departmentName: string;
}

export interface Designation {
  designationId: number;
  departmentId: number;
  designationName: string;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  http = inject(HttpClient);
  selectedState: string = '';
  filteredCity: City[] = [];

  ngOnInit() {
    this.getAllDepartment();
  }

  departmentList = signal<Department[]>([]);
  designationList = signal<Designation[]>([]);

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

  getAllDepartment() {
    this.http.get('https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments').subscribe({
      next: (res: any) => {
        this.departmentList.set(res);
      },
    });
  }

  getDesignationByDeptId(event: any) {
    debugger;
    const deptId = event.target.value;
    this.http
      .get(
        'https://api.freeprojectapi.com/api/EmployeeApp/GetDesignationsByDeptId?deptId=' + deptId,
      )
      .subscribe({
        next: (res: any) => {
          this.designationList.set(res);
        },
      });
  }
}
