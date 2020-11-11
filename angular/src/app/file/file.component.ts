import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpEvent } from '@angular/common/http';
import { concatAll, map } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
import { FilesService } from './files.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  title = 'resumable-upload-file';
  files: File[] = [];
  selectedFile: File; // Resumable File Upload Variable
  name; // Resumable File Upload Variable
  uploadPercent; // Resumable File Upload Variable
  color = 'primary'; // Mat Spinner Variable (Resumable)
  mode = 'determinate'; // Mat Spinner Variable (Resumable)
  value = 50.25890809809; // Mat Spinner Variable (Resumable)


  config = {
    multiple: true,
    showSubmitButton: true,
    folderToSaveInServer: 'kkkkkk',
    propertyStringToParent: new Subject(),
    propertyStringToUploader: new Subject(),
    eventSubmitToUploader: new Subject(),
  }

  constructor(private service: FilesService) { }


  ngOnInit() {

    this.config.propertyStringToParent.subscribe(r => console.log(r));

    setTimeout(() => {
      this.config.propertyStringToUploader.next('');
    }, 100);
  }

  submit() {
    this.config.eventSubmitToUploader.next(true);
  }

  /* Code For Resumable File Upload Start*/
  goToLink(url: string) {
    window.open(url, '_blank');
  }

  onFileSelect(event) {
    this.selectedFile = event.target.files[0]; // User selected File
    const fls = event.target.files as FileList; // User selected File

    for (let i = 0; i < fls.length; i++) {
      // on récupère le i-ème fichier
      const file = fls.item(i);

      this.files.push(file);
    }

    this.name = this.selectedFile.name;
    // console.log(this.selectedFile);
  }

  resumableUpload() {
    // checks file id exists or not, checks on name and last modified
    this.service.get(this.selectedFile).subscribe((res: any) => {
      console.log(JSON.stringify(res));

      if (res.status === 'file is present') {
        alert('File already exists. Please choose a different file.');
        return;
      }

      console.log('post req')
      this.service.post(this.selectedFile, res).subscribe((r: any) => {
        console.log('post res')
        if (r.type === HttpEventType.UploadProgress) {
          this.uploadPercent = Math.round((100 * r.loaded) / r.total);
          console.log(this.uploadPercent);
          if (this.uploadPercent >= 100) {
            this.name = '';
            this.selectedFile = null;
          }
        } else {
          console.log(JSON.stringify(r));
          if (this.uploadPercent >= 100) {
            this.name = '';
            this.selectedFile = null;
          }
        }
      },
        e => console.warn(e)
      );
    });
  }

  simpleUpload() {
    const formData = new FormData();
    console.log(this.files)

    const obs = [];
    this.files.forEach(e => {

      const name = `${e.size}_${e.lastModified}_${e.name}`;

      formData.append('files', e, name);

      obs.push(this.service.upload0(formData, 'my').pipe(map(r => this.getEventMessage(r, e))))

    });

    from(obs).pipe(concatAll()).subscribe(r => {
      console.log(r);
    });
    // const name = this.selectedFile.name;

    // formData.append('file', this.selectedFile, name);

    // this.service.upload0(formData, 'my').subscribe(r => {
    //   const x = this.getEventMessage(r, this.selectedFile);
    //   console.log(x);
    // });

  }


  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name.substring(0, 10)}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name.substring(0, 10)}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name.substring(0, 10)}" was completely uploaded!`;

      default:
        return `File "${file.name.substring(0, 10)}" surprising upload event: ${event.type}.`;
    }
  }
}

