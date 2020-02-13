import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  idProfe = new EventEmitter<number>();
  change = new EventEmitter<boolean>();
  constructor( private http:HttpClient) { }


  getDocentes(pa){
    return this.http.get('http://localhost/APIPDOXA/docentes/'+pa);
  }

  getDocentesId(id){
    return this.http.get<[]>('http://localhost/APIPDOXA/docenteId/'+id);
  }

  getDocentesId2(id1,id2){
    return this.http.get('http://localhost/APIPDOXA/prueba3/'+id1+"/"+id2);
  }


  getLapso(){
    return this.http.get<[]>('http://localhost/APIPDOXA/periodos');
  }

  getValidarUsuario(id1,id2){
    return this.http.get('http://localhost/APIPDOXA/validarUser/'+id1+"/"+id2);
  }

  getValidarUsuarioAdmin(id1,id2){
    return this.http.get('http://localhost/APIPDOXA/ValidarUserAdmin/'+id1+"/"+id2);
  }
}
