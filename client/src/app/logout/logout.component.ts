import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout() {
    axios.post('http://localhost:3000/logout') 
      .then(response => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error(error);
        
      });
  }
}
