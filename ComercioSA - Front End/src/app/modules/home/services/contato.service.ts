import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../model/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  protected url: string = "http://localhost:8080/back-api"
  constructor(protected http: HttpClient) { }

  public create(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(`${this.url}/contato`, contato);
  }
  public update(id: number, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.url}/contato/id/${id}`, contato);
  }
  public findAll(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.url}/contato`);
  }
  public findById(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.url}/contato/id/${id}`);
  }
  public findByCliente(clienteId: number): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.url}/contato/cliente/${clienteId}`);
  }
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/contato/id/${id}`);
  }
}
