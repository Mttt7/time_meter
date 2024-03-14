import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Calendar } from '../models/calendar';

interface LoginResponse {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

  serverUrl = 'http://localhost:3000/api/v1/';

  calendars: Calendar[] = []


  constructor(private http: HttpClient) { }



  login(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(this.serverUrl);
  }

  populateCalendars() {
    this.http.get<Calendar[]>('http://localhost:3000/api/v1/calendars').subscribe((calendars) => {
      this.calendars = calendars;
    })
  }

  getAllCalendars(): Observable<Calendar[]> {
    return of(this.calendars)
  }

  getActiveCalendars(): Observable<Calendar[]> {
    return of(this.calendars.filter(calendar => calendar.active))
  }
}
