import { Component, OnInit } from '@angular/core';
import { Rdv } from '../classes/rdv';
import { PatientService } from '../services/patient.service';
import { RdvService } from '../services/rdv.service';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {

  rdvs: Array<Rdv> = []
  rdv : Rdv = new Rdv();
  success = false
  errorMessage = ""
  search ?: string
  datesearch ?: Date;

  constructor( private rdvService: RdvService, private ps : PatientService  ) { }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.rdvs = [];
    console.log(this.search)
    console.log(this.datesearch)
    this.rdvService.getAll(this.search, this.datesearch).subscribe({
      next: (data) => { this.rdvs = data },
      error: (err) => { console.log(err.error.message) }
    });
  }

  delete(id: number | undefined): void {

    if (confirm("Êtes vous sur ?")) {
      this.rdvService.delete(id).subscribe({
        next: (data) => { this.reload(); },
        error: (err) => { console.log(err.error.message) }
      });
    }
  }


}
