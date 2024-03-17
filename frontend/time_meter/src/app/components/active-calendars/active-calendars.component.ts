import { Component } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import { Calendar } from '../../models/calendar';
import { AuthService } from '../../services/auth.service';

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

  constructor(private googleService: GoogleCalendarService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isUserLogged()) {
      this.getActiveCalendars();
    }
  }

  onModeChanged() {
    if (this.value === 'active') {
      console.log('active');
      this.getActiveCalendars();
    } else if (this.value === 'all') {
      console.log('all');
      this.getAllCalendars();
    }
  }

  onActiveChanged(calendar: Calendar) {
    this.googleService.toggleCalendarActive(calendar).subscribe(() => {
    })
  }



  getAllCalendars() {
    this.googleService.getAllCalendars().subscribe(calendars => {
      this.allCalendars = calendars;

    })
  }
  getActiveCalendars() {
    this.googleService.getActiveCalendars().subscribe(calendars => {
      this.activeCalendars = calendars;
    })
  }


}
