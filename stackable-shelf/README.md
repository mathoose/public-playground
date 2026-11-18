# Stackable shelf

A shelf plate with hexagon or square openings. The legs and the corner sockets stay hexagonal either way. Wall thickness is the material between the holes. The flat piece and the legs are separate downloads, so the legs print on a face.

Defaults are a 200 × 200 × 8 mm shelf, 10 mm hexagonal legs, and 100 mm of clear height. The socket is a twist lock: two flat hooks on opposite faces, a short clockwise turn, and 0.55 mm of clear air between the hook and the catch. Press fit is the other choice. On that seat, hole offset is 0.30 mm of room per side at the mouth and 0.10 mm of interference per side at the floor.

[Open the designer](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/shelf-twist-lock-40ec/stackable-shelf/index.html) after this branch is on GitHub. The library card is on the 3D printing page.

## Downloads

| File | What it is |
| --- | --- |
| `stackable-shelf-flat.stl` | The shelf plate, face down |
| `stackable-shelf-legs.stl` | Four legs, already lying on a flat face |
| `stackable-shelf-hole-test.stl` | One corner and one socket, twist lock or press fit, at the settings you set |
| `stackable-shelf.3mf` | The plate with the legs stood in the sockets, for checking the stack |

Print the socket test before the full shelf. For the twist lock, the hooks drop into the lead-ins and turn clockwise until they stop, with clear air under the catch. For the press fit, press a leg into that one socket. If it will not seat, raise Hole offset and print the test again. If the leg still moves, lower it.

## Build

```bash
npm install
npm test
npm run build
```

`app.bundle.js` is the file the page loads. Do not commit `node_modules`.
