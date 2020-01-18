import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IonMenu, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  //@ViewChild('menu') menu:IonMenu;
  id = 0;
  id2;
  
  constructor(public router:Router, private data:DataService) {}

  ngOnInit() {

    this.data.id$.subscribe(p =>{
      this.id = p;
    })

    this.data.idProfe.subscribe(p =>{
      this.id2 = p;
    })

  }

  click(){
     this.id = 0;
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
