const svg = document.getElementById('mapSvg');

const rooms = svg.querySelectorAll('.room');
const label = document.getElementById('roomLabel');

const mapLabel = document.getElementById('mapLabel');
const infoIcon = document.getElementById('infoIcon');
const infoName = document.getElementById('infoName');
const infoDesc = document.getElementById('infoDesc');
const infoPhoto = document.getElementById('infoPhoto');


rooms.forEach(room => {
  room.addEventListener('click', () => {

    rooms.forEach(r => r.classList.remove('active'));
    room.classList.add('active');

    infoPhoto.src = room.dataset.photo || '';
    infoIcon.className = room.dataset.icon;
    infoName.textContent = room.dataset.name;
    infoDesc.textContent = room.dataset.desc;
   

    label.textContent = room.dataset.name;

     if (window.innerWidth < 450) { //поставить элемент ровно по центру контейнера независимо от размеров.
      label.style.top = "50%";
      label.style.left = "50%";
      label.style.transform = "translate(-50%, -50%)";

    } else {//oтносительно конкретной комнаты в SVG.

    const bbox = room.getBBox(); //метод SVG, который возвращает границы (bounding box) элемента внутри SVG

    const offsetY = 50;   
    const offsetX = 70;  

    label.style.top = `${bbox.y + bbox.height + offsetY}px`;
    label.style.left = `${bbox.x + bbox.width / 2 + offsetX}px`;
    }

    label.classList.remove('hidden');
  });
});