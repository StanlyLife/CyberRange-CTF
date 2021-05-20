import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueArray',
})
export class ValueArrayPipe implements PipeTransform {

  // El parametro object representa, los valores de las propiedades o indice
  transform(objects : any = []) {
    return Object.values(objects);
  }
}