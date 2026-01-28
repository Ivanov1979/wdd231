const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastBox = document.querySelector("#forecast");

const lat = -20.2208;
const lon = -70.1431;
const units = "metric";
const apiKey = "a1b2c3d4e5f6g7h8";


const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

function formatDay(date) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
}

function renderForecast(days) {
    forecastBox.innerHTML = "";
    days.forEach((d) => {
        const row = document.createElement("div");
        row.classList.add("forecast-item");

        const day = document.createElement("span");
        day.textContent = d.label;

        const temp = document.createElement("span");
        temp.textContent = `${Math.round(d.temp)}°`;

        row.append(day, temp);
        forecastBox.appendChild(row);
    });
}

async function getWeather() {
    try {
        const response = await fetch(currentUrl);
        if (!response.ok) throw new Error("Current weather request failed.");
        const data = await response.json();

        currentTemp.textContent = Math.round(data.main.temp);
        weatherDesc.textContent = data.weather[0].description;

        const fResponse = await fetch(forecastUrl);
        if (!fResponse.ok) throw new Error("Forecast request failed.");
        const fData = await fResponse.json();

        const byDate = new Map();

        fData.list.forEach((item) => {
            const dt = new Date(item.dt * 1000);
            const dateKey = dt.toISOString().slice(0, 10);
            const hour = dt.getHours();
            const score = Math.abs(12 - hour);

            if (!byDate.has(dateKey) || score < byDate.get(dateKey).score) {
                byDate.set(dateKey, { score, dt, temp: item.main.temp });
            }
        });

        const todayKey = new Date().toISOString().slice(0, 10);

        const days = [...byDate.entries()]
            .filter(([key]) => key !== todayKey)
            .slice(0, 3)
            .map(([, val]) => ({
                label: formatDay(val.dt),
                temp: val.temp
            }));

        renderForecast(days);
    } catch (err) {
        weatherDesc.textContent = "Weather unavailable.";
        forecastBox.innerHTML = "";
        console.error(err);
    }
}

getWeather();
