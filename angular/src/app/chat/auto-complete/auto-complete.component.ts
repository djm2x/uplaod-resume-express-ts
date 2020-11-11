import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SuperService } from 'src/app/services/super.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);
  // filter
  myAuto = new FormControl('');
  filteredOptions: Observable<any>;

  @Input() list: SuperService<any>;
  @Input() field: string;
  @Input() label: string;
  @Output() selectedChange = new Subject<any>();
  constructor() { }

  ngOnInit(): void {
    this.autoComplete();

    this.filteredOptions.subscribe(r => {
      console.log(r)
    })
  }

  autoComplete() {
    this.filteredOptions = this.myAuto.valueChanges.pipe(
      // startWith(''),
      switchMap((value: string) => value.length > 1 ? this.list.autocomplete(this.field, value) : []),
      // map(r => r)
    );
  }

  selected0(event: MatAutocompleteSelectedEvent): void {
    // const o = event.option.value as any;
    // console.log(o);
    // this.idOrganisme = o.id;
    // this.selectedChange.next(o);
    // this.myAuto.setValue(o.label);
    // (this.myForm.get('idOrganisme') as FormControl).setValue(o.id);
  }

  selected(o): void {
    // this.idOrganisme = o.id;
    this.selectedChange.next(o);
    // this.myAuto.setValue(o.label);
    // (this.myForm.get('idOrganisme') as FormControl).setValue(o.id);
  }

  clear() {
    this.myAuto.setValue('');
    this.selectedChange.next(null);
  }

}
