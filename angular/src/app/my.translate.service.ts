import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  lang = new BehaviorSubject(this.translate.currentLang);
  langSync = 'fr';

  isFr = true;

  constructor(public translate: TranslateService) { }

  init() {
    const currentLanguage = localStorage.getItem('lang') || 'fr';
    this.changeLanguage(currentLanguage);
  }

  changeLanguage(currentLanguage) {
    // this.languageSelected = currentLanguage;
    this.translate.setDefaultLang(currentLanguage);
    this.translate.use(currentLanguage);
    localStorage.setItem('lang', currentLanguage);
    this.langSync = currentLanguage;

    this.isFr = this.langSync === 'fr';
  }

  // this function help to update our lang property, so we call it in app.componenet
  currentLang(): EventEmitter<LangChangeEvent> {
    return this.translate.onLangChange;
  }

  get(key: string) {
    return this.translate.instant(key) as string;
  }

  getObs(key: string) {
    return this.translate.stream(key) as Observable<string>;
  }
}
