<template>
  <LMap
    :zoom="12"
    :center="[7.1072, 124.8403]"
    class="w-full h-[400px]"
    @moveend="onMoveEnd"
    @zoomend="onZoomEnd"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    />
    
    <!-- Comment lng muna kay di man need 
    <LMarker :lat-lng="[14.5995, 120.9842]">
      <LPopup>Driver A: In Transit</LPopup>
    </LMarker>

    <LMarker :lat-lng="[14.5547, 121.0244]">
      <LPopup>Driver B: Idle</LPopup>
    </LMarker>

    <LPolyline
      :lat-lngs="[
        [14.55, 121.00],
        [14.60, 121.05]
      ]"
      :color="'blue'"
    />
    -->
  </LMap>
</template>

<script setup>
import * as L from 'leaflet';
window.L = L// huhu di ko alam pero yung leaflet dependency is not being 
import {//imported correctly so ito nlng solution ko
  LMap,
  LTileLayer,
  // LMarker,
  // LPopup,
  // LPolyline,
} from '@vue-leaflet/vue-leaflet'

function onMoveEnd(e) {
  console.log('Map moved to:', e.target.getCenter())
}

function onZoomEnd(e) {
  console.log('Map zoom level:', e.target.getZoom())
}
</script>
