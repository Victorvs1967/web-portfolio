import { Component } from '@angular/core';
import { UsersDataSource } from 'src/app/model/users-data-source';
import { AdminService } from 'src/app/service/admin.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/model/user.model';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', padding: '0', margin: '0' })),
      state('expanded', style({ height: '*', margin: '*' })),
      transition('expanded <=> collapsed', animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListUserComponent {

  displayedColumns: string[] = [ 'username', 'email', 'firstName', 'lastName', 'onCreate', 'role' ];
  dataSource: any;
  expandedElement: User | null | undefined;

  constructor(private admin: AdminService, private image: ImageService) {
    this.reloadData();
  }

  deleteUser(username: string) {
    if (confirm('Are you sure?')) {
      this.admin.deleteUser(username).subscribe(() => this.reloadData());
    }
  }

  reloadData() {
    this.admin.getUserList().subscribe(data => this.dataSource = new UsersDataSource([...data]));
  }

  readImg(id: string): void {
    const style = { width: '100%', height: 'auto', radius: '.5rem' };
    this.image.download(id, style).subscribe();
  }
}
