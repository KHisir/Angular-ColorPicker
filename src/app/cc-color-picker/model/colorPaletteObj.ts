import { ColorPaletteType } from './colorPaletteType';

export class ColorPaletteObj {
  public Type: ColorPaletteType;
  public DefaultColor: string;
  public DetailColors: string[];

  constructor(type: ColorPaletteType, color: string, detailColors: string[]) {
    this.Type = type;
    this.DefaultColor = color;
    this.DetailColors = detailColors;
  }
}
