import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-download-sheet',
  templateUrl: './download-sheet.component.html',
  styleUrls: ['./download-sheet.component.scss']
})
export class DownloadSheetComponent implements OnInit {

  list: string[] = [];
  folder = '';
  constructor(private bottomSheetRef: MatBottomSheetRef<DownloadSheetComponent>
    , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, @Inject('BASE_URL') public url: string) { }

  ngOnInit() {
    const l = this.data.fileName.split(';');

    l.pop();

    this.folder = this.data.folder;
    this.list = l;
  }

  async openLink(fileName/*event: MouseEvent*/) {
    // this.bottomSheetRef.dismiss();
    // console.log(p);
    const url = `${this.url}/${this.folder}/${fileName}`;
    window.open(url);
    // try {
    //   await this.uow.rapports.download(p).toPromise();
    // } catch (e) {
    //   console.warn(e);
    // }

    // event.preventDefault();
  }

}
