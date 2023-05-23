import { Component, OnInit  } from '@angular/core';
import axios from 'axios';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-list-pangolin',
  templateUrl: './list-pangolin.component.html',
  styleUrls: ['./list-pangolin.component.css']
})
export class ListPangolinComponent implements OnInit {


  userRole: string = ''; 
  userFriends: any[] = [];
  pangolin: any[] = [];
  currentPangolinId: string = '';
  currentPangolinUsername: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getCurrentPangolinId();
    this.getPangolins();
    this.getUserRole();
    this.getUserFriends();
    
  }



  

  getCurrentPangolinId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.currentPangolinId = decodedToken._id;
      this.currentPangolinUsername = decodedToken.username;
 
    
    }
  }

  getUserFriends() {
    axios.get(`http://localhost:3000/pangolin/friends/${this.currentPangolinId}`)
      .then(response => {
        this.userFriends = response.data; 
        console.log(this.userFriends)
      })
      .catch(err => {
        console.error(err);
      });
  }
  

  getUserRole() {
    axios.get(`http://localhost:3000/pangolin/role/${this.currentPangolinId}`)
    .then(response => {
      this.userRole = response.data.role;
      console.log(this.userRole);
    })
    .catch(err => {
      console.error(err);
    });
  }



  getPangolins() {
    axios.get('http://localhost:3000/pangolin', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      this.pangolin = response.data.filter((pang: any) => pang.username !== this.currentPangolinUsername);
      
    })
    .catch(err => {
      console.error(err);
    })
  }





  
  addFriends(friendId: string) {
    axios.patch(`http://localhost:3000/add-friend/${this.currentPangolinId}/${friendId}`)
    .then(response => {
      this.getPangolins()
      this.getUserFriends();
      
    })
    .catch(err => {
      console.error(err);
    })
  }


  removeFriends(friendId: string) {
    axios.patch(`http://localhost:3000/remove-friend/${this.currentPangolinId}/${friendId}`)
    .then(response => {
      this.getPangolins()
    this.getUserFriends();
      
    })
    .catch(err => {
      console.error(err)
    })
  }
}
