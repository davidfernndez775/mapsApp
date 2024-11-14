import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent {
  @Input() lngLat?: [number, number];
  map: Map | undefined;
  @ViewChild('map') divMap?: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    if (!this.divMap?.nativeElement) throw 'Map Div not found';
    if (!this.lngLat) throw "LngLat can't be null";

    // map
    if (isPlatformBrowser(this.platformId)) {
      // chequeamos que el elemento map exista
      if (!this.divMap) throw 'HTML Element not found';

      this.map = new Map({
        container: this.divMap.nativeElement,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${environment.maplibre_key}`,
        center: this.lngLat,
        zoom: 15,
        // para que el mapa funcione como una imagen
        interactive: false,
      });
    }
    // marker
    if (this.map) new Marker().setLngLat(this.lngLat).addTo(this.map);
  }
}
