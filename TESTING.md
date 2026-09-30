# Manual Testing Checklist

- [ ] First load: launch in mock mode and confirm the dashboard, devices, and sensors load without crashing.
- [ ] Pull-to-refresh: pull down on Dashboard, Devices, and Sensors and confirm the correct data refreshes.
- [ ] Connected toggle: connect the gateway, toggle a device, and confirm the optimistic state and final state update.
- [ ] Disconnected toggle: disconnect the gateway and confirm device switches are disabled and the connection notice is shown.
- [ ] Simulated failure: retry after a simulated connection or service failure and confirm the matching error banner clears on success.
- [ ] Dark mode persistence: enable Dark Mode, restart the app, and confirm the dark theme remains enabled.
- [ ] Auto-connect: enable Auto Connect, restart the app, and confirm the gateway connects on launch.
- [ ] Mock/API switch: set `EXPO_PUBLIC_USE_MOCK=true` and verify mock data; set it to `false` with a reachable backend and verify API data.