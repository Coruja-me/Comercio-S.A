import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  protected url: string = "http://localhost:8080/back-api"
  constructor(protected http: HttpClient) { }

  public create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/cliente`, cliente);
  }
  public update(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/cliente/id/${id}`, cliente);
  }
  public findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/cliente`);
  }
  public findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/cliente/id/${id}`);
  }
  public findByNome(nome: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/cliente/nome/${nome}`);
  }
  public findByCpf(cpf: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/cliente/cpf/${cpf}`);
  }
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/cliente/id/${id}`);
  }
}
