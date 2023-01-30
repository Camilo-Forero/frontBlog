import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EntryForm } from '../interfaces/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private HttpClient: HttpClient){  }

  baseUrl = "http://localhost:8000/api/";

  getEntrys():Observable<EntryForm[]>
  {
    return this.HttpClient.get<EntryForm[]>(this.baseUrl+"show").pipe(catchError(this.handleError));
  }

  getEntry(id: any):Observable<EntryForm>
  {
    return this.HttpClient.get<EntryForm>(this.baseUrl+"get/"+id).pipe(catchError(this.handleError));
  }

  postEntry(arrFormVals : any):Observable<any>
  {
    return this.HttpClient.post(this.baseUrl+"new", arrFormVals);
    //return this.HttpClient.get<EntryForm>(this.baseUrl+"new").pipe(catchError(this.handleError));
  }

  updateEntry(arrFormVals : any):Observable<EntryForm>
  {
    return this.HttpClient.put<EntryForm>(this.baseUrl+"update", arrFormVals);
    //return this.HttpClient.get<EntryForm>(this.baseUrl+"new").pipe(catchError(this.handleError));
  }

  getByName(searchVal : any)
  {
    return this.HttpClient.post(this.baseUrl+"search", searchVal);
  }

  private handleError(errorResponse: HttpErrorResponse)
  {
    if(errorResponse.error instanceof ErrorEvent)
    {
      console.log('Client side error: ', errorResponse.error);
    }
    else
    {
      console.log('Server side error: ', errorResponse);
    };

    return throwError('There is a problem and we are fixing it');
  }
}
