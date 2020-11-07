import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FormService {
  constructor(private http: HttpClient) {}

  onGetColumnName(module) {
    return this.http.post(environment.backend_link + "webhook", {
      scope: "gen_input",
      module: module,
    });
  }

  onGenerateInput(columns, colArr, formControls, formInputArr) {

    formControls["id"] = new FormControl("");
    for (let i in Object.values(columns)) {
      if (
        columns[i] != "inserted_at" &&
        columns[i] != "updated_at" &&
        columns[i] != "id"
      ) {
        colArr.push(Object.values(columns)[i]);
      }
    }
    for (let i in columns) {
      if (
        columns[i] != "inserted_at" &&
        columns[i] != "updated_at" &&
        columns[i] != "id"
      ) {
        const inputName = columns[i];
        switch (inputName) {
          case "email":
            formInputArr.push([inputName, "email"]);
            formControls[inputName] = new FormControl("", [
              Validators.required,
              Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
            ]);
            break;
          case "phone_no":
            formInputArr.push([inputName, "tel"]);
            formControls[inputName] = new FormControl("", [
              Validators.required,
              Validators.pattern("^[0-9]+$"),
            ]);
            break;
          case "domain_name":
            formInputArr.push([inputName, "url"]);
            formControls[inputName] = new FormControl("", [Validators.required]);
            break;
          case "role":
              this.http.post(environment.backend_link + "webhook", {
                scope: "assoc_data",
                database: "roles"
              }).subscribe(res => {
                console.log(res)
                formInputArr.push([inputName, "select", res]);
              })
            formControls[inputName] = new FormControl("", [Validators.required]);
            break;
          default:
            formInputArr.push([inputName, "text"]);
            formControls[inputName] = new FormControl("", [Validators.required]);
            break;
        }
      }
    }
  }

  logKeyValuePairs(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
      } else {
      }
    });
  }
}
