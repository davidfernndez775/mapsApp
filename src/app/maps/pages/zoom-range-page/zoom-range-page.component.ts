import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'maplibre-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'maps-zoom',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit {
  // valores de los parametros del mapa
  public state = { lng: 139.753, lat: 35.6844, zoom: 14 };
  // coordenadas del mapa
  public lngLat: LngLat = new LngLat(-74.5, 40);
  // inicializamos el mapa
  public map: Map | undefined;
  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // chequeamos que el elemento map exista
      if (!this.mapContainer) throw 'HTML Element not found';

      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${environment.maplibre_key}`,
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom,
      });

      this.mapListeners();
    }
  }

  // listener para obtener el zoom
  mapListeners() {
    // chequeamos que el mapa se haya cargado
    if (!this.map) throw 'Not initialized map';

    // obtenemos el valor del zoom de maplibre
    this.map.on('zoom', (ev) => {
      this.state.zoom = this.map!.getZoom();
    });

    // llegamos al maximo valor del zoom
    this.map.on('zoomend', (ev) => {
      // si es menor a 18 no se ejecuta
      if (this.map!.getZoom() < 18) return;
      // si es mayor lo devuelve a 18
      this.map!.zoomTo(18);
    });

    // cambio de la posicion en long lat
    this.map.on('move', () => {
      const { lng, lat } = this.map!.getCenter();
      this.state.lng = lng;
      this.state.lat = lat;
    });
  }

  // botones de zoom
  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.state.zoom = Number(value);
    this.map?.zoomTo(this.state.zoom);
  }

  // destruir el componente con sus listeners
  ngOnDestroy() {
    this.map?.remove();
  }
}
