import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrentDateService {

  currentDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.getLastMonday());

  constructor() { }

  private getLastMonday(): Date {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const lastMonday = new Date(today.setDate(diff));
    lastMonday.setHours(0, 0, 0, 0); // Ustawiamy godzinę na 00:00
    return lastMonday;
  }

  nextMonday(): void {
    const currentDateValue = this.currentDate.getValue();
    const nextMonday = new Date(currentDateValue);
    nextMonday.setDate(currentDateValue.getDate() + 7);
    nextMonday.setHours(0, 0, 0, 0); // Ustawiamy godzinę na 00:00
    this.currentDate.next(nextMonday);
  }

  previousMonday(): void {
    const currentDateValue = this.currentDate.getValue();
    const previousMonday = new Date(currentDateValue);
    previousMonday.setDate(currentDateValue.getDate() - 7);
    previousMonday.setHours(0, 0, 0, 0); // Ustawiamy godzinę na 00:00
    this.currentDate.next(previousMonday);
  }

}
