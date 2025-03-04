import { Injectable } from '@angular/core';
import { PaymentModel } from '../models/payment.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  list(): Observable<PaymentModel[]> {
    return this.http.get<PaymentModel[]>(`${environment.apiUrl}/payment`);
  }

  create(payment: PaymentModel): Observable<PaymentModel[]> {
    return this.http.post<PaymentModel[]>(`${environment.apiUrl}/payment`, payment);
  }
}
