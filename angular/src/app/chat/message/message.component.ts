import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { merge, Subject, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Discussion, Message, User } from 'src/app/models/models';
import { UowService } from 'src/app/services/uow.service';
import { SessionService } from 'src/app/shared';
import { ChatHubService } from '../chat.hub.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;
  @Input() info = new Subject<{ idDiscussion: number, me: User, otheruser: User }>();
  info2: { idDiscussion: number, me: User, otheruser: User } = null;

  list: Message[] = [];
  discussion = new Discussion();
  o = new Message();
  update = new Subject();
  subs: Subscription[] = [];

  myForm: FormGroup;
  myFormMessage: FormGroup;


  constructor(private uow: UowService, public session: SessionService
    , private chat: ChatHubService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.createFormMessage();
    const sub = merge(...[this.info, this.update]).pipe(startWith(null as any)).subscribe(r => {
      console.log(r);
      this.info2 = r;
      // try {
      //   r = r ? r : JSON.parse(atob(localStorage.getItem('selectedUser'))) ;
      // } catch (e) { }

      if (r) {
        // localStorage.setItem('selectedUser', btoa(JSON.stringify(r)));
        this.discussion.id = r.idDiscussion;
        this.discussion.idSender = r.me.id;
        this.discussion.idReceiver = r.otheruser.id;
        this.discussion.sender = r.me;
        this.discussion.receiver = r.otheruser;

        this.getContacts(this.discussion.id);
        this.createForm();
        this.createFormMessage();
      }

    });

    this.subs.push(sub);


    this.scrollToBottom();

    this.chat.newMessage.subscribe(r => {
      console.log(r);
      this.list.push(r);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getContacts(idDiscussion) {
    this.uow.messages.getMessages(idDiscussion).subscribe(r => {
      console.log(r)
      this.list = r;
    });
  }

  isYou(id) {
    // return true;
    return +id === +this.session.user.id;
  }

  nameUser(e: Message) {
    // console.log(e)
    if (+e.idSender === +this.session.user.id) {
      return `${this.session.user.nom} ${this.session.user.prenom}`;
    } else {
      return e.otherUserName;
      return e.receiver.nom + ' ' + e.receiver.prenom;
    }
    // return e.otheruser.nom + ' ' + e.otheruser.prenom;
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  displayName(u: any) {
    return u.userName !== '' ? u.userName : u.email.substring(0, u.email.indexOf('@'));
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }

  // formulaire
  createForm() {
    this.myForm = this.fb.group({
      id: [this.discussion.id, [Validators.required,]],
      unReaded: [this.discussion.unReaded, [Validators.required,]],
      date: [this.discussion.date, [Validators.required,]],
      idMe: [this.discussion.idSender, [Validators.required,]],
      idOtherUser: [this.discussion.idReceiver, [Validators.required,]],
    });
  }

  createFormMessage() {
    this.myFormMessage = this.fb.group({
      id: [this.o.id, [Validators.required,]],
      object: [this.o.object, [Validators.required,]],
      message: [this.o.message, [Validators.required,]],
      vu: [this.o.vu, [Validators.required,]],
      date: [this.o.date, [Validators.required,]],
      idCours: [this.o.idCours, [Validators.required,]],
      otherUserName: [this.discussion.sender.nom + ' ' + this.discussion.sender.prenom, [Validators.required,]],
      otherUserImage: [this.discussion.sender.imageUrl, [Validators.required,]],
      idMe: [this.discussion.idSender, [Validators.required,]],
      idOtherUser: [this.discussion.idReceiver, [Validators.required,]],
      idDiscussion: [this.discussion.id, [Validators.required,]],
    });
  }

  async send(o: Message) {
    console.log(this.discussion, o);


    if (this.discussion.id === 0) {
      const dd = Object.assign(new Discussion(), this.discussion);

      delete dd.messages;
      delete dd.sender;
      delete dd.receiver;

      const d = await this.uow.discussions.post(dd).toPromise();
      o.idDiscussion = d.id;
    }
    // o.idCollaboratteur = this.o.idCollaborateur;
    this.uow.messages.postMessage(o).subscribe(r => {
      console.log(r);
      this.list.push(r);
      // this.myFormMessage.get('message').patchValue('');
    });
  }

}
