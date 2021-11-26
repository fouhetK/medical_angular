import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pays } from '../classes/pays';
import { httpOptions } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(private http : HttpClient) { }

  getAll() : Observable<Pays[]>{
    return this.http.get<Array<Pays>>(environment.backendUri + "pays", httpOptions);
  }
}
