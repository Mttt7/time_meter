import { Component } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  constructor(private googleService: GoogleCalendarService) { }

  login() {
    this.googleService.login().subscribe((res) => {
      console.log(res);
      window.open(res.url)
    })

  }
}
