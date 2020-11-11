import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { LoaderInterceptor } from './loader-interceptor';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        // height: '200px',
        right: 0,
        // backgroundColor: 'yellow'
      })),
      state('closed', style({
        // height: '100px',
        // opacity: 0.5,
        right: '-52px',
        // backgroundColor: 'green'
      })),
      transition('open <=> closed', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class LoaderComponent implements OnInit {
  isOpen = true;
  constructor(public loader: LoaderService) { }

  ngOnInit() {
    // this.loader.isLoading.subscribe(
    //   r => {
    //     console.log('loader = ', r);
    //   },
    //   e => console.log(e)
    // );
  }
}
