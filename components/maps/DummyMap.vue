<template>
  <LMap
    :zoom="12"
    :center="[14.56, 121.00]"
    class="h-[400px] w-full"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />

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
  </LMap>
</template>

<script setup>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LPolyline,
} from '@vue-leaflet/vue-leaflet'
</script>
