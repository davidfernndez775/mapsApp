import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.css',
})
export class CounterAloneComponent {
  @Input()
  public counter: number = 10;
}
