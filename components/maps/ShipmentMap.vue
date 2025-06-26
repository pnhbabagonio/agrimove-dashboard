<template>
  <div>
    <LMap
      :zoom="zoom"
      :center="mapCenter"
      style="height: 400px; width: 100%"
    >
      <LTileLayer
        :url="tileLayerUrl"
        :attribution="tileAttribution"
      />

      <!-- Markers for drivers -->
      <LMarker
        v-for="(driver, idx) in drivers.value"
        :key="idx"
        :lat-lng="[driver.lat, driver.lng]"
      >
        <LPopup>
          <strong>{{ driver.name }}</strong><br />
          {{ driver.status }}
        </LPopup>
      </LMarker>

      <!-- Routes -->
      <LPolyline
        v-for="(shipment, i) in shipments.value"
        :key="i"
        :lat-lngs="[
          [shipment.pickup.lat, shipment.pickup.lng],
          [shipment.delivery.lat, shipment.delivery.lng]
        ]"
        :color="'blue'"
      />
    </LMap>
  </div>
</template>

<script setup>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LPolyline,
} from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
import 'leaflet/dist/leaflet.css'

const drivers = ref([
  { name: 'Driver A', lat: 14.5995, lng: 120.9842, status: 'In Transit' },
  { name: 'Driver B', lat: 14.5547, lng: 121.0244, status: 'Idle' },
])

const shipments = ref([
  {
    pickup: { lat: 14.55, lng: 121.00 },
    delivery: { lat: 14.60, lng: 121.05 },
  },
])

const mapCenter = [14.56, 121.00]
const zoom = 12

const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

</script>
