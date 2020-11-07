import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import {
  Company,
  Contact,
  DataTablesResponse,
} from "../../interface/interface.model";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { DataTableDirective } from "angular-datatables";
import { MicroService } from "src/app/micro.service";

@Injectable({
  providedIn: "root",
})
export class DatatablesService {
  constructor(private http: HttpClient, private microService: MicroService) {}
  onCreateDatabaseItem(database, values, dtElement, dtTrigger, form) {
    return this.http
      .post(environment.backend_link + database, values)
      .subscribe(
        (res) => {
          this.rerender(dtElement, dtTrigger);
          form.reset();
          this.microService.showNotification("success", "Created Success !!");
        },
        (error) => {
          this.microService.showNotification("info", error.message);
        }
      );
  }
  onUpdateDatabaseItem(database, id, values, dtElement, dtTrigger, form) {
    return this.http
      .put(environment.backend_link + database + "/" + id, { params: values })
      .subscribe(
        (res) => {
          this.rerender(dtElement, dtTrigger);
          form.reset();
          this.microService.showNotification("success", "Update Successed!!");
        },
        (error) => {
          this.microService.showNotification("info", error.message);
        }
      );
  }
  onShowDatabaseItem(database, id) {
    return this.http.get<any>(environment.backend_link + database + "/" + id);
  }
  onDeleteDatabaseItem(database, id, dtElement, dtTrigger) {
    return this.http
      .delete<any>(environment.backend_link + database + "/" + id)
      .subscribe(
        (res) => {
          this.rerender(dtElement, dtTrigger);
          this.microService.showNotification("info", "Delete Successed!!");
        },
        (error) => {
          this.microService.showNotification("info", error.message);
        }
      );
  }
  dataColumns(module) {
    let columns = [];
    switch (module) {
      case "Contact":
        columns = [
          { title: "name", data: "name", defaultContent: "" },
          { title: "email", data: "email", defaultContent: "" },
          { title: "phone_no", data: "phone_no", defaultContent: "" },
          {
            title: "Action",
            data: "id",
            render: function (data: any, type: any, full: any) {
              return `<a href="javascript:void(0)" class="btn btn-link btn-info btn-just-icon " ><i data-id="${data}" data-action="edit" class="material-icons">dvr</i></a>
          <a href="javascript:void(0)" class="btn btn-link btn-danger btn-just-icon "><i data-id="${data}" data-action="delete" class="material-icons">close</i></a>
          `;
            },
          },
        ];
        break;
      case "Company":
        columns = [
          { title: "name", data: "name", defaultContent: "" },
          { title: "email", data: "email", defaultContent: "" },
          { title: "phone_no", data: "phone_no", defaultContent: "" },
          { title: "owner", data: "owner", defaultContent: "" },
          {
            title: "Action",
            data: "id",
            render: function (data: any, type: any, full: any) {
              return `<a href="javascript:void(0)" class="btn btn-link btn-info btn-just-icon " ><i data-id="${data}" data-action="edit" class="material-icons">dvr</i></a>
            <button class="btn btn-link btn-danger btn-just-icon "><i data-id="${data}" class="material-icons">close</i></button>
            `;
            },
          },
        ];
        break;
      case "User":
        columns = [
          { title: "name", data: "name", defaultContent: "" },
          { title: "role", data: "role", defaultContent: "" },
          {
            title: "Action",
            data: "id",
            render: function (data: any, type: any, full: any) {
              return `<a href="javascript:void(0)" class="btn btn-link btn-info btn-just-icon " ><i data-id="${data}" data-action="edit" class="material-icons">dvr</i></a>
              <button class="btn btn-link btn-danger btn-just-icon "><i data-id="${data}" class="material-icons">close</i></button>
              `;
            },
          },
        ];
        break;
      case "Role":
        columns = [
          { title: "name", data: "name", defaultContent: "" },
          {
            title: "Action",
            data: "id",
            render: function (data: any, type: any, full: any) {
              return `<a href="javascript:void(0)" class="btn btn-link btn-info btn-just-icon " ><i data-id="${data}" data-action="edit" class="material-icons">dvr</i></a>
                <button class="btn btn-link btn-danger btn-just-icon "><i data-id="${data}" class="material-icons">close</i></button>
                `;
            },
          },
        ];
        break;
      default:
        break;
    }
    return columns;
  }

  rerender(dtElement, dtTrigger): void {
    dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      dtTrigger.next();
    });
  }

  onGenerateDatatable(dtOptions, module, columns) {
    const that = this;
    dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      serverSide: true,
      processing: true,
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            environment.backend_link + "datatable/" + module,
            dataTablesParameters,
            {}
          )
          .subscribe((resp) => {
            console.log(resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,
            });
          });
      },
      columns: columns,
    };
    return dtOptions;
  }
}
