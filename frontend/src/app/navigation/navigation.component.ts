import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @Input() title: string = '';
  private snackBarDuration: number = 3000; // ms

  constructor(public auth: AuthService, private snackBar: MatSnackBar) { }

  public onLogout(): void {
    this.auth.logout();
    this.snackBar.open('Logged out', 'Close', { duration: this.snackBarDuration })
  }

}
