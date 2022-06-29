import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private _http: HttpClient) { }
  dataCovid(){
    const urlAPI = 'https://api.covid19api.com/summary';
    return this._http.get(urlAPI).pipe(map(res=> res));
  }
}
