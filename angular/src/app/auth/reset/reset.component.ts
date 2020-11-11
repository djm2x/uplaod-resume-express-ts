import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UowService } from 'src/app/services/uow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/shared';
import { User } from 'src/app/models/models';
import { SnackBarService } from 'src/app/loader/snack-bar.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  myForm: FormGroup;
  o = new User();
  code = '';
  hide = true;
  hide2 = true;
  checkPassword = new FormControl('', [Validators.required]);
  isEmailChecked = false;

  constructor(private fb: FormBuilder, public uow: UowService
    , private router: Router, public session: SessionService
    , private route: ActivatedRoute, public snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code) {
      const codeDecoded = atob(this.code).split('*');
      const [ email, id, date] = codeDecoded;
      this.o.email = email;
      this.isEmailChecked = true;
    }
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      email: [this.o.email, [Validators.required, Validators.email]],
      password: [this.o.password, this.isEmailChecked ? [Validators.required] : []],
    });
  }

  get email() { return this.myForm.get('email'); }
  get password() { return this.myForm.get('password'); }

  get emailError() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  get passwordError() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  get checkPasswordError() {
    return this.checkPassword.hasError('required') ? 'You must enter a value' :
      (this.checkPassword.value !== this.password.value ? 'les mot de pass sont pas les même' : '');
  }

  async sendEmailForResetPassword(email) {
    this.uow.accounts.sendEmailForResetPassword(email, 'auth%2Freset', 'fr').subscribe((r: any) => {
      if (r.code === -1) {
        console.log(r.message);
        this.snackBar.notifyAlert(400, r.message);
      } else {
        console.log(r.message);
        this.snackBar.notifyOk(200, r.message);
        this.router.navigate(['/auth/login']);
      }
    }, e => {
      console.log(e.error);
    });

  }

  resetPassword(password: string) {
    this.uow.accounts.resetPassword({ email: this.o.email, password }).subscribe((r: any) => {
      if (r.code === -1) {
        console.log('Email Incorrect');
      } else if (r.code === 1) {
        console.log(r.message);
        this.router.navigate(['/auth/login']);
      } else {

      }
    }, e => {
      console.log(e.error);
    });
  }

}
