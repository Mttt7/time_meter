import { Component } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import { Calendar } from '../../models/calendar';

@Component({
  selector: 'app-active-calendars',
  templateUrl: './active-calendars.component.html',
  styleUrl: './active-calendars.component.scss'
})
export class ActiveCalendarsComponent {

  activeCalendars: Calendar[] = [];
  allCalendars: Calendar[] = [];

  stateOptions: any[] = [{ label: 'Active', value: 'active' }, { label: 'All', value: 'all' }];
  value: string = 'active';

  constructor(private googleService: GoogleCalendarService) { }

  ngOnInit(): void {
    this.getAllCalendars();
    this.getActiveCalendars();
  }

  getAllCalendars() {
    this.googleService.getAllCalendars().subscribe((res) => {
      console.log(res)
      this.allCalendars = res;
    })
  }
  getActiveCalendars() {
    this.googleService.getActiveCalendars().subscribe((res) => {
      console.log(res)
      this.activeCalendars = res;
    })
  }

  reloadCalendars() {
    this.googleService.populateCalendars();
    this.getActiveCalendars();
    this.getAllCalendars();
  }
}
