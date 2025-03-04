import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-grid',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnDestroy, OnInit {
  generalForm: FormGroup = new FormGroup({ char: new FormControl("") });
  gridData: string[][] = [];
  code: number | null = null;
  live: boolean = false;

  constructor(
    private socketService: SocketService
  ) {
    this.gridData = Array(10).fill(Array(10).fill(""));
  }

  ngOnInit(): void {
    this.generalForm.disable()
  }

  ngOnDestroy(): void {
    this.live = false;
    this.socketService.disconnect();
  }

  changeChar(event: any) {
    this.socketService.sendMessage('setBias', this.generalForm.value.char);
  }

  generateGrid() {
    if (this.live === true) return;
    this.live = true;
    this.generalForm.enable()
    this.socketService.connect();
    this.socketService.receiveMessage('gridUpdated', (data) => {
      if (data.grid) this.gridData = data.grid;
      if (data.code) this.code = data.code;
    });
    this.socketService.receiveMessage('charDisable', (data) => {
      if (data.value === true) {
        this.generalForm.disable()
        if (this.generalForm.value !== data.char) this.generalForm.patchValue({char: data.char})
      }
      else {
        this.generalForm.enable()
        this.generalForm.patchValue({char: data.char})
      }
    });
  }
}
