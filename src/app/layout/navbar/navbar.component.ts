import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';

import { AuthService }
from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports:[RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(

    private authService: AuthService,

    private router: Router

  ) { }

  logout(): void {

    this.authService.logout();

    this.router.navigate([
      '/login'
    ]);

  }

}