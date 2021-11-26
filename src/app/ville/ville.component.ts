import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Pays } from '../classes/pays';
import { Ville } from '../classes/ville';
import { PaysService } from '../services/pays.service';
import { VilleService } from '../services/ville.service';
import { timeOutMessage } from '../variables';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  @ViewChild('closebutton') closebutton : any;

  villes : Array<Ville> = [];
  listPays : Array<Pays> = []
  ville : Ville;
  paysEmpty : Pays;
  search ?: string;
  errorMessage: string ="";
  success : boolean = false;

  constructor(private vs : VilleService, private ps : PaysService) {
    this.paysEmpty = new Pays("", "Choisisser un pays"); 
    this.ville =  new Ville(0, "", "", this.paysEmpty);
  }

  ngOnInit(): void {
    this.load();
    
    this.ps.getAll().subscribe({
      next : (data) => {this.listPays = data},
      error : (err) => {this.errorMessage = err.error.message}
    })
  }

  reloadCities(): void{
      this.clear();
      this.load();
  }

  resetCity() : void{
    this.ville = new Ville(0, "", "", this.paysEmpty);
    this.errorMessage = "";
  }

  clear() : void{
    this.villes = [];
  }

  edit(id : number) : void{
    this.vs.getById(id).subscribe({
      next : (data) => {
        this.ville = data;
        this.listPays.forEach(pays => {if (pays.code == this.ville.paysByPaysCode.code) this.ville.paysByPaysCode = pays;});
      },
      error : (err) => {this.errorMessage = err.error.message}
    })
  }
  
  load() : void{
    this.vs.getAll(this.search).subscribe({
      next : (data) => {
        this.villes = data
      },
      error : (err) => {this.errorMessage = err.error.message}
    })
  }
  
  showSuccess() : void{
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, timeOutMessage)
  }

  addVille() : void{
    let o : Observable<any>;
    if (this.ville.id == 0){
      o = this.vs.add(this.ville);
    }
    else{
      o = this.vs.edit(this.ville);
    }
    o.subscribe({
      next : () => {
        this.reloadCities();
        this.resetCity();
        this.closebutton.nativeElement.click();
        this.showSuccess()
      },
      error : (err) => {this.errorMessage = err.error.message}
    })
  }

  delete(id : number){
    if (confirm("Êtes vous sur ?"))
    {
      this.vs.delete(id).subscribe({
        next : () => {
          this.reloadCities()
          this.showSuccess()
        },
        error : (err) => {this.errorMessage = err.error.message}
      })
    }
  }

}
