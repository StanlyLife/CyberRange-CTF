import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrGlobalService {

  constructor(private toastr: ToastrService) { 

    
  }

}
