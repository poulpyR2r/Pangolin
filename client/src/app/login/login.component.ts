import { Component } from '@angular/core';
import axios from 'axios';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };
  message = '';

  constructor(private router: Router) { }

  onSubmit() {
    axios.post('http://localhost:3000/login', this.user)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.message = response.data.message;
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.message = error.response.data.message;
      });
  }
}
