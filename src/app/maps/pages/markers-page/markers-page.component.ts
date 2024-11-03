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

      // creamos el mapa
      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${environment.maplibre_key}`,
        center: this.currentLngLat,
        zoom: this.zoom,
      });

      // invocamos los listeners
      this.mapListeners();
    }
  }

  // *LISTENERS
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

  // *FUNCIONES DE BOTONES PARA ZOOM
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

  // *FUNCIONES DE BOTONES PARA MARCADORES
  createMarker() {
    // chequeamos que el mapa exista
    if (!this.map) return;

    // definimos el color para que cambie de un marcador a otro
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    // obtenemos la posicion
    const lngLat = this.map.getCenter();

    // invocamos la funcion
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string = 'red') {
    if (!this.map) return;

    // se especifica el color y si el marcador se puede mover(draggable)
    const marker = new Marker({ color: color, draggable: true })
      .setLngLat(lngLat)
      .addTo(this.map);
  }

  // destruir el componente con sus listeners
  ngOnDestroy() {
    this.map?.remove();
  }
}
