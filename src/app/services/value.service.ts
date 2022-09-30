import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  //BORRAR SHOWCHANGE
  isAuthenticated: boolean = false;
  nombrePlan: any;
  editClient: boolean;
  rolName: string;
  idPlan: any;
  nombreAdmin: string;
  nombreClient: string;
  priceMonthOrYear: boolean;
  idClient: any;
  idSection: any;
  datosEmpresa: any;
  token: string;
  isSub: boolean;
  ShowChangePasswor: boolean;
  showStatus: boolean;
  idAdmin: any;
  idUser: any;
  existeSub: boolean;
  existeprecio: boolean;
  idClientEdit: string;
  idAdminEdit: string;
  is_clave_provisional: any;

  private nombreSource = new Subject<string>();
  manualChallange$ = this.nombreSource.asObservable();

  private idClientEditSource = new Subject<string>();
  idClientEditChallange$ = this.idClientEditSource.asObservable();

  private idAdminEditSource = new Subject<string>();
  idAdminEditChallange$ = this.idAdminEditSource.asObservable();

  private is_clave_provisionalSource = new Subject<any>();
  is_clave_provisionalChallange$ =
    this.is_clave_provisionalSource.asObservable();

  private isAuth = new Subject<boolean>();
  isAuthChallange$ = this.isAuth.asObservable();

  private showStatusSource = new Subject<boolean>();
  showStatusChallange$ = this.showStatusSource.asObservable();

  private ShowChangePasswordSource = new Subject<boolean>();
  ShowChangePassword$ = this.ShowChangePasswordSource.asObservable();

  private existePrecioSource = new Subject<boolean>();
  existePreciChallange$ = this.existePrecioSource.asObservable();

  private priceMonthOrYearSource = new Subject<boolean>();
  isPriceChallange$ = this.priceMonthOrYearSource.asObservable();

  private editClientSource = new Subject<boolean>();
  editClientChallange$ = this.editClientSource.asObservable();

  private isSubSource = new Subject<boolean>();
  isSubChallange$ = this.isSubSource.asObservable();

  private existeSubSource = new Subject<boolean>();
  exiisteSub$ = this.existeSubSource.asObservable();

  private rolNameSource = new Subject<string>();
  rolNameChallange$ = this.rolNameSource.asObservable();

  private datosEmpresaSource = new Subject<any>();
  private datosEmpresaChallange$ = new Subject<any>();

  private idPlanSource = new Subject<string>();
  idPlanChallange$ = this.idPlanSource.asObservable();

  private idSectionSource = new Subject<string>();
  idSectionChallange$ = this.idSectionSource.asObservable();

  private nombreAdminSource = new Subject<string>();
  nombreAdminChallange$ = this.nombreAdminSource.asObservable();

  private tokenSource = new Subject<string>();
  tokenChallange$ = this.tokenSource.asObservable();

  private idAdminSource = new Subject<string>();
  idAdminChallange$ = this.idAdminSource.asObservable();

  private nombreClientSource = new Subject<string>();
  nombreClientChallange$ = this.nombreClientSource.asObservable();

  private idClientSource = new Subject<string>();
  idClientChallange$ = this.idClientSource.asObservable();
  isPrecioMonthOrYear: any;

  constructor(private ss: SessionService) {
    if (this.ss.getItem('isAuthenticated') !== '') {
      this.isAuthenticated = this.ss.getItem('isAuthenticated');
      this.isAuth.next(this.isAuthenticated);
    }

    if (this.ss.getItem('showStatus') !== '') {
      this.showStatus = this.ss.getItem('showStatus');
      this.showStatusSource.next(this.showStatus);
    }

    if (this.ss.getItem('datosEmpresa') !== '') {
      this.datosEmpresa = this.ss.getItem('datosEmpresa');
      this.datosEmpresaSource.next(this.datosEmpresa);
    }

    if (this.ss.getItem('is_clave_provisional') !== '') {
      this.is_clave_provisional = this.ss.getItem('is_clave_provisional');
      this.is_clave_provisionalSource.next(this.is_clave_provisional);
    }

    if (this.ss.getItem('token') !== '') {
      this.token = this.ss.getItem('token');
      this.tokenSource.next(this.token);
    }

    if (this.ss.getItem('showChangePassword') !== '') {
      this.ShowChangePasswor = this.ss.getItem('showChangePassword');
      this.ShowChangePasswordSource.next(this.ShowChangePasswor);
    }

    if (this.ss.getItem('idAdminEdit') !== '') {
      this.idAdminEdit = this.ss.getItem('idAdminEdit');
      this.idAdminEditSource.next(this.idAdminEdit);
    }
    if (this.ss.getItem('idClientEdit') !== '') {
      this.idClientEdit = this.ss.getItem('idClientEdit');
      this.idAdminEditSource.next(this.idClientEdit);
    }

    if (this.ss.getItem('existePrecio') !== '') {
      this.existeprecio = this.ss.getItem('existePrecio');
      this.existePrecioSource.next(this.existeprecio);
    }

    if (this.ss.getItem('editClient') !== '') {
      this.editClient = this.ss.getItem('editClient');
      this.editClientSource.next(this.editClient);
    }

    if (this.ss.getItem('isSub') !== '') {
      this.isSub = this.ss.getItem('isSub');
      this.isSubSource.next(this.isSub);
    }

    if (this.ss.getItem('existeSub') !== '') {
      this.existeSub = this.ss.getItem('existeSub');
      this.existeSubSource.next(this.existeSub);
    }

    if (this.ss.getItem('rolName') !== '') {
      this.rolName = this.ss.getItem('rolName');
      this.rolNameSource.next(this.rolName);
    }

    if (this.ss.getItem('price') !== '') {
      this.priceMonthOrYear = this.ss.getItem('price');
      this.priceMonthOrYearSource.next(this.priceMonthOrYear);
    }

    if (this.ss.getItem('nombrePlan') !== '') {
      this.nombrePlan = this.ss.getItem('nombrePlan');
      this.nombreSource.next(this.nombrePlan);
    }

    if (this.ss.getItem('idPlan') !== '') {
      this.idPlan = this.ss.getItem('idPlan');
      this.idPlanSource.next(this.idPlan);
    }

    if (this.ss.getItem('idSection') !== '') {
      this.idSection = this.ss.getItem('idSection');
      this.idSectionSource.next(this.idSection);
    }

    if (this.ss.getItem('idAdmin') !== '') {
      this.idAdmin = this.ss.getItem('idAdmin');
      this.idAdminSource.next(this.idAdmin);
    }

    if (this.ss.getItem('idClient') !== '') {
      this.idClient = this.ss.getItem('idClient');
      this.idClientSource.next(this.idClient);
    }
  }

  public setIsnombrePlan(nombre: string) {
    this.nombrePlan = nombre;
    this.ss.setItem('nombrePlan', nombre);
    this.nombreSource.next(nombre);
  }

  public delnombrePlan() {
    this.nombrePlan = '';
    this.ss.setItem('nombrePlan', '');
    this.nombreSource.next('');
  }

  public setDatosEmpresa(nombre: any) {
    this.datosEmpresa = nombre;
    this.ss.setItem('datosEmpresa', nombre);
    this.datosEmpresaSource.next(nombre);
  }

  public delDatosEmpresa() {
    this.datosEmpresa = '';
    this.ss.setItem('datosEmpresa', '');
    this.datosEmpresaSource.next('');
  }

  public setIsClaveProvisional(nombre: any) {
    this.is_clave_provisional = nombre;
    this.ss.setItem('is_clave_provisional', nombre);
    this.is_clave_provisionalSource.next(nombre);
  }

  public delIsClaveProvisional() {
    this.ss.setItem('is_clave_provisional', null);
    this.is_clave_provisionalSource.next(null);
  }

  public setToken(nombre: string) {
    this.token = nombre;
    this.ss.setItem('token', nombre);
    this.tokenSource.next(nombre);
  }

  public delToken() {
    this.token = '';
    this.ss.setItem('token', '');
    this.tokenSource.next('');
  }
  public setIsIdAdminEdit(nombre: string) {
    this.idAdminEdit = nombre;
    this.ss.setItem('idAdminEdit', nombre);
    this.idAdminEditSource.next(nombre);
  }

  public delIsIdAdminEdit() {
    this.idAdminEdit = '';
    this.ss.setItem('idAdminEdit', '');
    this.idAdminEditSource.next('');
  }

  public setIsIdClientEdit(nombre: string) {
    this.idClientEdit = nombre;
    this.ss.setItem('idClientEdit', nombre);
    this.idClientEditSource.next(nombre);
  }

  public delIsIdClientEdit() {
    this.idClientEdit = '';
    this.ss.setItem('idClientEdit', '');
    this.idClientEditSource.next('');
  }

  public setIsAuth(nombre: boolean) {
    this.isAuthenticated = nombre;
    this.ss.setItem('isAuthenticated', nombre);
    this.isAuth.next(nombre);
  }

  public delIsAuth() {
    this.isAuthenticated = false;
    this.ss.setItem('isAuthenticated', '');
    this.isAuth.next(false);
  }

  public setShowSatus(nombre: boolean) {
    this.showStatus = nombre;
    this.ss.setItem('showStatus', nombre);
    this.showStatusSource.next(nombre);
  }

  public delshowStatus() {
    this.showStatus = false;
    this.ss.setItem('showStatus', '');
    this.showStatusSource.next(false);
  }

  public setExistePrecio(nombre: boolean) {
    this.existeprecio = nombre;
    this.ss.setItem('existePrecio', nombre);
    this.existePrecioSource.next(nombre);
  }

  public delExistePrecio() {
    this.existeprecio = false;
    this.ss.setItem('existePrecio', '');
    this.existePrecioSource.next(false);
  }

  public setExistSub(nombre: boolean) {
    this.existeSub = nombre;
    this.ss.setItem('existeSub', nombre);
    this.existeSubSource.next(nombre);
  }

  public delExistSub() {
    this.existeSub = false;
    this.ss.setItem('existeSub', '');
    this.existeSubSource.next(false);
  }

  public setEditClient(nombre: boolean) {
    this.editClient = nombre;
    this.ss.setItem('editClient', nombre);
    this.editClientSource.next(nombre);
  }

  public delEditClient() {
    this.editClient = false;
    this.ss.setItem('editClient', '');
    this.editClientSource.next(false);
  }

  public setIsSub(nombre: boolean) {
    this.isSub = nombre;
    this.ss.setItem('isSub', nombre);
    this.isSubSource.next(nombre);
  }

  public delIsSub() {
    this.isSub = false;
    this.ss.setItem('isSub', '');
    this.isSubSource.next(false);
  }

  public setIsPrecioMonthOrYear(nombre: boolean) {
    this.priceMonthOrYear = nombre;
    this.ss.setItem('price', nombre);
    this.priceMonthOrYearSource.next(nombre);
  }

  public getIsPrecioMonthOrYear() {
    return this.priceMonthOrYear;
  }
  public delIsPrecioMonthOrYear() {
    this.priceMonthOrYear = null;
    this.ss.setItem('price', null);
    this.priceMonthOrYearSource.next(null);
  }

  public setRolName(nombre: string) {
    this.rolName = nombre;
    this.ss.setItem('rolName', nombre);
    this.rolNameSource.next(nombre);
  }

  public delRolName() {
    this.rolName = '';
    this.ss.setItem('rolName', '');
    this.rolNameSource.next('');
  }

  public setIsidPlan(id: any) {
    this.idPlan = id;
    this.ss.setItem('idPlan', id);
    this.idPlanSource.next(id);
  }

  public delidPlan() {
    this.idPlan = '';
    this.ss.setItem('idPlan', '');
    this.idPlanSource.next('');
  }

  public setShowChangePassword(bool: any) {
    this.ShowChangePasswor = bool;
    this.ss.setItem('showChangePassword', bool);
    this.ShowChangePasswordSource.next(bool);
  }

  public delShowChangePassword() {
    this.ShowChangePasswor = false;
    this.ss.setItem('showChangePassword', '');
    this.ShowChangePasswordSource.next(false);
  }

  public setIsnombreAdmin(nombre: string) {
    this.nombreAdmin = nombre;
    this.ss.setItem('nombreAdmin', nombre);
    this.nombreSource.next(nombre);
  }

  public delnombreAdmin() {
    this.nombreAdmin = '';
    this.ss.setItem('nombreAdmin', '');
    this.nombreSource.next('');
  }

  public setIsidAdmin(id: any) {
    this.idAdmin = id;
    this.ss.setItem('idAdmin', id);
    this.idAdminSource.next(id);
  }

  public delidAdmin() {
    this.idAdmin = '';
    this.ss.setItem('idAdmin', '');
    this.idAdminSource.next('');
  }

  public setIsnombreClient(nombre: string) {
    this.nombreClient = nombre;
    this.ss.setItem('nombreClient', nombre);
    this.nombreSource.next(nombre);
  }

  public delnombreClient() {
    this.nombreClient = '';
    this.ss.setItem('nombreClient', '');
    this.nombreSource.next('');
  }

  public setIsidClient(id: any) {
    this.idClient = id;
    this.ss.setItem('idClient', id);
    this.idClientSource.next(id);
  }

  public delidClient() {
    this.idClient = '';
    this.ss.setItem('idClient', '');
    this.idClientSource.next('');
  }

  /* public setIsNombreSection(nombre: string) {
    this.nombreSection = nombre;
    this.storeService.setStorage('nombreSection', nombre);
    this.nombreSectionSource.next(nombre);
  }
 
  public delNombreSection() {
    this.nombreSection = '';
    this.storeService.setStorage('nombreSection', '');
    this.nombreSectionSource.next('');
  }
*/
  public setIsIdSection(id: any) {
    this.idSection = id;
    this.ss.setItem('idSection', id);
    this.idSectionSource.next(id);
  }

  public delIdSection() {
    this.idSection = '';
    this.ss.setItem('idSection', '');
    this.idSectionSource.next('');
  }

  public getIsClaveProvicional() {
    //recojer variable desde la session sotrage
    return this.ss.getItem('is_clave_provisional');
  }

  public CerrarSesion() {
    this.delIsPrecioMonthOrYear();
    this.delEditClient();
    this.delidClient();
    this.delidPlan();
    this.delDatosEmpresa();
    this.delIdSection();
    this.delIsAuth();
    this.delRolName();
    this.delIsSub();
    this.delShowChangePassword();
    this.delnombreAdmin();
    this.delnombreClient();
    this.delnombrePlan();
    this.delExistSub();
    this.delToken();
    this.delshowStatus();
    this.delIsIdClientEdit();
    this.delIsIdAdminEdit();
    this.delidAdmin();
    this.delIsClaveProvisional();
    this.delExistePrecio();
    this.rolName = '';
    this.isAuthenticated = false;
  }
}
