<template>
  <LMap
    :zoom="13"
    :center="mapCenter"
    class="h-[300px] w-full rounded"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />

    <!-- Pickup -->
    <LMarker :lat-lng="pickup">
      <LPopup>📦 Pickup Location</LPopup>
    </LMarker>

    <!-- Delivery -->
    <LMarker :lat-lng="delivery">
      <LPopup>🏁 Delivery Location</LPopup>
    </LMarker>

    <!-- Driver -->
    <LMarker :lat-lng="driver">
      <LPopup>🚚 Driver Location</LPopup>
    </LMarker>

    <!-- Route -->
    <LPolyline :lat-lngs="[pickup, delivery]" color="blue" />
  </LMap>
</template>

<script setup>
import { LMap, LTileLayer, LMarker, LPopup, LPolyline } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { computed } from 'vue'

const props = defineProps({
  pickup: { type: Array, default: () => [14.5547, 121.0244] },
  delivery: { type: Array, default: () => [14.5995, 120.9842] },
  driver: { type: Array, default: () => [14.575, 121.005] },
})

const mapCenter = computed(() => props.driver ?? props.pickup)
</script>
