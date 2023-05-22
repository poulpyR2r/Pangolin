import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  
  currentPangolinId: string = '';
  currentPangolinUsername: string = '';
  currentPangolinRole: string = '';
  currentPangolinFriends: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getCurrentPangolinId();
  }

  getCurrentPangolinId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.currentPangolinId = decodedToken._id;
      this.currentPangolinUsername = decodedToken.username;
      this.currentPangolinRole = decodedToken.role;
      this.currentPangolinFriends = decodedToken.friends;
    }
  }

  getDetailsFriends() {
    axios
      .get(`http://localhost:3000/get-friend/${this.currentPangolinFriends}`)
      .then((response) => {

      });
  }

  changeRole(newRole: string) {
    axios
      .patch(
        `http://localhost:3000/pangolin/${this.currentPangolinId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        this.currentPangolinRole = newRole;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
