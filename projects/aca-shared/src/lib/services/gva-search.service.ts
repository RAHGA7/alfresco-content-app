import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GVASEARCHSERVICE {
  constructor(private http : HttpClient) {}


  getGvaSearchResult(params:any): Observable<any> {
    const httpOptions ={
        'Accept': "*/*",
        'Content-Type': "text/plain",
        'Authorization': 'Basic Uk9MRV9USUNLRVQ6VElDS0VUX2UyMWFhOWY5MDcyODdjMmQ5MGQ4YWVjMmYwNmRiZmExMGIxMGE4MGY='

    }

    let options = {headers: httpOptions}
  return  this.http.post<any>('http://10.72.85.6:4202/alfresco/api/-default-/public/search/versions/1/search',params, options);


  }
}
