# Private models (PIN-locked)

**Private models v1 · Oct 17, 2026**

Personal-use prints whose licenses don't allow sharing:

- **2-phone wall holder**: a remix of Jonesman's [Wall-Mounted Phone Holder Integrated Cable pocket](https://makerworld.com/models/3024216) (MakerWorld, Standard Digital File License). The pocket is deepened from 17.2 mm to 27 mm so it holds two phones in cases. Live sliders for depth and width, plus a screw (V2) or glue (V2 closed) base.
- **Mini Halloween Pumpkin Fidget** by CHKN3D (MakerWorld, Standard Digital File License), at 1x, 2x and 3x plus a 2x + 3x plate (STL / 3MF).

This repo is public, so the model files are **only committed encrypted**. `vault/` holds AES-256-GCM ciphertext: a key is derived from the PIN with PBKDF2-SHA256 (600,000 iterations, random salt), and the file list is encrypted too. The page asks for the PIN and decrypts in the browser with WebCrypto. The PIN never leaves the device and is never stored.

[Open (preview branch)](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/private-models-a7fd/private/index.html) · after merge: [main](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/main/private/index.html)

On htmlpreview the vault is fetched from `raw.githubusercontent.com` on the same branch. Anywhere else it is fetched from `./vault/`.

## How the holder is deepened

The source mesh is split at the plane `Y = 1 mm`, which only crosses the floor and the two side walls (both straight along Y there). Everything in front moves forward by `depth − 17.2`, and the floor and walls stretch to fill the gap. Width works the same way at `X = ±13 mm`. Wall thickness (2 mm), the floor slot, the cable clip, the 50 mm screw holes and the support-free profile are unchanged. Every result is checked as a closed solid with manifold-3d.

## Rebuild / reseal

```bash
npm install
npm run build          # app.bundle.js
npm test               # with LIBRARY_PIN set, also proves the committed vault opens
LIBRARY_PIN=… npm run seal -- /path/OUTSIDE/the/repo/vault-plain
```

`vault-plain/` holds the plaintext files plus `manifest-plain.json`, and it must stay outside the repo. Never commit `.stl`, `.3mf` or `.msh` files here. `npm test` fails if any are present.

**PIN strength:** the vault can be copied and attacked offline. A 4–6 digit PIN only slows that down, so use a long passphrase if the files matter. To change it, reseal with the new `LIBRARY_PIN`.
