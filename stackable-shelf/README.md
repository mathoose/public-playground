# Stackable shelf

A shelf plate with hexagon or square openings. The legs and the corner sockets stay hexagonal either way. Wall thickness is the material between the holes. The flat piece and the legs are separate downloads, so the legs print on a face.

Defaults are a 200 × 200 × 8 mm shelf, 10 mm hexagonal legs, and 100 mm of clear height. The socket is a light press: 0.30 mm of room per side at the mouth, and 0.10 mm of interference per side at the floor.

[Open the designer](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/stackable-shelf-f2df/stackable-shelf/index.html) after this branch is on GitHub. The library card is on the 3D printing page.

## Downloads

| File | What it is |
| --- | --- |
| `stackable-shelf-flat.stl` | The shelf plate, face down |
| `stackable-shelf-legs.stl` | Four legs, already lying on a flat face |
| `stackable-shelf-hole-test.stl` | One corner, one socket, at the hole offset you set |
| `stackable-shelf.3mf` | The plate with the legs stood in the sockets, for checking the stack |

Print the hole test before the full shelf. Press a leg into that one socket. If it will not seat, raise Hole offset and print the test again. If the leg still moves, lower it.

## Build

```bash
npm install
npm test
npm run build
```

`app.bundle.js` is the file the page loads. Do not commit `node_modules`.
