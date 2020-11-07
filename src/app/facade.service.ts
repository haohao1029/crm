import { Injectable, Injector } from '@angular/core';
import { DatatablesService } from './shared/datatables/datatables.service';
import { FormService } from './shared/form/form.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MicroService } from './micro.service';


@Injectable({
  providedIn: 'root'
})
export class FacadeService {


  constructor(private injector: Injector, private datatableService: DatatablesService, private formService: FormService, private microService: MicroService, private http: HttpClient) { }
    onDeleteDatabaseItem(database, id, dtElement, dtTrigger) {
      this.datatableService.onDeleteDatabaseItem(database, id, dtElement, dtTrigger);
    }
    onCreateDatabaseItem(database, values, dtElement, dtTrigger, form) {
      this.datatableService.onCreateDatabaseItem(database,values, dtElement, dtTrigger, form)

    }
    onUpdateDatabaseItem(database, id, values, dtElement, dtTrigger, form) {
      this.datatableService.onUpdateDatabaseItem(database, id, values, dtElement, dtTrigger, form)

    }
    onShowDatabaseItem(database, id) {
      return this.datatableService.onShowDatabaseItem(database, id)
    }
    dataColumns(module){
      return this.datatableService.dataColumns(module)
    }
    showNotification(type: string, message:string) {
      return this.microService.showNotification(type, message)
    }
    logKeyValuePairs(group: FormGroup): void {
      return this.formService.logKeyValuePairs(group)
    }
    onGetColumnName(module) {
      return this.formService.onGetColumnName(module)
    }
    onGenerateDatatable(dtOptions, module, columns) {
      return this.datatableService.onGenerateDatatable(dtOptions,module,columns)
    }
    onGenerateInput(columns, colArr, formControls, formInputArr) {
      this.formService.onGenerateInput(columns, colArr, formControls, formInputArr)
    }
}
