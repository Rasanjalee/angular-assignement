import { Component, inject } from '@angular/core';
import { UserFormComponent } from "../user-form/user-form.component";
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
router:Router= inject(Router);
userService:UserService= inject(UserService);

  onAddUser(user:any){
    this.userService.addUser(user).subscribe(res=>{
      if(res){ 
        this.router.navigate(['/users'])
        
      }
    })
    

  }

}
