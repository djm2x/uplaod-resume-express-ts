import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { DownloadSheetComponent } from './download-sheet/download-sheet.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FileUploadService } from './file.upload.service';
import { MatButtonModule } from '@angular/material/button';
import { ProgressComponent } from './progress/progress.component';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UploadComponent,
    DownloadSheetComponent,
    UploadImageComponent,
    ProgressComponent,
  ],
  imports: [
    CommonModule,
    // MatModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    //
    HttpClientModule,
  ],
  exports: [
    UploadComponent,
    DownloadSheetComponent,
    UploadImageComponent,
  ],
  providers: [
    FileUploadService,
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    ProgressComponent,
  ],
})
export class ManageFilesModule { }
