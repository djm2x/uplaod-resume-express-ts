import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileRoutingModule } from './file-routing.module';
import { FileComponent } from './file.component';
import { MatModule } from '../mat.module';
import { ManageFilesModule } from '../manage-files/manage-files.module';


@NgModule({
  declarations: [FileComponent],
  imports: [
    CommonModule,
    FileRoutingModule,
    MatModule,
    ManageFilesModule,
  ]
})
export class FileModule { }
