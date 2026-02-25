// script.js

const paganiCars = [
    { id: 1, model: "Utopia", year: 2023, price: "$2.5M", hp: 864, image: "https://www.pagani.com/app/uploads/2022/09/Utopia_1.jpg", engine: "6.0L V12 Twin-Turbo", speed: "354 km/h", acceleration: "2.8s" },
    { id: 2, model: "Huayra Roadster BC", year: 2020, price: "$3.5M", hp: 800, image: "https://www.pagani.com/app/uploads/2019/07/Roadster-BC-1.jpg", engine: "6.0L V12 AMG", speed: "370 km/h", acceleration: "3.1s" },
    { id: 3, model: "Huayra R", year: 2021, price: "$3.1M", hp: 850, image: "https://www.pagani.com/app/uploads/2021/03/Huayra-R-Studio-1.jpg", engine: "6.0L V12-R", speed: "380 km/h", acceleration: "2.6s" },
    { id: 4, model: "Zonda Cinque", year: 2009, price: "$10M", hp: 678, image: "https://images.wallpaperscraft.com/wallpaper/single/pagani_zonda_cinque_roadster_car_black_93850_1920x1080.jpg", engine: "7.3L AMG V12", speed: "350 km/h", acceleration: "3.4s" },
    { id: 5, model: "Codalunga", year: 2022, price: "$7.4M", hp: 840, image: "https://www.pagani.com/app/uploads/2022/06/Pagani-Codalunga-1.jpg", engine: "6.0L V12 Biturbo", speed: "354 km/h", acceleration: "3.0s" },
    { id: 6, model: "Zonda Revolucion", year: 2013, price: "$2.8M", hp: 800, image: "https://p4.wallpaperbetter.com/wallpaper/704/302/952/pagani-zonda-revolucion-wallpaper-preview.jpg", engine: "6.0L V12 AMG", speed: "350 km/h", acceleration: "2.6s" }
];

// Display Cars
function displayCars() {
    const grid = document.getElementById('carGrid');
    paganiCars.forEach((car, index) => {
        const card = document.createElement('div');
        card.className = 'car-card group cursor-pointer';
        card.innerHTML = `
            <div class="relative overflow-hidden aspect-[16/10] bg-zinc-900 border border-white/5 mb-8">
                <img src="${car.image}" class="card-img w-full h-full object-cover transition-all duration-1000">
            </div>
            <h3 class="text-3xl pagani-font italic">${car.model}</h3>
            <p class="text-[9px] uppercase tracking-[0.4em] text-zinc-500 mt-2">${car.year} // ${car.hp} HP</p>
        `;
        card.onclick = () => openCarModal(car);
        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), index * 100);
    });
}

// Modal Logic
function openCarModal(car) {
    document.getElementById('modalImg').src = car.image;
    document.getElementById('modalTitle').innerText = car.model;
    document.getElementById('modalYear').innerText = car.year;
    document.getElementById('modalPrice').innerText = car.price;
    document.getElementById('modalSpecs').innerHTML = `
        <div class="flex justify-between border-b border-white/5 pb-2"><span class="text-[9px] uppercase text-zinc-500">Engine</span><span class="text-sm italic">${car.engine}</span></div>
        <div class="flex justify-between border-b border-white/5 pb-2"><span class="text-[9px] uppercase text-zinc-500">Top Speed</span><span class="text-sm italic">${car.speed}</span></div>
        <div class="flex justify-between border-b border-white/5 pb-2"><span class="text-[9px] uppercase text-zinc-500">Acceleration</span><span class="text-sm italic">${car.acceleration}</span></div>
    `;
    document.getElementById('carModal').classList.replace('hidden', 'flex');
    document.body.style.overflow = 'hidden';
}

function closeCarModal() {
    document.getElementById('carModal').classList.replace('flex', 'hidden');
    document.body.style.overflow = 'auto';
}

// Auth Logic
let isLoginMode = true;
function openAuth() { document.getElementById('authModal').classList.replace('hidden', 'flex'); }
function closeAuth() { document.getElementById('authModal').classList.replace('flex', 'hidden'); }
function toggleAuth() {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').innerText = isLoginMode ? "Sign In" : "Register";
    document.getElementById('nameGroup').classList.toggle('hidden');
    document.getElementById('authBtn').innerText = isLoginMode ? "Register Account" : "Back to Login";
}

document.getElementById('authForm').onsubmit = (e) => {
    e.preventDefault();
    const user = { name: document.getElementById('authName').value || "Horacio", email: document.getElementById('authEmail').value };
    localStorage.setItem('pagani_user', JSON.stringify(user));
    location.reload();
};

function checkUser() {
    const user = JSON.parse(localStorage.getItem('pagani_user'));
    if (user) {
        document.getElementById('authStatus').innerHTML = `
            <div class="flex items-center gap-4">
                <span class="text-[10px] text-amber-500 font-bold uppercase tracking-widest">${user.name}</span>
                <button onclick="localStorage.removeItem('pagani_user'); location.reload();" class="text-[9px] border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition">Exit</button>
            </div>
        `;
    }
}

// Scroll Event
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
});

// Init
displayCars();
checkUser();