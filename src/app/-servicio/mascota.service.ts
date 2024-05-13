import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Entorno } from '../-entorno/entorno';
import { Mascota } from '../-modelo/mascota';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private url: string = "${entorno.HOST}/mascotas";
  mascotaCambio = new Subject<Mascota[]>();

  constructor(private http:HttpClient) { }

  mostrarTodos(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(this.url)
    .pipe(map(data => {return data.sort((a,b) => a.idMascota-b.idMascota)})
    )
  };

  mostrarPorId(idMascota:number){
    return this.http.get<Mascota>(`${this.url}/${idMascota}`);
  }

  insertar(m:Mascota){
    return this.http.post(this.url, m);
  }

  modificar(m:Mascota){
    return this.http.put(this.url, m);
  }

  eliminar(idMascota: number){
    return this.http.delete<number>(`${this.url}/${idMascota}`);
  };


}
