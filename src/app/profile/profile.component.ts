import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {UserService } from '../user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any; // Variable to hold user data

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userService.getUserData().subscribe(
      (data: any) => {
        console.log('User data:', data);
        this.userData = data;
      },
      (error: any) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

}

