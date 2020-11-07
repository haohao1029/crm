import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Renderer2, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { Company, Contact } from "../../interface/interface.model"
import { FacadeService } from 'src/app/facade.service';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
interface formObject {
  [key: string]: any
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() database: string;
  @Input() module: string;
  data;
  action;
  showForm: boolean = false;
  formControls: formObject = {}
  formInputArr = [];
  colArr = [];
  form = new FormGroup(this.formControls);

  constructor(private http: HttpClient, private renderer: Renderer2, private service: FacadeService) { }

  ngOnInit(): void {
    this.onGenerateTable()
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.renderer.listen('document', 'click', (event) => {
      let id = event.target.getAttribute("data-id")
    
      if (event.target.hasAttribute("data-id")) {
        if (event.target.getAttribute("data-action") == "edit") {
          this.action = "Edit";
          this.showForm = true;
          this.service.onShowDatabaseItem(this.database,id).subscribe(res => {

          let patchvalue = {};
          Object.entries(res).map(([key, value]) => {
            patchvalue[key] = value;
          })
          this.form.patchValue(patchvalue)
          })
        } else {
          this.onDelete(id)
        }
      }
    });
  }
  onGenerateTable () {
    let columns = []
    switch(this.module) {
      case "Contact":
        columns = [{title: "name", data: "name", defaultContent: "" },{title: "email", data:"email", defaultContent: "" },{title: "phone_no", data: "phone_no", defaultContent: "" },{title: "Action", data: "id",render: function (data: any, type: any, full: any) {
          return `<a href="javascript:void(0)" class="btn btn-link btn-info btn-just-icon " ><i data-id="${data}" data-action="edit" class="material-icons">dvr</i></a>
          <a href="javascript:void(0)" class="btn btn-link btn-danger btn-just-icon "><i data-id="${data}" data-action="delete" class="material-icons">close</i></a>
          `;
          }
        }]
        break;
      case "Company":
        columns = [{title: "name", data: "name", defaultContent: "" },{title: "email", data:"email", defaultContent: "" },{title: "phone_no", data: "phone_no", defaultContent: "" },{title: "Action", data: "id",render: function (data: any, type: any, full: any) {
          return `<a href="javascript:void(0)" class="btn btn-link btn-info btn-just-icon " ><i data-id="${data}" data-action="edit" class="material-icons">dvr</i></a>
          <a href="javascript:void(0)" class="btn btn-link btn-danger btn-just-icon "><i data-id="${data}" data-action="delete" class="material-icons">close</i></a>
          `;
          }
        }]
        break;
      default:
        break;
    }

    console.log(columns)
    const that = this
    this.service.onGenerateDatatable(this.dtOptions, this.module, columns)

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onShowForm() {
    this.form.reset()
    this.action = "New";
    this.showForm = true;
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  onDelete(id) {
    console.log("adsasda")
    this.service.onDeleteDatabaseItem(this.database,id, this.dtElement, this.dtTrigger)    
  }
}
