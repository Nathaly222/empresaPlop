import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/chupetes'; 

  constructor(private http: HttpClient) {}

  // Método para obtener todos los chupetes
  getChupetes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para agregar un nuevo chupete
  addChupete(chupete: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, chupete);
  }

  // Método para obtener la configuración
  getConfig(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/config');
  }
}
