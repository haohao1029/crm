import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  database = "roles"
  module = "Role"

  constructor() { }

  ngOnInit(): void {
  }

}
