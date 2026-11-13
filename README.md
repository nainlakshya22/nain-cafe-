# Listen Halifax

A responsive multi-page React and Vite website for Listen Halifax.

## Run locally

```sh
npm install
npm run dev
```

Vite is configured to serve locally at `http://localhost:5173`.
Create a production build with `npm run build`; preview it with `npm run preview`.
The hosting platform must route unknown paths to `index.html` so the React
Router pages work on direct visits.

## Content notes

- Business hours (8:00 am–6:00 pm, every day), address, and featured drink names
  were checked against the public `@listenhalifax` Instagram profile and posts.
- Prices and unconfirmed menu selections are intentionally marked for
  confirmation in `src/siteData.js`.
- The reference website's image assets are used with the user's permission.
  They are illustrative editorial images, not photographs of Listen Halifax;
  the site labels them accordingly and links to the official Instagram profile
  for current café photos.
- The contact form validates fields in the browser and prepares an email draft;
  it does not claim to submit to a server.
