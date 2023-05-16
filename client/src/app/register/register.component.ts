import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username : '',
    email: '',
    password: '',
    role : '',

  };
  message = '';

  constructor(private router: Router) { }

  onSubmit() {
    axios.post('http://localhost:3000/register', this.user)
      .then(response => {
        this.message = response.data.message;
        this.router.navigate(['/login']);

      })
      .catch(error => {
        this.message = error.response.data.message;
      });
  }
}
