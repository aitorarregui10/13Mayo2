import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertarComponent } from '../insertar/insertar.component';
import { MascotaService } from '../-servicio/mascota.service';
import { Mascota } from '../-modelo/mascota';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, InsertarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private servicio:MascotaService){}
  mascotas: Mascota [] = [];

  ngOnInit(): void {
    this.servicio.mascotaCambio.subscribe((data) => 
      {this.mascotas = data})
    

    this.servicio.mostrarTodos().subscribe(datos => 
      {this.mascotas = datos; console.log("entra el dato");
    })
  }

  eliminar(idMascota:number){
    this.servicio.eliminar(idMascota)
      .subscribe(()=>{
        this.servicio.mostrarTodos()
          .subscribe(data=>this.servicio.mascotaCambio.next(data))
    })
  }

  recibirAviso(listaActualizada:Observable<Mascota[]>){
    console.warn("regresa el padre -----")
    this.servicio.mostrarTodos().subscribe(datos => 
      {this.mascotas = datos; console.log("entran datuskos");
    })
  }
}
