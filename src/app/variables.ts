import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const httpOptions = {
    headers : new HttpHeaders({
      'Authorization' : environment.authorization // admin - 1234
    })
  }

export const timeOutMessage = 3000;