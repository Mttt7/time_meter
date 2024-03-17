import { Component, OnInit } from '@angular/core';
import { GoogleCalendarService } from './services/google-calendar.service';
import { Router } from '@angular/router';
import { Calendar } from './models/calendar';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }


}
