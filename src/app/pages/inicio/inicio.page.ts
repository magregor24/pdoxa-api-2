import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  cedula1;
  usuario1:string;
  doce:any;
 

  constructor(private dataService: DataService, 
              private router:Router,
              public nav:NavController,
              public toastCrl:ToastController) { }

  ngOnInit() {}

  validarUsuarioss(){
   
    this.doce = this.dataService.getValidarUsuario(this.usuario1,this.cedula1);
    
    this.doce.forEach(e => {
      
      if(e[0].valid == 'true'){
        this.dataService.idProfe.emit(e[0].id);
        let NavigationExtras:NavigationExtras = {
          queryParams:{
            id: e[0].id,
            usuario: this.usuario1,
            cedula: this.cedula1,
          }
          
        }
        
        this.router.navigate(['/principal'],NavigationExtras);
      
      }else{
  
        this.presentToast('Datos Incorrectos');
      }

    })

   }


   async presentToast(message:string){
    const toast = await this.toastCrl.create({
      message:message,
      color:'danger',
      duration:2000
    });
    toast.present();
  }
}
