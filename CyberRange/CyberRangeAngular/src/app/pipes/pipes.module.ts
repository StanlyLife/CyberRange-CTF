import { BrowserModule } from '@angular/platform-browser';
import { ValueArrayPipe } from './value-array.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountDownPipe } from './count-down.pipe';
import { CountDownHourPipe } from './count-down-hour.pipe';
import { SortPipe } from './sort.pipe';



@NgModule({
  declarations: [
    ValueArrayPipe,
    CountDownPipe,
    CountDownHourPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [ValueArrayPipe, CountDownPipe, CountDownHourPipe, SortPipe]
})
export class PipesModule { }
