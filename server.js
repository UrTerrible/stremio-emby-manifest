const express = require('express');
const app = express();

app.get('/:encoded/manifest.json', (req, res) => {
  try {
    const encoded = req.params.encoded;
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const { serverUrl, userId, accessToken } = JSON.parse(decoded);

    const manifest = {
      id: "org.streambridge.embyresolver.custom1",
      version: "1.1.0",
      name: "StreamBridge: Emby Custom #1",
      description: "Stream media from your Emby server using IMDb/TMDB IDs.",
      catalogs: [],
      resources: [
        {
          name: "stream",
          types: ["movie", "series"],
          idPrefixes: ["tt", "imdb:", "tmdb:"]
        }
      ],
      types: ["movie", "series"],
      behaviorHints: {
        configurable: false,
        configurationRequired: false
      },
      config: [],
      extra: {
        serverUrl,
        userId,
        accessToken
      }
    };

    res.json(manifest);
  } catch (err) {
    res.status(400).json({ error: "Invalid base64 or JSON format." });
  }
});

app.listen(3000, () => console.log('Manifest server running on port 3000'));
