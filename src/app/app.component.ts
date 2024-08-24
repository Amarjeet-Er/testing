import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  result: { [key: number]: number } = {};
  output: string = ''
  Interpolation: string = '<p>{{ message }}</p>'
  PropertyBinding: string = '<img [src]="imageUrl" />'
  Event: string = '<button (click)="onClick()">Click Me</button>'
  TwoWay: string = '<input [(ngModel)]="username" />'

  Dependency: string = `
    @Injectable({ providedIn: 'root' })
    export class MyService { }
    @Component({
      selector: 'app-example',
      template: \`
        <p>Example Component</p>\`,
    })
    export class ExampleComponent {
      constructor(private myService: MyService) { }
    }
  `;

  ngOnInit() {
    const array = [1, 3, 6, 1, 6, 2, 3, 2, 3];
    this.result = this.countOccurrences(array);

    const input = "Taj Mahal";
    this.output = this.reverseWords(input);
    console.log(this.output);
  }
  countOccurrences(arr: number[]): { [key: number]: number } {
    return arr.reduce((acc, element) => {
      acc[element] = (acc[element] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });
  }

  reverseWords(input: string): string {
    return input
      .split(' ')
      .map(word => word.split('').reverse().join(''))
      .join(' ');
  }
}
