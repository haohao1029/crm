import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  Renderer2,
  Input,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import "rxjs/add/operator/map";
import { DataTableDirective } from "angular-datatables";
import { Company, Contact, DataTablesResponse } from "../../interface/interface.model";
import { FacadeService } from "src/app/facade.service";
import { environment } from "src/environments/environment";

interface formObject {
  [key: string]: any;
}
@Component({
  selector: "app-datatables",
  templateUrl: "./datatables.component.html",
  styleUrls: ["./datatables.component.css"],
})

export class DatatablesComponent implements OnInit, AfterViewInit, OnDestroy {
  private unlistener: () => void;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() database: string;
  @Input() module: string;
  @Input() assoc: string;
  data;
  action;
  showForm: boolean = false;
  formControls: formObject = {};
  formInputArr = [];
  colArr = [];
  form = new FormGroup(this.formControls);

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private service: FacadeService
  ) {}

  ngOnInit(): void {
    this.onGenerateInput();
    this.onGenerateTable();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.unlistener = this.renderer.listen("document", "click", (event) => {
      if (event.target.hasAttribute("data-id")) {
        let id = event.target.getAttribute("data-id");
        if (event.target.getAttribute("data-action") == "edit") {
          this.action = "Edit";
          this.showForm = true;
          this.service
            .onShowDatabaseItem(this.database, id)
            .subscribe((res) => {
              let patchvalue = {};
              Object.entries(res).map(([key, value]) => {
                patchvalue[key] = value;
              });
              this.form.patchValue(patchvalue);
            });
        } else {
          this.onDelete(id);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unlistener();
    this.dtTrigger.unsubscribe();
  }

  onGenerateInput() {
    this.service.onGetColumnName(this.module).subscribe(res => {
      const column = res
      this.service.onGenerateInput(column, this.colArr, this.formControls, this.formInputArr)
      this.service.logKeyValuePairs(this.form);
    });
  }

  onGenerateTable() {
    const columns = this.service.dataColumns(this.module);
    const that = this;
    // this.service.onGenerateDatatable(this.dtOptions, this.module, columns)
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      serverSide: true,
      processing: true,
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            environment.backend_link + "datatable/" + this.module,
            dataTablesParameters,
            {}
          )
          .subscribe((resp) => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,
            });
          });
      },
      columns: columns,
    };
  }

  onShowForm() {
    this.form.reset();
    this.action = "New";
    this.showForm = true;
  }

  onDelete(id) {
    this.service.onDeleteDatabaseItem(
      this.database,
      id,
      this.dtElement,
      this.dtTrigger
    );
  }
  onSubmit() {
    let value = this.form.value;
    const controls = this.form.controls;
    let values = {};
    for (let name in controls) {
      values[name] = controls[name].value;
    }
    if (values != {}) {
      if (value.id == null) {
        this.service.onCreateDatabaseItem(
          this.database,
          values,
          this.dtElement,
          this.dtTrigger,
          this.form
        );
      } else {
        this.service.onUpdateDatabaseItem(
          this.database,
          this.form.value.id,
          values,
          this.dtElement,
          this.dtTrigger,
          this.form
        ); 
      }
    } else {
      this.service.showNotification("info", "Please Fill In The Form !!");
    }
  }

  checkValid() {
    const invalid = [];
    const controls = this.form.controls;
    console.log(controls);
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);
  }
}
