document.addEventListener("DOMContentLoaded", function () {
  const mapElement = document.getElementById("vetClinicMap");
  if (!mapElement) return;

  const clinicPosition = [53.899546, 27.543074];

  const map = L.map("vetClinicMap", {
    center: clinicPosition,
    zoom: 16,
    scrollWheelZoom: true,
    zoomControl: true,
    attributionControl: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  const vetClinicIcon = L.icon({
    iconUrl: "./img/icons/pawIcon.png",
    iconSize: [60, 60],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
    shadowSize: [60, 60],
    shadowAnchor: [20, 60],
  });

  const clinicMarker = L.marker(clinicPosition, {
    icon: vetClinicIcon,
    title: "Ветеринарная клиника 'Хвостатый доктор'",
  }).addTo(map);

  clinicMarker.bindPopup(`
        <div class="vet-popup min-w-[280px] p-0">
          <div class="flex items-center space-x-3">   
            <div>
                <h4 class="font-bold text-black text-lg">Хвостатый доктор</h4>
                <p class="text-gray text-sm">Ветеринарная клиника</p>
                <p class="text-gray text-sm">Немига 40, Минск, РБ</p>
            </div>
        </div>            
        </div>
    `);

  //  popup при загрузке открывается
  clinicMarker.openPopup();
});
