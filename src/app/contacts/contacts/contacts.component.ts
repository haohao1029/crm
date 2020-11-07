import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  database = "contacts"
  module = "Contact"
  constructor() { }

  ngOnInit(): void {
  }

}
