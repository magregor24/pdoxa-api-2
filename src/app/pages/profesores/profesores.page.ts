import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {

  profesores;
  textoBuscar = '';
  a:number = 10;
  constructor(private datos:DataService, private modalCtrl:ModalController) { }

  ngOnInit() {

    this.datos.getDocentes(this.a)
    .subscribe(docentes => {
      this.profesores = docentes;
    })
  }


  buscar(event){
    this.textoBuscar = event.detail.value; 
    this.datos.getDocentes(this.a+=100)
      .subscribe(docentes => {
        this.profesores = docentes;
      })
      
  }


  loadData(event){
    
    console.log('Cargando.......');

    setTimeout(()=> {
      
     this.datos.getDocentes(this.a+=100)
      .subscribe(docentes => {
        this.profesores = docentes;
      })
      console.log(this.profesores);
       event.target.complete();
  
     },200);

  }

  
  async profe(p){

    const modal = await this.modalCtrl.create({
       component: ModalInfoPage,
       componentProps: {
         id: p.id
         
       }
 
     });
 
     await modal.present();

   }

}
