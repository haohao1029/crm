import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  database = "users"
  module = "User"
  assoc = ["role : name"]
  constructor() { }

  ngOnInit(): void {
  }

}
