import { Component, OnInit, inject } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent  implements OnInit{

  router:Router= inject(Router)
  userService:UserService = inject(UserService);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);

  userData:User | undefined;

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params['id'];
    if(userId){
      this.userData = this.userService.getCachedUsers().find(usr => usr.id === userId);
    }
  }


  onEditUser(value:User){
    value.id = this.activatedRoute.snapshot.params['id'];
    this.userService.updateUser(value).subscribe(
      res=>{
        if(res){
          this.router.navigate(['/users']);  
        }
      }
    )
    

  }
}
