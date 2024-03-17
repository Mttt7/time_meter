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


  serverUrl = 'http://localhost:3000/api/v1/googleCalendar/';

  calendars: Calendar[] = []


  constructor(private http: HttpClient) { }

  getAllCalendars(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.serverUrl + 'calendars');
  }

  getActiveCalendars(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.serverUrl + 'calendars/active');
  }

  toggleCalendarActive(calendar: Calendar): Observable<any> {
    return this.http.patch(this.serverUrl + 'calendars?calendarId=' + calendar.id, {});
  }

  getTime(calendarId: string, scope: string, date: string): Observable<GetTimeResponse> {
    return this.http.get<GetTimeResponse>(this.serverUrl + `calendars/${calendarId}/${scope}/${date}`);
  }
}

interface GetTimeResponse {
  time: {
    date: string,
    time: number
  }[],
  totalMinutes: any
}
