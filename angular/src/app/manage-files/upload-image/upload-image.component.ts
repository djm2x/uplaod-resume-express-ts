import { FileUploadService } from '../file.upload.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  listOfNames: string[] = [];
  imagesToShow: string[] = [];
  listToDelete: string[] = [];
  files: File[] = [];
  @Input() nameBtn = '';
  @Input() folderToSaveInServer = 'folder';
  //
  @Input() multiple = false;
  oneImage = 'assets/404.jpg';
  Images = [];

  @Input() propertyOfParent = new Subject();
  @Input() eventSubmitToParent = new Subject();
  @Input() eventSubmitFromParent = new Subject();

  constructor(private filesService: FileUploadService, @Inject('BASE_URL') private url: string) { }

  ngOnInit() {
    this.propertyOfParent.subscribe((r: string) => {
      if (!r) {
        return;
      }
      const l = r.split(';');

      l.pop();

      this.listOfNames = l;
      this.listToDelete = [];
      console.log(l);

      if (!this.multiple) {
        const imageUrl = l.length !== 0 ? l[0] : null;
        if (imageUrl !== null && imageUrl.startsWith('http')) {
          this.oneImage = imageUrl;
        } else if (!imageUrl) {
          this.oneImage = 'assets/404.jpg';
        } else {
          // console.log(imageUrl);
          this.oneImage = `${this.url}/${this.folderToSaveInServer}/${imageUrl}`;
        }
      } else {
        l.forEach((e, i) => {
          const imageUrl = e;
          if (imageUrl !== null && imageUrl.startsWith('http')) {
            this.Images[i] = { name: imageUrl, image: imageUrl };
          } else if (!imageUrl) {
            this.Images[i] = { name: 'assets/404.jpg', image: 'assets/404.jpg' };
          } else {
            const im = `${this.url}/${this.folderToSaveInServer.replace('_', '/')}/${imageUrl}`;
            this.Images[i] = { name: im, image: im };
          }
        });
      }
    });
    //
    this.eventSubmitFromParent.subscribe(async r => {
      await this.submit(r);
    });


  }

  upload(files: FileList) {
    if (this.multiple) {
      const s = files;
      // let file = null;
      for (let i = 0; i < files.length; i++) {
        // on récupère le i-ème fichier
        const file = files.item(i);

        this.listOfNames.push(this.setFileName(file));
        this.sendPropertyOfParent();

        this.files.push(file);

        // this.Images = [];
        this.files.forEach((f, j) => {
          const reader = new FileReader();

          reader.onload = () => {
            const i0 = this.Images.findIndex(e => this.setFileName(f).includes(e.name));
            if (i0 === -1) {
              this.Images.push({ name: this.setFileName(f), image: reader.result.toString() });
            }
          };

          reader.readAsDataURL(f);
        });
      }
    } else {
      const file = files.item(0);
      this.listOfNames = [];
      this.listOfNames.push(this.setFileName(file));
      this.sendPropertyOfParent();
      this.files = [];
      this.files.push(file);

      this.handleFileInput(file);
    }

  }

  fileToImageFrom() {
    // this.files.forEach(e => {

    //   const reader = new FileReader();

    // // const p = new Promise(r => reader.onload = () => r(reader.result.toString()));
    //   reader.onload = () => {
    //     imgUrl = reader.result.toString();
    //     console.log("1")
    //     // console.log(reader.result.toString())
    //   }

    //   reader.readAsDataURL(file);
    // })
  }

  // fileToImage(file: File) {
  //   console.log(file.name)
  //   let imgUrl = null;
  //   const reader = new FileReader();

  //   // const p = new Promise(r => reader.onload = () => r(reader.result.toString()));
  //   reader.onload = () => {
  //     imgUrl = reader.result.toString();
  //     console.log("1")
  //     // console.log(reader.result.toString())
  //   }

  //   reader.readAsDataURL(file);
  //   console.log("2")

  //   setTimeout(() => {}, 500)

  //   return imgUrl;
  // }

  handleFileInput(file: File) {
    const reader = new FileReader();

    reader.onload = () => this.oneImage = reader.result.toString();

    reader.readAsDataURL(file);
  }


  imgError(img: any) {

    img.src = 'assets/404.jpg';
  }

  setIcon(filaName) {
    const i = filaName.lastIndexOf('.');
    const s = filaName.substring(i + 1);
    // console.log(s);
    return (s === 'pdf' || s === 'pdf;') ? 'assets/svg/pdf.svg' : 'assets/svg/word.svg';
  }

  removeFromImages(name: string) {

    const i0 = this.Images.findIndex(e => name.includes(e.name));
    this.Images.splice(i0, 1);


    const i = this.listOfNames.findIndex(e => name.includes(e));
    // console.log(i, this.listOfNames)
    this.listToDelete.push(this.listOfNames[i]);
    if (i !== -1) {
      this.listOfNames.splice(i, 1);
      this.sendPropertyOfParent();
    }


    // console.log(this.listToDelete)

    // delete from Files

    const indexOf_ = name.indexOf('_');

    const fileName = name.substring(indexOf_);

    const indexFileName = this.files.findIndex(e => e.name === fileName);

    if (indexFileName !== -1) {
      this.files.splice(i, 1);
    }
  }

  remove(name: string) {

    const i = this.listOfNames.findIndex(e => name.includes(e));
    // console.log(i, this.listOfNames)
    this.listToDelete.push(this.listOfNames[i]);
    if (i !== -1) {
      this.listOfNames.splice(i, 1);
      this.sendPropertyOfParent();
    }


    // console.log(this.listToDelete)

    // delete from Files

    const indexOf_ = name.indexOf('_');

    const fileName = name.substring(indexOf_);

    const indexFileName = this.files.findIndex(e => e.name === fileName);

    if (indexFileName !== -1) {
      this.files.splice(i, 1);
    }

    // if mutli is false
    this.oneImage = 'assets/404.jpg';
  }

  openInput(o/*: HTMLInputElement*/) {
    o.click();
  }

  sendPropertyOfParent() {
    let propertyOfParent = '';

    this.listOfNames.forEach(r => {
      propertyOfParent += `${r};`;
    });

    this.eventSubmitToParent.next(propertyOfParent);
  }

  async submit(value) {

    const formData = new FormData();

    this.files.forEach(e => {

      const name = this.setFileName(e);

      formData.append('file', e, name);
      console.log(e)
    });


    if (formData) {
      if (value.id && !this.folderToSaveInServer.includes('_')) {
        this.folderToSaveInServer = `${this.folderToSaveInServer}_${value.id}`;
      }
      const r = await this.filesService.uploadFiles(formData, this.folderToSaveInServer).toPromise();
      const r2 = await this.filesService.deleteFiles(this.listToDelete, this.folderToSaveInServer).toPromise();

      console.log(r, r2)
    }

    // if (action.name && action.name === 'delete') {
    //   const r2 = await this.filesService.deleteFiles([action.file], this.folderToSaveInServer).toPromise();
    // }
  }

  setFileName(e: File) {
    // console.log(e)
    return `${e.lastModified}_${e.name}`;
  }

}
