import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPaletteObj } from './model/colorPaletteObj';
import { ColorPalette } from './model/colorPalettes';
import { ColorPaletteType } from './model/colorPaletteType';

@Component({
  selector: 'app-cc-color-picker',
  templateUrl: './cc-color-picker.component.html',
  styleUrls: ['./cc-color-picker.component.scss'],
  animations: [
    trigger('productsIntro', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('75ms', [
          animate('500ms ease-in', keyframes([
            style({opacity: 0, offset: 0}),
            style({opacity: .5,  offset: 0.3}),
            style({opacity: 1, offset: 1.0}),
          ]))]), {optional: true})
      ])

      // transition('* => *', [
      //   query(':enter', style({ transform: 'scale(0.5)', opacity: 0 }), {optional: true}),
      //   query(':enter', stagger('50ms', [
      //     animate('0.3s cubic-bezier(.8, -0.6, 0.2, 1.5)',
      //     style({ transform: 'scale(1)', opacity: 1 }))
      //   ]), {optional: true})
      // ])
    ])
  ]
})
export class CcColorPickerComponent implements OnInit {

  // colorObj: ColorObj;
  @Input() color: string = '';
  @Output() onchanged = new EventEmitter<any>();

  pickerIsEnabled: boolean = false;
  animationState: string = 'active';

  currentColor: string = this.color;
  currentColorPalette!: ColorPaletteObj;
  colorPalettes: ColorPaletteObj[] = [
    new ColorPaletteObj(ColorPaletteType.Red, '#FF0000', ColorPalette.Red),
    new ColorPaletteObj(ColorPaletteType.Pink, '#ed1691', ColorPalette.Pink),
    new ColorPaletteObj(ColorPaletteType.Purple, '#a7008f', ColorPalette.Purple),
    new ColorPaletteObj(ColorPaletteType.DeepPurple, '#673AB7', ColorPalette.DeepPurple),
    new ColorPaletteObj(ColorPaletteType.Indigo, '#3F51B5', ColorPalette.Indigo),
    new ColorPaletteObj(ColorPaletteType.Blue, '#0000ff', ColorPalette.Blue),
    new ColorPaletteObj(ColorPaletteType.LightBlue, '#03A9F4', ColorPalette.LightBlue),
    new ColorPaletteObj(ColorPaletteType.Cyan, '#00f9ff', ColorPalette.Cyan),
    new ColorPaletteObj(ColorPaletteType.Teal, '#009688', ColorPalette.Teal),
    new ColorPaletteObj(ColorPaletteType.Green, '#00ff00', ColorPalette.Green),
    new ColorPaletteObj(ColorPaletteType.LightGreen, '#8BC34A', ColorPalette.LightGreen),
    new ColorPaletteObj(ColorPaletteType.Lime, '#CDDC39', ColorPalette.Lime),
    new ColorPaletteObj(ColorPaletteType.Yellow, '#ffff00', ColorPalette.Yellow),
    new ColorPaletteObj(ColorPaletteType.Amber, '#f9ce1d', ColorPalette.Amber),
    new ColorPaletteObj(ColorPaletteType.Orange, '#FF9800', ColorPalette.Orange),
    new ColorPaletteObj(ColorPaletteType.DeepOrange, '#FF5722', ColorPalette.DeepOrange),
    new ColorPaletteObj(ColorPaletteType.Brown, '#ac8044', ColorPalette.Brown),
    new ColorPaletteObj(ColorPaletteType.Gray, '#9E9E9E', ColorPalette.Gray),
    new ColorPaletteObj(ColorPaletteType.BlueGray, '#607D8B', ColorPalette.BlueGray),
    new ColorPaletteObj(ColorPaletteType.None, '#FFFFFF', []),
    new ColorPaletteObj(ColorPaletteType.None, '#000000', []),
  ];

  ColorPaletteType: any = ColorPaletteType;

  constructor() {}

  ngOnInit() {
    this.currentColor = this.color;
    this.initColorPalette();
  }

  private initColorPalette(): void {
    this.currentColorPalette = new ColorPaletteObj(ColorPaletteType.None, '#000000', []);

    parentLoop: for (const cp of this.colorPalettes) {
      if (this.currentColor === cp.DefaultColor) {
        this.currentColorPalette = cp;
        break;
      } else {
        for (const dc of cp.DetailColors) {
          if (this.currentColor === dc) {
            this.currentColorPalette = cp;
            break parentLoop;
          }
        }
      }
    }
  }

  colorPaletteOnclick(cp: ColorPaletteObj): void {
    this.animationState = 'inactive';

    setTimeout(() => {
      this.animationState = 'active';
      this.currentColorPalette = cp;
      this.currentColor = cp.DefaultColor;
      // document.documentElement.style.setProperty('--shadowColor', this.colorObj.CurrentColor);
    });
  }

  openPicker(): void {
    // this.colorObj = new ColorObj(this.color);
    // document.documentElement.style.setProperty('--shadowColor', this.colorObj.CurrentColor);
    this.pickerIsEnabled = true;
  }

  close(): void {
    this.pickerIsEnabled = false;
  }

  apply(): void {
    this.color = this.currentColor;
    this.onchanged.emit(this.currentColor);
    this.pickerIsEnabled = false;
  }

}
