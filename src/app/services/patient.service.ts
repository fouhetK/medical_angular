import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../classes/patient';
import { httpOptions } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) { }

  getAll(s ?: string) : Observable<Patient[]>{
    return this.http.get<Array<Patient>>(environment.backendUri + "patient" + (s == undefined ? "":"?search=" + s), httpOptions);
  }

  getById(id : number) : Observable<Patient>{
    return this.http.get<Patient>(environment.backendUri + "patient/" + id, httpOptions);
  }

  edit(patient : Patient) : Observable<any> {
    return this.http.put(environment.backendUri + "patient/"+ patient.id, patient, httpOptions );
  }

  add(patient : Patient) : Observable<any>{
    return this.http.post(environment.backendUri + "patient", patient, httpOptions );
  }

  delete(id : number) : Observable<any>{
    return this.http.delete(environment.backendUri + "patient/" + id, httpOptions);
  }
}
