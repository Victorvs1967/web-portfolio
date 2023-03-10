import { EditUserComponent } from './../edit-user/edit-user.component';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/model/user.model';
import { ImageService } from 'src/app/service/image.service';
import { AnyDataSource } from 'src/app/data/data-source';
import { adminModal } from '../../../admin-dialog.decorator';
import { alertModal } from 'src/app/component/alert/alert.decorator';
import { AlertDialogData } from 'src/app/model/alert-dialog.model';

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
export class ListUserComponent implements OnInit {

  static user: User;
  static alert: AlertDialogData = {
    title: "A you sure?",
    subtitle: "You can't get access to this user again.",
    message: "If you realy want to delete this user,",
  };

  displayedColumns: string[] = [ 'username', 'email', 'firstName', 'lastName', 'onCreate', 'role' ];
  dataSource: any;
  expandedElement: User | null | undefined;

  constructor(
    private admin: AdminService,
    private image: ImageService,
  ) {
    this.reloadData();
  }

  ngOnInit(): void {
    this.admin._reloadCurrentRoute();
  }

  editUser(user: User) {
    ListUserComponent.user = user;
    this.getUser();
  }

  @adminModal(EditUserComponent, ListUserComponent.user)
  getUser() {
    this.reloadData();
  }

  @alertModal(ListUserComponent.alert)
  deleteUser(user: User) {
    this.admin.deleteUser(user.username).subscribe(() => this.reloadData());
    this.admin._reloadCurrentRoute();
  }

  reloadData() {
    this.admin.getUserList().subscribe(data => this.dataSource = new AnyDataSource([ ...data ]));
  }

  readImg(id: string): void {
    const style = { width: '100%', height: 'auto', radius: '.5rem' };
    this.image.download(id, style).subscribe();
  }
}
