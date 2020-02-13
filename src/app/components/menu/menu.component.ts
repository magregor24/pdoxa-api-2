import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  id2;
  item = 0;
  us;
 
  constructor(public router:Router, private data:DataService,
    public alertController: AlertController,
    public toastCrl:ToastController,private route:ActivatedRoute) {

      this.route.queryParams.subscribe(params =>{
       
       this.us = params.usuario;
      
      })
 
    }

  ngOnInit() {

    this.data.idProfe.subscribe(p =>{
      this.id2 = p;
    })

  }

  click(){
    this.router.navigate(['/inicio']);
    
  
  }

   
    
 modalPag(event){
 
 let Navi:NavigationExtras = {
  queryParams:{
    id: this.id2,
    dia:event.target.innerText
  }
}

this.router.navigate(['/modal'],Navi);

}


}
