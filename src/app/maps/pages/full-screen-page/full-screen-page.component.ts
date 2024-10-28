import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'maps-full',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit {
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=Bkz34KRGJw7tELwmleyL`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
