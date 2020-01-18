import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

id;
datos;
lapso;
ultimoLapso;

constructor(private route:ActivatedRoute, 
            private servcio:DataService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(p =>{
      this.id = p.id;
    });

    this.servcio.getLapso().subscribe(p=>{
      let ar = [];
      for(let i=0; i < p.length; i++){
        ar.push(p[i]);
      }
      let n = ar.pop();
      this.ultimoLapso = n['lapsoAcademico'];

    });
    
    this.servcio.getDocentesId(this.id).subscribe(p=>{

      this.datos = p.filter(p1=>{
       return  p1['lapsoAcademico'] === this.ultimoLapso;  
      })
      
    });

    this.lapso = this.servcio.getLapso();

  }

  selection(event){
    
    this.servcio.getDocentesId2(this.id,event.detail.value).subscribe(p=>{

      this.datos = p;
    });
    
  }


}
