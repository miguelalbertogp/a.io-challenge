import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocketService } from '../services/socket.service';
import { PaymentService } from '../services/payment.service';
import { PaymentModel } from '../models/payment.model';

@Component({
  selector: 'app-payments',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})

export class PaymentsComponent implements OnInit, OnDestroy {
  generalForm: FormGroup = new FormGroup(
    {
      payment: new FormControl("", Validators.required),
      ammount: new FormControl(null, Validators.required)
    },
  );
  payments: PaymentModel[] = [];
  code: number | null = null;
  live: boolean = false;

  constructor(
    private socketService: SocketService,
    private paymentSrv: PaymentService
  ) {
  }

  ngOnInit(): void {
    this.live = true;
    this.socketService.connect();
    this.socketService.receiveMessage('gridUpdated', (data) => {
      if (data.code) this.code = data.code;
    });
    this.socketService.receiveMessage('paymentsUpdate', (data) => {
      this.getPayments();
    });
    this.getPayments();
  }
  
  getPayments() {
    this.paymentSrv.list().subscribe((res: PaymentModel[]) => {
      this.payments = res;
    })
  }

  ngOnDestroy(): void {
    this.live = false;
    this.socketService.disconnect();
  }

  addPayment() {
    if (!this.generalForm.valid) return;

    const values = this.generalForm.value;

    const obj: PaymentModel = {
      name: values.payment,
      ammount: values.ammount,
    }

    this.paymentSrv.create(obj).subscribe((res: PaymentModel[]) => {
      this.generalForm.patchValue({
        payment: null,
        ammount: null
      })
    })
  }
}
