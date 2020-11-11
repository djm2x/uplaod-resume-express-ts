import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UowService } from 'src/app/services/uow.service';
import { SessionService } from 'src/app/shared';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { SnackBarService } from 'src/app/loader/snack-bar.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  myForm: FormGroup;
  o = new User();
  hide = true;
  hide2 = true;
  checkPassword = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, public uow: UowService
    , private router: Router, public session: SessionService
    , public snackBar: SnackBarService) { }

  async ngOnInit() {
    // test
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [this.o.id],
      nom: [this.o.nom],
      prenom: [this.o.prenom],
      email: [this.o.email, [Validators.required, Validators.email]],
      password: [this.o.password, [Validators.required]],
      // codeOfVerification: [this.o.codeOfVerification],
      date: [this.o.date],
      imageUrl: [this.o.imageUrl],
      role: [this.o.role],
      isActive: [this.o.isActive],
      // idService: [null],
      // idFonction: [null],
      // idRole: [3],
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

  submit(o: User) {

    this.uow.accounts.create( o).subscribe((r: any) => {
      if (r.code < 0) {
        this.snackBar.notifyAlert(400, r.message);
      } else {
        this.snackBar.notifyOk(200, `Lien d'activation a été envoyer a votre email`);
        this.router.navigate(['/auth']);
      }
    });
  }

  resetForm() {
    this.o = new User();
    this.createForm();
  }
}
