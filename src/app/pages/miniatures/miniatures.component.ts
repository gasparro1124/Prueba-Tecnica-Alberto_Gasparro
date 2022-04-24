import { Component, OnInit, Input } from '@angular/core';
import { UserResponse } from '../interfaces';

@Component({
  selector: 'app-miniatures',
  templateUrl: './miniatures.component.html',
  styleUrls: ['./miniatures.component.scss']
})
export class MiniaturesComponent implements OnInit {

  @Input() users!: UserResponse[]

  constructor() { }

  ngOnInit(): void {
  }

}
