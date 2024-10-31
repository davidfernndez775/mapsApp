import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'maps-markers',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit {
  // valores de los parametros del mapa
  public currentLngLat: LngLat = new LngLat(139.753, 35.6844);
  public zoom: number = 14;
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
        center: this.currentLngLat,
        zoom: this.zoom,
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
      this.zoom = this.map!.getZoom();
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
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat } = this.currentLngLat;
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
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

  // // marcador
  // const marker = new Marker().setLngLat(this.currentLngLat).addTo(this.map);

  // destruir el componente con sus listeners
  ngOnDestroy() {
    this.map?.remove();
  }
}
