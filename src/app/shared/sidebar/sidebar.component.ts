import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  ngOnInit() {
    console.log(' Sidebar initialized'); // See if this is called
  }

 
   constructor(private auth: AuthService) {}

    get isReader() {
      return this.auth.getCurrentUser()?.type === 'reader';
    }

    get isLibrarian() {
      return this.auth.getCurrentUser()?.type === 'librarian';
    }

    logout() {
      this.auth.logout();
    }

    get isLoggedIn() {
      return this.auth.getCurrentUser() !== null;
    }


}
