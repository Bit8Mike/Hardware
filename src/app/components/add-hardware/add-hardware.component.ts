import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HardwareService } from 'src/app/services/hardware.service';
import { Base64 } from 'js-base64';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-hardware',
  templateUrl: './add-hardware.component.html',
  styleUrls: ['./add-hardware.component.css']
})
export class AddHardwareComponent implements OnInit {

  archivos: any = [];
  addHardware: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = "Agregar Hardware";
  textButton = "Agregar";
  button = true;
  


  constructor(private fb: FormBuilder,
    private _hardwareService: HardwareService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.addHardware = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }


  agregarEditarHardware() {
    this.submitted = true;
    if (this.addHardware.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarHardware();
    } else {
      this.editarHardware(this.id);
    }
  }

  agregarHardware() {
    this.submitted = true;
    if (this.addHardware.invalid) {
      return;
    }
    const hardware: any = {
      nombre: this.addHardware.value.nombre,
      marca: this.addHardware.value.marca,
      descripcion: this.addHardware.value.descripcion,
      precio: this.addHardware.value.precio
    }
    this.loading = true;
    this._hardwareService.addHardware(hardware).then(() => {
      this.toastr.success('Hardware registrado con exito!', 'Hardware registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-hardware'])
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarHardware(id: string) {

    const hardware: any = {
      nombre: this.addHardware.value.nombre,
      marca: this.addHardware.value.marca,
      descripcion: this.addHardware.value.descripcion,
      precio: this.addHardware.value.precio
    }
    this.loading = true;

    this._hardwareService.updateHardware(id, hardware).then(() => {

      this.toastr.info('Hardware modificado con exito!', 'Hardware modificado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-hardware'])
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })

  }

  esEditar() {

    if (this.id != null) {
      this.loading = true;
      this.titulo = "Editar Hardware";
      this.textButton = "Editar";
      this.button = false;
      this._hardwareService.getOneHardware(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.addHardware.setValue({
          nombre: data.payload.data()['nombre'],
          marca: data.payload.data()['marca'],
          descripcion: data.payload.data()['descripcion'],
          precio: data.payload.data()['precio']
        })
      })
    }
  }


}
