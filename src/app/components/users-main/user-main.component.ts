import { Component, OnInit, inject } from '@angular/core';
import {  NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-user-main',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.css'
})
export class UserMainComponent implements OnInit{


  userService:UserService = inject(UserService);
  router:Router = inject(Router);
  searchValue:string = '';
  users:User[] = [];
  showSearchBar: boolean = true;
  showAddUserBtn:boolean =false;
  addUserDisabled: boolean =false;
  successMessage:string = '';



  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
    this.userService.getUsers()
    .subscribe((res)=>{
      this.users =res;
      
    });
    //if theres success message on action its display and hide in a few seconds
    this.userService.successMessage$.subscribe(message => {
      this.successMessage = message;
      if (message) {
        setTimeout(() => {
          this.successMessage = '';
          this.userService.setSuccessMessage('') 
        }, 2000);
      }
    });
  }
  
  //check current route and hide and disable search bar and the add new user button
  checkRoute(currentUrl: string): void {
    this.showSearchBar = currentUrl === '/users';
    this.addUserDisabled = currentUrl !== '/users'; // Disable if not on /users
  }

  //change the search value on change
  onSearchChange(){
    this.userService.setSearchText(this.searchValue);
  }
  
  //load new user component
  toNewUser(){
    localStorage.setItem('fromUsers','true');
    this.router.navigate(['users/add']);
  }
  
}
