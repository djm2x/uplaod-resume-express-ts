
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { UserService } from './user.service';
import { VilleService } from './ville.service';
import { DetailUserActiviteService } from './detailUserActivite.service';
import { TypeActiviteService } from './typeActivite.service';
import { ActiviteService } from './activite.service';
import { NiveauScolaireService } from './niveauScolaire.service';
import { TypeCoursService } from './typeCours.service';
import { lieuCourservice } from './lieuCours.service';
import { ProfService } from './prof.service';
import { StudentService } from './student.service';
import { HttpClient } from '@angular/common/http';
import { ContactUsService } from './contactUs.service';
import { MessageService } from './message.service';
import { VideoService } from './video.service';
import { OffreProfService } from './offreProf.service';
import { CoursService } from './cours.service';
import { BrancheService } from './branche.service';
import { FileUploadService } from './file.upload.service';
import { EventProfService } from './eventProf.service';
import { DiscussionService } from './discussion.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {
  accounts = new AccountService();
  users = new UserService();
  villes = new VilleService();
  detailUserActivites = new DetailUserActiviteService();
  typeActivites = new TypeActiviteService();
  niveauScolaires = new NiveauScolaireService();
  activites = new ActiviteService();
  typeCours = new TypeCoursService();
  lieuCours = new lieuCourservice();
  profs = new ProfService();
  students = new StudentService();

  messages = new MessageService();
  discussions = new DiscussionService();

  contactUss = new ContactUsService();
  videos = new VideoService();
  offreProfs = new OffreProfService();
  cours = new CoursService();
  branches = new BrancheService();
  files = new FileUploadService();
  eventProfs = new EventProfService();


  niveaux = this.http.get<{ name: string }[]>('assets/json/niveaux.json');
  cycles = this.http.get<{ id: number, name: string, nameAr: string }[]>('assets/json/cycles.json');
  offres = this.http.get<{ id: number, pack: string, description: string, btn: string, options: string[] }[]>('assets/json/offres.json');
  years = [...Array(new Date().getFullYear() - 2015).keys()].map(e => 2015 + e + 1);
  months = [...Array(12).keys()].map(e => e + 1);
  monthsAlpha = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ].map((e, i) => ({ id: i + 1, name: e }));

  constructor(private http: HttpClient) { }

  valideDate(date: Date): Date {
    date = new Date(date);

    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    const minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);

    return date;
  }

  arrayToString(t: string[]) {
    return t.map(e => `${e};`).reduce((p, c) => p + c);
  }

  stringToArray(s: string): string[] {
    const t = s.split(';');

    t.pop();

    return t;
  }
}
