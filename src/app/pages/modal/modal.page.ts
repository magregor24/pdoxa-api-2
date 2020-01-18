import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  id;
  dia;
  datos;
  ultimoLapso;

  constructor(private route:ActivatedRoute, private data:DataService) { 

    this.route.queryParams.subscribe(params =>{
      this.id = params.id;
      this.dia = params.dia;
    })
  }

  ngOnInit() {

    this.data.getLapso().subscribe(p=>{
      let ar = [];
      for(let i=0; i < p.length; i++){
        ar.push(p[i]);
      }
      let n = ar.pop();
      this.ultimoLapso = n['lapsoAcademico'];

    })
   
    
    this.data.getDocentesId(this.id).subscribe(p=>{
      
      this.datos = p.filter(p=>{
        return p['dia'] == this.dia  && p['lapsoAcademico']== this.ultimoLapso;
      })
    })

    
  }





}
