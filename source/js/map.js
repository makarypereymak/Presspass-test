import { modalGeo } from "./nav.js";

const addressInput = document.querySelector('.form__address-input');
const modalWrapper = document.querySelector(".modal__wrapper");
const labelGeo = document.querySelector(".form__label--for-geo");

const map = L.map('map')
  .setView({
    lat: 47.222916,
    lng: 39.721289
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const iconForMainMarker = L.icon({
  iconUrl: '/img/location_icon.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 47.222916,
    lng: 39.721289
  },
  {
    draggable: true,
    icon: iconForMainMarker,
  }
);

L.layerGroup();

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();

  addressInput.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
});

labelGeo.addEventListener('click', () => {
  map.invalidateSize();
  addressInput.value = '47.222916, 39.721289';
  modalGeo.style.display = "flex";

  const error = labelGeo.querySelector('.form__pristine-error');
  if (error !== undefined && error !== null) {
    error.style.display = "none";
  }
  modalWrapper.addEventListener('click', (event) => {
    event.stopPropagation();
  })
  modalGeo.addEventListener('click', () => {
    modalGeo.style.display = "none";
  })
  document.addEventListener('keydown', (event) => {
    if (event.code === "Escape") {
      modalGeo.style.display = "none";
    }
  })
})
