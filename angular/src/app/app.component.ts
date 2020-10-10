import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEventType
} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FilesService } from './files.service';


const URL = 'http://localhost:3001/api/files';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'resumable-upload-file';

  selectedFile: File; // Resumable File Upload Variable
  name; // Resumable File Upload Variable
  uploadPercent; // Resumable File Upload Variable
  color = 'primary'; // Mat Spinner Variable (Resumable)
  mode = 'determinate'; // Mat Spinner Variable (Resumable)
  value = 50.25890809809; // Mat Spinner Variable (Resumable)

  constructor(private http: HttpClient, private service: FilesService) { }
  ngOnInit() { }

  /* Code For Resumable File Upload Start*/
  goToLink(url: string) {
    window.open(url, '_blank');
  }

  onFileSelect(event) {
    this.selectedFile = event.target.files[0]; // User selected File
    this.name = this.selectedFile.name;
    console.log(this.selectedFile);
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


    const name = this.selectedFile.name;

    formData.append('file', this.selectedFile, name);

    this.service.upload0(formData, 'my').subscribe(r => {
      console.log(r);
    });

  }
}
