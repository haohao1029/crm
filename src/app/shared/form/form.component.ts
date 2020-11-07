import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Renderer2, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
declare const $: any;
interface formObject {
  [key: string]: any
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() database: string;
  @Input() interface: string;
  data;
  action;
  showForm: boolean = false;
  formControls: formObject = {}
  formInputArr = [];
  colArr = [];
  form = new FormGroup(this.formControls);

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.onGenerateInput()
  }
	onGenerateInput() {
    this.http.post("http://localhost:4000/api/webhook", { scope: "gen_input", module: this.interface }).subscribe(res => {
        this.formControls["id"] = new FormControl("")
        for (let i in Object.values(res)) {
            if (res[i] != "inserted_at" && res[i] != "updated_at" && res[i] != "id") {
            this.colArr.push(Object.values(res)[i])
            }
        }
        for (let i in res) {
            if (res[i] != "inserted_at" && res[i] != "updated_at" && res[i] != "id") {
                let input = res[i]
                switch (input) {
                    case "domain_name":
                        this.formInputArr.push([res[i], "url"])
                        this.formControls[input] = new FormControl("", [Validators.pattern("https?://.+")])
                    break;
                    case "email":
                        this.formInputArr.push([res[i], "email"])
                        this.formControls[input] = new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
                    break;
                    case "phone_no":
                        this.formInputArr.push([res[i], "tel"])
                        this.formControls[input] = new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$")])
                    break;
                    case "domain_name":
                        this.formInputArr.push([res[i], "url"])
                        this.formControls[input] = new FormControl("", [Validators.required])
                    break;
                    default:
                        this.formInputArr.push([res[i], "text"])
                        this.formControls[input] = new FormControl("", [Validators.required])
                    break;
                }
            }
        }
        this.logKeyValuePairs(this.form)
    })
}
logKeyValuePairs(group: FormGroup): void {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl = group.get(key);
    if (abstractControl instanceof FormGroup) {
      this.logKeyValuePairs(abstractControl)
    } else {
    }
  })
}

}
