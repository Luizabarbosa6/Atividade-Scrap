// scraper.js
const axios = require("axios");
const cheerio = require("cheerio");

async function fazerScraping() {
  console.log("🔍 Buscando notícias de clima no G1...");

  const url = "https://g1.globo.com/natureza/";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const noticias = [];
  $("a.feed-post-link").each((i, el) => {
    if (i >= 5) return false;

    const titulo = $(el).text().trim();
    const link = $(el).attr("href");

    if (titulo && link) {
      noticias.push(
        `• <strong>${titulo}</strong><br><a href="${link}" target="_blank">${link}</a>`
      );
    }
  });

  if (noticias.length === 0) {
    return "⚠️ Nenhuma notícia de clima encontrada.";
  }

  return noticias.join("<br><br>");
}

module.exports = { fazerScraping };
