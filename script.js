const correctPassword = "28/9/2011";

let flowersStarted = false;

function checkPassword() {
    const input = document.getElementById("password");
    const error = document.getElementById("error");

    const password = input.value.trim();

    if (password !== correctPassword) {
        error.textContent = "الباسورد غلط 😭 جربي تاني ❤️";
        input.focus();
        return;
    }

    error.textContent = "";
    document.getElementById("loginPage").style.display = "none";

    const countdownPage = document.getElementById("countdownPage");
    const birthdayPage = document.getElementById("birthdayPage");

    countdownPage.style.display = "flex";
    birthdayPage.style.display = "none";

    startFallingFlowers();

    let number = 3;
    const counter = document.getElementById("countdown");
    counter.textContent = number;

    const timer = setInterval(() => {
        number--;
        counter.textContent = number;

        counter.style.animation = "none";
        void counter.offsetWidth;
        counter.style.animation = "countdownPulse 1s ease-in-out";

        if (number <= 0) {
            clearInterval(timer);

            setTimeout(() => {
                countdownPage.style.display = "none";
                birthdayPage.style.display = "block";

                const music = document.getElementById("backgroundMusic");

                if (music) {
                    music.play().catch(() => {
                        console.log("اضغطي ▶️ لتشغيل الأغنية");
                    });
                }
            }, 700);
        }
    }, 1000);
}

function startFallingFlowers() {
    if (flowersStarted) return;

    flowersStarted = true;

    const container = document.getElementById("fallingFlowers");

    const items = [
        "🌹", "🌹", "🌹", "🌹",
        "🌷", "🌸", "🌺", "💐",
        "❤️", "❤️", "💕", "💖"
    ];

    const flowerTimer = setInterval(() => {
        const countdownPage = document.getElementById("countdownPage");

        if (!countdownPage || countdownPage.style.display !== "flex") {
            clearInterval(flowerTimer);
            return;
        }

        const flower = document.createElement("div");
        flower.className = "falling-flower";
        flower.textContent = items[Math.floor(Math.random() * items.length)];

        flower.style.left = Math.random() * 100 + "vw";
        flower.style.fontSize = (20 + Math.random() * 28) + "px";
        flower.style.animationDuration = (3 + Math.random() * 3) + "s";

        container.appendChild(flower);

        setTimeout(() => flower.remove(), 7000);
    }, 80);
}

function showExtraMessage() {
    const extra = document.getElementById("extraMessage");

    if (extra) {
        extra.style.display = "block";
        extra.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("password");

    if (input) {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                checkPassword();
            }
        });
    }
});
