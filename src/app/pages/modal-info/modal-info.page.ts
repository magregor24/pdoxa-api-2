import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() id;
  datos;
  nombre;
  apellido;
  telefono;
  email;
  ultimoLapso;
  constructor(private modalCtrl: ModalController, private data:DataService) { }

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

      this.datos = p.filter(p1=>{
        this.nombre = p1['nombre'];
        this.apellido = p1['apellido'];
        this.telefono = p1['telefono'];
        this.email = p1['email'];
       return  p1['lapsoAcademico'] === this.ultimoLapso;  
      })
      
    })
    
  }

  salirSinArgumento(){
    this.modalCtrl.dismiss();
  }

}
