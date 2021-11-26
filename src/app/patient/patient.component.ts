import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../classes/patient';
import { Pays } from '../classes/pays';
import { Ville } from '../classes/ville';
import { PatientService } from '../services/patient.service';
import { PaysService } from '../services/pays.service';
import { VilleService } from '../services/ville.service';
import { timeOutMessage } from '../variables';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;
  patients: Array<Patient> = [];
  villes: Array<Ville> = [];
  paysEmpty: Pays = new Pays("", "");
  villeEmpty: Ville = new Ville(0, "", "", this.paysEmpty);
  patient: Patient = new Patient(0, "", new Date(), "", "", "", "", this.villeEmpty.paysByPaysCode, this.villeEmpty);
  search?: string;
  errorMessage: string ="";
  success : boolean = false;

  constructor(private vs: VilleService, private ps: PaysService, private pts: PatientService) {
  }

  ngOnInit(): void {
    this.reloadPatients();
    this.vs.getAll().subscribe({
      next: (data) => { this.villes = data },
      error: (err) => { this.errorMessage = err.error.message }
    })
  }


  edit(id: number): void {
    this.pts.getById(id).subscribe({
      next: (data) => { this.patient = data },
      error: (err) => { this.errorMessage = err.error.message }
    })
  }

  compareVille(v1: Ville, v2: Ville): boolean {
    return (v1.id === v2.id)
  }

  reloadPatients(): void {
    this.clear();
    
    this.pts.getAll(this.search).subscribe({
      next: (data) => { this.patients = data },
      error: (err) => { this.errorMessage = err.error.message }
    })
  }

  showSuccess() : void{
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, timeOutMessage)
  }

  resetPatient(): void {
    this.patient = new Patient(0, "", new Date(), "", "", "", "", this.paysEmpty, this.villeEmpty);
    this.errorMessage = "";
  }

  addPatient(): void {
    let o : Observable<any>;
    if (this.patient.id == 0) {
      o = this.pts.add(this.patient);
    }
    else {
      o = this.pts.edit(this.patient);
    }
    o.subscribe({
      next: () => { 
        this.reloadPatients();
        this.resetPatient();
        this.closebutton.nativeElement.click();
        this.showSuccess()
      },
      error: (err) => { this.errorMessage = err.error.message }
    });
  }

  clear(): void {
    this.patients = [];
  }

  delete(id: number) {
    if (confirm("Êtes vous sur ?")) {
      this.pts.delete(id).subscribe({
        next: (data) => {
          this.reloadPatients()
          this.showSuccess()
        },
        error: (err) => { this.errorMessage = err.error.message }
      })
    }
  }

}
