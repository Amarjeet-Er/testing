// app.component.ts
import { Component } from '@angular/core';
import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hide = true;

  locationDetails: any = {};

  constructor(private locationService: LocationService) {}

  async ngOnInit() {
    try {
      const coordinates = await this.locationService.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lon = coordinates.coords.longitude;
      console.log(lat, lon, 'number any');
      
      const response: any = await this.locationService.getCityName(lat, lon);
      console.log(response);

      this.locationDetails = {
        pinCode: response.address.postcode || 'N/A',
        village: response.address.hamlet || response.address.military || response.address.street || 'N/A',
        block: response.address.county || 'N/A',
        state: response.address.state || 'N/A',
        district: response.address.state_district || response.address.city_district || 'N/A',
        country: response.address.country || 'N/A',
      };
      console.log(this.locationDetails);
    } catch (error) {
      console.error('Error getting location', error);
      this.locationDetails = {
        pinCode: 'Error',
        village: 'Error',
        block: 'Error',
        state: 'Error',
        district: 'Error',
        country: 'Error',
      };
    }
  }
}
