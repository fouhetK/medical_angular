import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ville } from '../classes/ville';
import { httpOptions } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private http : HttpClient) { }

  getAll(s ?: string) : Observable<Ville[]>{
    return this.http.get<Array<Ville>>(environment.backendUri + "ville" + (s == undefined ? "":"?search=" + s), httpOptions);
  }

  getById(id : number) : Observable<Ville>{
    return this.http.get<Ville>(environment.backendUri + "ville/" + id, httpOptions);
  }

  edit(ville : Ville) : Observable<any> {
    return this.http.put(environment.backendUri + "ville/"+ ville.id, ville, httpOptions );
  }

  add(ville : Ville) : Observable<any>{
    return this.http.post(environment.backendUri + "ville", ville, httpOptions );
  }

  delete(id : number) : Observable<any>{
    return this.http.delete(environment.backendUri + "ville/" + id, httpOptions);
  }
}
