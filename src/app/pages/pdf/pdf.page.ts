import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {

  id;
  datos;
  lapso;
  nombre;
  apellido;
  cedula;
  periodo;
  constructor(private servicio:DataService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(p =>{
      this.id = p.id;
    });

    this.servicio.getLapso().subscribe( p =>{
      let ar = [];
      for(let i=0; i < p.length; i++){
        ar.push(p[i]);
      }
      let n = ar.pop();
      this.lapso = n['lapsoAcademico'];
      this.periodo = this.lapso;

    });
    
    this.servicio.getDocentesId(this.id).subscribe(p=>{
     
      this.datos = p.filter(p1=>{

        this.nombre = p1['nombre'];
        this.apellido = p1['apellido'];
        this.cedula = p1['cedula'];
      
       return  p1['lapsoAcademico'] === this.lapso; 

      })
      console.log('datos > ',this.datos);
    
    });

    
  }

  crearPDF(){
    const options = {
        filename:'horario.pdf',
        image:{type:'pgn'},
        html2canvas:{},
        jsPDF:{ orientation: 'landscape'}
    };

    const content: Element = document.getElementById('cpdf');

    html2pdf()
    .from(content)
    .set(options)
    .save();


  }




}
