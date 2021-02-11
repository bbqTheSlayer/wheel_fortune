const xhr = new XMLHttpRequest();
const method = 'GET';
const URL = './api/api.php';
const async = false;

xhr.open(method, URL, async);
xhr.send();

if (xhr.status != 200) {
  console.log(xhr.status + ': ' + xhr.statusText);
} else {
   List = xhr.response; 
}

const SectorList = JSON.parse(List);
const RandomSpin = (m, M) => Math.random() * (M - m) + m;
const SectorCount = SectorList.length;
const Spin = document.getElementById("spin");
const ctx = document.getElementById("wheel").getContext('2d');
const Daimeter = ctx.canvas.width;

const getRadius = (Daimeter) => {
    return 0.5 * Daimeter;
};

const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / SectorList.length;
const RotationSpead = 0.991;
let AngleVelocity = 0;
let Angle = 0;
const getIndex = () => Math.floor(SectorCount - Angle / TAU * SectorCount) % SectorCount;



function drawSector(sector, i) {
    const Angle = arc * i;
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(getRadius(Daimeter), getRadius(Daimeter));
    ctx.arc(getRadius(Daimeter), getRadius(Daimeter), getRadius(Daimeter), Angle, Angle + arc);
    ctx.lineTo(getRadius(Daimeter), getRadius(Daimeter));
    ctx.fill();

    ctx.translate(getRadius(Daimeter), getRadius(Daimeter));
    ctx.rotate(Angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(sector.label, getRadius(Daimeter) - 10, 10);

    Spin.textContent = "Крути";
    Spin.style.background = "#DE2702";
    ctx.restore();
};



function rotate() {
    const sector = SectorList[getIndex()];
    ctx.canvas.style.transform = `rotate(${Angle - PI / 2}rad)`;
    Spin.textContent = sector.label;
    Spin.style.background = sector.color;
}



function frame() {
    if (!AngleVelocity) return;
    AngleVelocity *= RotationSpead;
    if (AngleVelocity < 0.002) AngleVelocity = 0;
    Angle += AngleVelocity;
    Angle %= TAU;
    rotate();
}
  


function engine() {
    const sector = SectorList[getIndex()];
    frame();
    requestAnimationFrame(engine);
    sessionStorage.setItem('SectorID', sector.id);
}



SectorList.forEach(drawSector);



let spinClick = false;

function spin(){
    Spin.onclick = function(){
        if(spinClick == false){

            if (!AngleVelocity) AngleVelocity = RandomSpin(0.25, 0.35);
            engine();
            spinClick = true;

            setTimeout(() => {
                const getID = sessionStorage.getItem('SectorID');

                alert('Ваша акция' + ' ' + getID);

                console.log(sessionStorage.getItem('SectorID'));
            },11000);
        }
    }
}

spin();

// localStorage.setItem('click', false);
// let click = localStorage.getItem('click');

// Spin.onclick = function(){
//     if(localStorage.getItem('click') === 'false'){
//         spin();
//         localStorage.setItem('click', true);
//         console.log(localStorage);
//     }
//     else{
//         alert('Вы уже крутили барабан фортуны');
//     }
// }    

// function doOnce() {
//     if (document.cookie.replace(/(?:(?:^|.*;\s*)only_one_operation\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
//       spin();
//       document.cookie = "only_one_operation=true; 31 Dec 9999 23:59:59 GMT";
//     }
// }


// doOnce();