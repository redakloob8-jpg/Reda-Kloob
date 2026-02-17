// ==========================
// Configuration
// ==========================
const RSS_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://www.aljazeera.net/aljazeera/rss";

const reelsContainer = document.getElementById("reels");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

// ==========================
// Fetch News
// ==========================
async function fetchNews() {
  try {
    loading.classList.remove("hidden");
    errorBox.classList.add("hidden");

    const response = await fetch(RSS_URL);
    if (!response.ok) throw new Error("Network Error");

    const data = await response.json();
    renderNews(data.items);

    loading.classList.add("hidden");
    reelsContainer.classList.remove("hidden");
  } catch (err) {
    loading.classList.add("hidden");
    errorBox.classList.remove("hidden");
    console.error(err);
  }
}

// ==========================
// Render Reels
// ==========================
function renderNews(items) {
  reelsContainer.innerHTML = "";

  items.forEach(item => {
    const reel = document.createElement("section");
    reel.className = "reel";

    const image =
      item.enclosure?.link ||
      "https://via.placeholder.com/1080x1920?text=Aljazeera";

    reel.style.backgroundImage = `url(${image})`;

    reel.innerHTML = `
      <div class="content">
        <h2>${item.title}</h2>
        <p>${item.description.replace(/<[^>]+>/g, "").slice(0, 150)}...</p>
        <a href="${item.link}" target="_blank">اقرأ المزيد</a>
      </div>
    `;

    reelsContainer.appendChild(reel);
  });
}

// ==========================
// Init + Auto Refresh
// ==========================
fetchNews();
setInterval(fetchNews, 60000);
