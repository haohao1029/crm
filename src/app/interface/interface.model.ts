export class Company{
    name: string;
    email: string;
    phone_no: string;
}
export class Contact{
    name: string;
    email: string;
    phone_no: string;
}
export class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
  }