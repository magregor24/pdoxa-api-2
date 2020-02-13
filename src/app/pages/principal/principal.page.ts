import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  
  @ViewChild('sli', {static:true}) slidss:IonSlides;
  @ViewChild('slide', {static:true}) slidee:IonSlides;
  id;
  usuario;
  cedula;
  pdfObj;
  ultimoLapso;
  datos;
  nombrep;
  apellidop:string;
  ad ='';
  

  
  constructor(private route:ActivatedRoute, 
              private router:Router, 
              private data:DataService) {
    
    this.route.queryParams.subscribe(params =>{
      this.id = params.id;
      this.usuario = params.usuario;
      this.cedula = params.cedula;
      this.ad = params.admin;
      
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
      
      this.nombrep =  this.datos[0].nombre;
      this.apellidop = this.datos[0].apellido;
    });

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

  
}
