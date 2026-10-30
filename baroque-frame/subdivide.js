function edgeKey(i, j) {
  if (i > j) [i, j] = [j, i];
  return (BigInt(i) << 32n) | BigInt(j);
}

function dist(pos, i, j) {
  const a = i * 3;
  const b = j * 3;
  return Math.hypot(pos[a] - pos[b], pos[a + 1] - pos[b + 1], pos[a + 2] - pos[b + 2]);
}

function pushTri(out, a, b, c) {
  out.push(a, b, c);
}

function splitTri(out, a, b, c, ab, bc, ca) {
  const n = (ab != null) + (bc != null) + (ca != null);
  if (n === 3) {
    pushTri(out, a, ab, ca);
    pushTri(out, b, bc, ab);
    pushTri(out, c, ca, bc);
    pushTri(out, ab, bc, ca);
    return;
  }
  if (n === 1) {
    if (ab != null) {
      pushTri(out, a, ab, c);
      pushTri(out, ab, b, c);
    } else if (bc != null) {
      pushTri(out, b, bc, a);
      pushTri(out, bc, c, a);
    } else {
      pushTri(out, c, ca, b);
      pushTri(out, ca, a, b);
    }
    return;
  }
  if (ab != null && bc != null) {
    pushTri(out, b, bc, ab);
    pushTri(out, ab, bc, c);
    pushTri(out, ab, c, a);
  } else if (bc != null && ca != null) {
    pushTri(out, c, ca, bc);
    pushTri(out, bc, ca, a);
    pushTri(out, bc, a, b);
  } else {
    pushTri(out, a, ab, ca);
    pushTri(out, ab, b, c);
    pushTri(out, ab, c, ca);
  }
}

/** Split edges longer than maxLen so a later non-uniform map cannot chord across a corner. */
export function subdivideLongEdges(pos, idx, maxLen) {
  const verts = Array.from(pos);
  let tris = idx;
  for (let pass = 0; pass < 12; pass++) {
    const mids = new Map();
    const mid = (i, j) => {
      const key = edgeKey(i, j);
      const hit = mids.get(key);
      if (hit != null) return hit;
      const a = i * 3;
      const b = j * 3;
      const id = verts.length / 3;
      verts.push(
        (verts[a] + verts[b]) / 2,
        (verts[a + 1] + verts[b + 1]) / 2,
        (verts[a + 2] + verts[b + 2]) / 2,
      );
      mids.set(key, id);
      return id;
    };
    const next = [];
    let splits = 0;
    for (let t = 0; t < tris.length; t += 3) {
      const a = tris[t];
      const b = tris[t + 1];
      const c = tris[t + 2];
      const ab = dist(verts, a, b) > maxLen ? mid(a, b) : null;
      const bc = dist(verts, b, c) > maxLen ? mid(b, c) : null;
      const ca = dist(verts, c, a) > maxLen ? mid(c, a) : null;
      if (ab == null && bc == null && ca == null) pushTri(next, a, b, c);
      else {
        splitTri(next, a, b, c, ab, bc, ca);
        splits++;
      }
    }
    tris = next;
    if (!splits) break;
  }
  return {
    pos: Float32Array.from(verts),
    idx: Uint32Array.from(tris),
    vertCount: verts.length / 3,
    triCount: tris.length / 3,
  };
}
