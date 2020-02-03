import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IonSlides, Platform } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  
  @ViewChild('sli', {static:true}) slidss:IonSlides;
  id;
  usuario;
  cedula;
  pdfObj;
  ultimoLapso;
  datos;
  nombrep;
  apellidop:string;
  
  constructor(private route:ActivatedRoute, 
              private router:Router, 
              private data:DataService) {
    
    this.route.queryParams.subscribe(params =>{
      this.id = params.id;
      this.usuario = params.usuario;
      this.cedula = params.cedula;
    
    })
  }

  
  ngOnInit() {
  

    this.data.getLapso().subscribe( p =>{
      let ar = [];
      for(let i=0; i < p.length; i++){
        ar.push(p[i]);
      }
      let n = ar.pop();
      this.ultimoLapso = n['lapsoAcademico'];

    });
    
    this.data.getDocentesId(this.id).subscribe(p=>{

      this.datos = p.filter(p1=>{
       return  p1['lapsoAcademico'] === this.ultimoLapso;  
      })
      console.log(this.datos[0]);
      this.nombrep =  this.datos[0].nombre;
      this.apellidop = this.datos[0].apellido;
    });

    

  }


  generarPDF(){
    alert('Descargando PDF.......');
    let docDefinition = {
      footer: {
        columns: [
          'Left part',
          { text: 'Este documento sin el sello y la firma de la oficina sectorial de Control de Estudios, no tiene validez D.A.C.E ', alignment: 'center' }
        ]
      },
      
      content: [
        
        {text: 'REPÚBLICA BOLIVARIANA DE VENEZUELA', style: 'encabezado'},
        {text: 'UNIVERSIDAD NACIONAL EXPERIMENTAL RÓMULO GALLEGOS', style: 'encabezado'},
        {text: 'DIRECCIÓN DE ADMISIÓN, CONTROL Y EVALUACIÓN', style: 'encabezado2'},
        {text: 'HORARIO DE CLASES', style: 'titulo'},
        {text: 'C.I.: '+ this.cedula +' - '+ this.nombrep + ' '+ this.apellidop+'  ', style: 'subheader'},
        {text: 'CARRETA: (601) INGENIERIA EN INFORMATICA - INGENIERIA EN SISTEMAS (SAN JUAN DE LOS MORROS)', style: 'subheader'},
        {text: 'PERIODO: '+this.ultimoLapso+'- Inscripcion', style: 'subheader2'},

        
		{
			style: 'tableExample',
			table: {
        
				body: [
          ['COD. MATERIA', 'NOMBRE MATERIA', 'SECCION', 'CLASE', 'AULA'],
          [this.datos[0].idDocente,this.datos[0].materia,this.datos[0].seccion,
          this.datos[0].dia +' '+ this.datos[0].inicio +' - '+ 
          this.datos[0].fin ,this.datos[0].nombreAula],

          
          [this.datos[1].idDocente,this.datos[1].materia,this.datos[1].seccion,
          this.datos[1].dia +' '+ this.datos[1].inicio +' - '+ this.datos[1].fin ,
          this.datos[1].nombreAula],
          

				]
			}
		},
      ],
      styles: {
        encabezado:{
          alignment:'center',
          width: 40,
          fontSize: 10,
          bold: true,
        
        },
        encabezado2:{
          alignment:'center',
          width: 40,
          fontSize: 10,
          bold: true,
          marginBottom:40
        
        },
        titulo:{
          alignment:'center',
          marginBottom: 40,
          bold: true,
        },
        subheader2: {
          alignment: 'left',
          marginBottom: 30
        },
        subheader: {
          italics: true,
          alignment: 'left'
        },
        tableExample:{
          width:100,
          alignment:'center',
          
        }
       
      }
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.pdfObj.download('Horario Profesores.pdf');
  }

  slide(){
    
    this.router.navigate(['/principal']);
  }

 
  verHorario(){

    let NavigationExtras:NavigationExtras = {
      queryParams:{
        id: this.id
      }
    }
    this.router.navigate(['/horarios'],NavigationExtras);

  }

  verPDF(){

    let NavigationExtras:NavigationExtras = {
      queryParams:{
        id: this.id
      }
    }
    this.router.navigate(['/pdf'],NavigationExtras);

  }

  cambio(){
   
    this.slidss.getActiveIndex().then(index => {
      console.log('dentro cambio',index);
      this.data.id$.emit(index);
      
   })

  }

  

  
}
