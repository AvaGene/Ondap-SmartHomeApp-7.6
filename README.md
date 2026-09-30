# Ondap Smart Home App

## Connecting to the backend

The app assumes these backend endpoints:

- `GET /devices` returns `{ id, name, type, is_on }[]`.
- `PATCH /devices/:id` accepts `{ is_on: boolean }` and returns the updated device.
- `GET /sensors` returns `{ temperature, humidity, light_level }`.

Set `EXPO_PUBLIC_API_URL` to the backend base URL and set `EXPO_PUBLIC_USE_MOCK=false` to use the real API. Mock mode is enabled by default. Android emulators reach the host computer at `10.0.2.2`, iOS simulators use `localhost`, and physical phones need the computer's LAN IP.
