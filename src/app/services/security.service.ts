import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SessionService } from './session.service';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SecurityService implements OnInit {
  IsAuhorized: any;
  private authSource = new Subject<boolean>();
  authChallange$ = this.authSource.asObservable();

  isManual: any;
  private manualSource = new Subject<boolean>();
  manualChallange$ = this.manualSource.asObservable();

  constructor(private ss: SessionService) {
    if (this.ss.getItem('IsAuhorized') !== '') {
      this.IsAuhorized = this.ss.getItem('IsAuhorized');
      this.authSource.next(this.IsAuhorized);
    }

    if (this.ss.getItem('isManual') !== '') {
      this.isManual = this.ss.getItem('isManual');
      this.manualSource.next(this.isManual);
    }
  }

  ngOnInit() {}

  public GetToken(): any {
    // const datos = ['token', 'token_expires', 'id_user'];
    return this.ss.getItem('token');

    //hacer que la api nos retorne el id, y devolverla aqui
  }

  async checkToken() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${this.GetToken()}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
    };

    let planet: any;

    await fetch('http://127.0.0.1:8000/api/checkToken', requestOptions)
      .then((response) => response.text())
      .then((result) => (planet = JSON.parse(result)))
      .catch((error) => console.log('error', error));

    console.log(planet.data);

    if (planet.data != null) {
      this.SetNewToken(planet.data);
    }
  }

  public ResetAuthData() {
    this.ss.setItem('token', '');
    this.ss.setItem('token_expires', '');
    this.ss.setItem('id_user', '');
    this.IsAuhorized = false;
    this.ss.setItem('IsAuhorized', false);
  }

  public SetNewToken(token: any) {
    this.ss.setItem('token', token);
    this.authSource.next(true);
  }

  public SetAuthData(token: any, token_expires: any, id_user: any) {
    this.ss.setItem('token', token);
    this.ss.setItem('token_expires', token_expires);
    this.ss.setItem('id_user', id_user);

    this.IsAuhorized = true;
    this.ss.setItem('IsAuhorized', true);
    this.authSource.next(true);

    this.isManual = true;
    this.ss.setItem('isManual', true);
    this.authSource.next(true);
  }

  public getObservable(): Observable<boolean> {
    return this.manualSource.asObservable();
  }

  public setIsManual() {
    this.isManual = true;
    this.ss.setItem('isManual', true);
    this.manualSource.next(true);
  }

  public delManual() {
    this.isManual = false;
    this.ss.setItem('isManual', false);
    this.manualSource.next(false);
  }

  public deleteIsManual() {
    this.ss.setItem('isManual', false);
    this.isManual = false;
  }

  public LogOff() {
    this.ResetAuthData();
    this.authSource.next(false);
  }
}
