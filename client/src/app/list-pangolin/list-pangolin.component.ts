import { Component, OnInit  } from '@angular/core';
import axios from 'axios';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-list-pangolin',
  templateUrl: './list-pangolin.component.html',
  styleUrls: ['./list-pangolin.component.css']
})
export class ListPangolinComponent implements OnInit {

  pangolin: any[] = [];
  friendNames: string[] = [];
  currentPangolinId: string = '';
  currentPangolinUsername: string = '';
  currentPangolinFriends : string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.getCurrentPangolinId();
    this.getPangolins();
    
  }

 

  

  getCurrentPangolinId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.currentPangolinId = decodedToken._id;
      this.currentPangolinUsername = decodedToken.username;
      this.currentPangolinFriends = decodedToken.friends;
      this.getDetailsFriends();
    }
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

getDetailsFriends() {
  const promises = this.currentPangolinFriends.map(friendId => 
    axios
      .get(`http://localhost:3000/get-friend/${friendId}`)
      .then((response) => {
        const friendDetails = response.data;
        console.log(friendDetails); // Keep this line for debugging
        return friendDetails.name; 
      })
  );

  Promise.all(promises)
    .then(friendNames => {
      this.friendNames = friendNames;
    })
    .catch((err) => {
      console.error(err);
    });
}

  
  addFriends(friendId: string) {
    axios.patch(`http://localhost:3000/add-friend/${this.currentPangolinId}/${friendId}`)
    .then(response => {
      this.getPangolins()
      
    })
    .catch(err => {
      console.error(err);
    })
  }


  removeFriends(friendId: string) {
    axios.patch(`http://localhost:3000/remove-friend/${this.currentPangolinId}/${friendId}`)
    .then(response => {
      this.getPangolins()
    })
    .catch(err => {
      console.error(err)
    })
  }
}
