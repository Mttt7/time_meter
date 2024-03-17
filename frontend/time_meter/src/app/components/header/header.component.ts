import { Component } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userLogged = false;


  constructor(private googleService: GoogleCalendarService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isUserLogged();
  }


  login() {
    this.authService.login();
  }

  isUserLogged() {
    this.authService.isUserLogged().subscribe((res: any) => {

      this.userLogged = res.isLogged;
    });
  }

  logout() {

  }

}
