import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-list-hardware',
  templateUrl: './list-hardware.component.html',
  styleUrls: ['./list-hardware.component.css']
})
export class ListHardwareComponent implements OnInit {
  hardware: any[] = [];
  constructor(private _hardwareService: HardwareService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getHardware();
  }

  getHardware() {
    this._hardwareService.getHardware().subscribe(data => {
      this.hardware = [];
      data.forEach((element: any) => {
        this.hardware.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  deleteHardware(id: string) {
    this._hardwareService.deleteHardware(id).then(() => {
      console.log('Hardware eliminado con exito!');
      this.toastr.error('Hardware eliminado con exito!', 'Hardware eliminado', {
        positionClass:'toast-bottom-right'});
    }).catch(error => {
      console.log(error);
    })
  }

}
