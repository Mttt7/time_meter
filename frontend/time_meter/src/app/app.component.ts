import { Component } from '@angular/core';
import { GoogleCalendarService } from './services/google-calendar.service';
import { Router } from '@angular/router';
import { Calendar } from './models/calendar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  calendars: Calendar[] = [];


  constructor(private googleService: GoogleCalendarService, private router: Router) { }




}
