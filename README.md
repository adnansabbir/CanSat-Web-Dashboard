# CanSat Web Dashboard

A real-time web dashboard for logging and visualizing telemetry data from CanSat devices during competitions. Built with Angular 8, it displays live sensor readings, tracks the satellite's flight path on a 3D globe, and charts telemetry over time.

## What is CanSat?

A [CanSat](https://en.wikipedia.org/wiki/CanSat) is a miniaturized satellite payload that fits inside the volume of a soda can (66mm diameter, 115mm height, under 350g). Used in student competitions, CanSats are deployed from a small rocket and transmit sensor data wirelessly as they descend under a parachute.

## Features

- **Real-time telemetry dashboard** — live charts for sensor data streamed from the CanSat
- **3D flight tracking** — visualizes the CanSat's position and descent path using Cesium
- **Map view** — Google Maps integration for ground-level position tracking
- **Charting** — Chart.js and Chartist for time-series data visualization
- **Responsive UI** — Bootstrap 4 Paper Dashboard theme

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 8, TypeScript |
| 3D Globe | Cesium |
| Maps | Google Maps (`@ngui/map`) |
| Charts | Chart.js, Chartist |
| UI | Bootstrap 4, Paper Dashboard |
| Notifications | ngx-toastr |

## Prerequisites

- Node.js (v12+)
- npm

## Setup

```bash
# Clone the repo
git clone https://github.com/adnansabbir/CanSat-Web-Dashboard.git
cd CanSat-Web-Dashboard

# Install dependencies
npm install

# Start the dev server (opens browser automatically)
npm start
```

The app will be served at `http://localhost:4200`.

### Clean install

```bash
npm run install:clean
```

Removes `node_modules` and `package-lock.json`, reinstalls everything, and starts the server.

## Build

```bash
npm run build
```

Output is placed in the `dist/` directory.

## Project Structure

```
src/app/
├── pages/
│   ├── dashboard/          # Main telemetry dashboard
│   └── cansat-tracking/    # 3D globe + flight path tracking
├── layouts/                # App shell layouts
├── sidebar/                # Navigation sidebar
└── shared/                 # Shared services and utilities
```

## License

MIT
