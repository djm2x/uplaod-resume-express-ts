import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { from, Subject } from 'rxjs';
import { concatAll, map } from 'rxjs/operators';
import { FileUploadService } from '../file.upload.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  files: File[] = [];
  folder = '';
  list: { fileId: number, name: string, progressValue: Subject<number> }[] = [];
  uploadCompleted = 0;

  constructor(private bottomSheetRef: MatBottomSheetRef<any>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: IData
    , private service: FileUploadService) { }

  ngOnInit() {
    try {
      this.handleUpload();

    } catch (e) {
      console.warn(e)
    }

  }

  handleUpload() {
    this.files = this.data.files;
    this.folder = this.data.folder;

    const formData = new FormData();

    const obs = [];
    this.list = [];

    this.files.forEach(e => {

      const name = `${e.size}_${e.lastModified}_${e.name}`;

      this.list.push({ fileId: e.size + e.lastModified, name: e.name, progressValue: new Subject() });

      formData.append('files', e, name);

      obs.push(this.service.uploadFiles(formData, this.folder).pipe(map(r => this.getEventMessage(r, e))))

    });

    from(obs).pipe(concatAll()).subscribe(r => {
      // console.log(this.getControl().controls.map(e => e.value.progressValue))

      if (this.list.length === this.uploadCompleted) {
        setTimeout(() => {
          this.bottomSheetRef.dismiss('.');
        }, 500);
      }
    });
  }

  updateListOfProgress(fileId: number, progressValue: number) {
    const i = this.list.findIndex(e => +e.fileId === +fileId);

    if (i > -1) {
      this.list[i].progressValue.next(progressValue);
    }
  }

  trackFn(i: number, e: any) {
    return e.progressValue;
  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name.substring(0, 10)}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.updateListOfProgress(file.size + file.lastModified, percentDone);
        return `File "${file.name.substring(0, 10)}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        // this.updateListOfProgress(file.size + file.lastModified, 100)
        this.uploadCompleted ++;

        return `File "${file.name.substring(0, 10)}" was completely uploaded!`;

      default:
        return `File "${file.name.substring(0, 10)}" surprising upload event: ${event.type}.`;
    }
  }

}

interface IData {
  files: File[];
  folder: string;
}

