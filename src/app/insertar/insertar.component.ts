import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../-servicio/mascota.service';
import { Mascota } from '../-modelo/mascota';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-insertar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './insertar.component.html',
  styleUrl: './insertar.component.css'
})
export class InsertarComponent {
  form: FormGroup;
  idMascota: number = 0;
  edicion: boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private servicio: MascotaService
  ) {
    this.form  = new FormGroup({
      'idMascota': new FormControl(0),
      'nombre': new FormControl(""),
      'idDueno': new FormControl(0),
      'qr': new FormControl(""),
      'especie': new FormControl(""),
      'raza': new FormControl(""),
      'fechaNacimiento': new FormControl(new Date())
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.idMascota =data ['idMascota'];
      this.edicion = data['idMascota'] != null;
      this.formaFomulario();
    });
  }

    formaFomulario() {
      if(this.edicion) {
        this.servicio.mostrarPorId(this.idMascota).subscribe(data => {
          this.form.patchValue(data);
        });
      }
    }

    operar() {
      let m: Mascota = {
      'idMascota': this.form.value['idMascota'],
      'nombre': this.form.value['nombre'],
      'idDueno': this.form.value['idDueno'],
      'qr': this.form.value['qr'],
      'especie': this.form.value['especie'],
      'raza': this.form.value['raza'],
      'fechaNacimiento': this.form.value['fechaNacimiento']
      };

    const operation = this.edicion ? this.servicio.modificar(m) : this.servicio.insertar(m);

    operation.pipe(
      switchMap(() => this.servicio.mostrarTodos())
    ).subscribe(data => {
      this.servicio.mascotaCambio.next(data);
      this.router.navigate(['']);
     });
    }
  }


