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
  admin;
 

  constructor(private dataService: DataService, 
              private router:Router,
              public nav:NavController,
              public toastCrl:ToastController) { }

  ngOnInit() {}

  validarUsuarioss(){
   
    this.doce = this.dataService.getValidarUsuario(this.usuario1,this.cedula1);
    this.admin = this.dataService.getValidarUsuarioAdmin(this.usuario1,this.cedula1);
    
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
      
      }else if(this.admin){
        
        this.admin.forEach(ele =>{
          
          if(ele[0].role === 'admin'){
            let administrador:NavigationExtras = {
              queryParams:{
                admin: ele[0].role,
                active:true
              }
  
            }
            this.router.navigate(['/principal'],administrador);

          }else{

            this.presentToast('Datos Incorrectos');
          }
        })
        
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
