import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cc-color-picker';

  color: string = '#ff4a85';

  onChanged(color: string) {
    console.log(color);
    // this.color = color;
  }
}
