import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowcaseDialogComponent } from '../../../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogRef } from '@nebular/theme';
import { CountryService } from '../../../services/country.service';
import { ICountry } from '../../../models/country';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ngx-modal-aoe-country',
  templateUrl: './modal-aoe-country.component.html',
  styleUrls: ['./modal-aoe-country.component.scss']
})
export class ModalAoeCountryComponent implements OnInit {

  // @Input() title: string;
  @Output() onAdd = new EventEmitter();
  

  @Input() row;
  @Input() modalAction;


  onButtonClick() {
    this.onAdd.emit();
  }
  
  countries : ICountry[] = [];
  testVar: any;

  constructor(
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    protected ref: NbDialogRef<ModalAoeCountryComponent>) {}

    ngOnInit() {
      console.log('row', this.row.data);
      
      console.log(this.testVar);
      // console.log('logiran row:', this.row.id);
      
      
      this.getCountries();

      if(this.row.data) {
        console.log('ima datu i usao je');
        
        this.modalCountryGroup.patchValue({
          countryId: this.row.data.id,
          name: this.row.data.name,
        });
      }
    }
      // console.log(this.modalCountryGroup.value);
      

    modalCountryGroup: FormGroup = this.formBuilder.group({
      countryId: [null],
      name: ['', Validators.required],
      // activeFrom: [null],
    });
    
  dismiss() {
    this.ref.close();
  }

  // getters for reactive form
  get countryId(): AbstractControl {
    return this.modalCountryGroup.get('countryId');
  }

  get name (): AbstractControl {
    return this.modalCountryGroup.get('name');
  }



  submitCountry() {
    console.log('submit usao');
    
    console.log(this.modalCountryGroup.value);
    if(!this.modalCountryGroup.valid) {
      return;
    } else {
      this.countryService.saveCountry(this.modalCountryGroup.value).pipe(take(1)).subscribe(data => {
        // this.dismiss();
        console.log('odradio servis');
        this.dismiss();
        this.getCountries();
        
      });
    }
  }

  editCountry() {
    console.log('usao u edit');
    
    // console.log(this.modalNoteGroup)
    if(!this.modalCountryGroup.valid) {
      return;
    } else {
      this.countryService.editCountry(this.row.data.id,this.modalCountryGroup.value).pipe(take(1)).subscribe(data => {
        this.dismiss();
      });
    }
  }

  deleteCountry() {
    this.countryService.deleteCountry(this.row.id).pipe(take(1)).subscribe(data => {
      this.dismiss();
    });
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      data => { this.countries = data; }
    )
  }
}
