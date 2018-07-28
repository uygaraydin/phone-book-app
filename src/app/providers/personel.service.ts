import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { PersonelModel } from '../models/personelModel';

@Injectable()
export class PersonelService {

    constructor(private http: HttpClient) {

    }

    GetByID(id) {
        return this.http.get<PersonelModel>('http://localhost:4600/personel/' + id, /*  {
            params: new HttpParams().set('id', id),
            headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
        } */);
    }

    Search(searchKey) {

        const parametersJson = {
            q: searchKey
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post<PersonelModel[]>('http://localhost:4600/personel/search', parametersJson, { headers: headers });

    }


}
