import { Component } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  constructor(private googleService: GoogleCalendarService,
    private authService: AuthService,
  ) { }

  login() {
    this.authService.login();
  }

}
