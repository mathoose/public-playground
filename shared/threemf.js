/**
 * Joint 3MF: separate meshes in one assembly (shared by frame designers).
 */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function u16(view, o, n) {
  view.setUint16(o, n, true);
}
function u32(view, o, n) {
  view.setUint32(o, n, true);
}

function zipStore(files) {
  const encoded = files.map((file) => {
    const name = new TextEncoder().encode(file.name);
    const data = typeof file.data === "string" ? new TextEncoder().encode(file.data) : file.data;
    return { name, data, crc: crc32(data) };
  });
  let size = 22;
  for (const file of encoded) size += 30 + file.name.length + file.data.length + 46 + file.name.length;
  const buf = new Uint8Array(size);
  const view = new DataView(buf.buffer);
  let o = 0;
  const locals = [];
  for (const file of encoded) {
    locals.push(o);
    u32(view, o, 0x04034b50);
    u16(view, o + 4, 20);
    u16(view, o + 6, 0);
    u16(view, o + 8, 0);
    u16(view, o + 10, 0);
    u16(view, o + 12, 0);
    u32(view, o + 14, file.crc);
    u32(view, o + 18, file.data.length);
    u32(view, o + 22, file.data.length);
    u16(view, o + 26, file.name.length);
    u16(view, o + 28, 0);
    buf.set(file.name, o + 30);
    buf.set(file.data, o + 30 + file.name.length);
    o += 30 + file.name.length + file.data.length;
  }
  const central = o;
  for (let i = 0; i < encoded.length; i++) {
    const file = encoded[i];
    u32(view, o, 0x02014b50);
    u16(view, o + 4, 20);
    u16(view, o + 6, 20);
    u16(view, o + 8, 0);
    u16(view, o + 10, 0);
    u16(view, o + 12, 0);
    u16(view, o + 14, 0);
    u32(view, o + 16, file.crc);
    u32(view, o + 20, file.data.length);
    u32(view, o + 24, file.data.length);
    u16(view, o + 28, file.name.length);
    u16(view, o + 30, 0);
    u16(view, o + 32, 0);
    u16(view, o + 34, 0);
    u16(view, o + 36, 0);
    u32(view, o + 38, 0);
    u32(view, o + 42, locals[i]);
    buf.set(file.name, o + 46);
    o += 46 + file.name.length;
  }
  const centralSize = o - central;
  u32(view, o, 0x06054b50);
  u16(view, o + 4, 0);
  u16(view, o + 6, 0);
  u16(view, o + 8, encoded.length);
  u16(view, o + 10, encoded.length);
  u32(view, o + 12, centralSize);
  u32(view, o + 16, central);
  u16(view, o + 20, 0);
  return buf.buffer;
}

function fmt(n) {
  return Number(n).toFixed(5);
}

const IDENTITY = "1 0 0 0 1 0 0 0 1 0 0 0";

function meshXml(mesh) {
  const stride = mesh.numProp || 3;
  const vp = mesh.vertProperties;
  const tris = mesh.triVerts;
  const vertCount = Math.floor(vp.length / stride);
  const lines = ["        <vertices>"];
  for (let i = 0; i < vertCount; i++) {
    const o = i * stride;
    lines.push(`          <vertex x="${fmt(vp[o])}" y="${fmt(vp[o + 1])}" z="${fmt(vp[o + 2])}"/>`);
  }
  lines.push("        </vertices>", "        <triangles>");
  for (let t = 0; t < tris.length; t += 3) {
    lines.push(`          <triangle v1="${tris[t]}" v2="${tris[t + 1]}" v3="${tris[t + 2]}"/>`);
  }
  lines.push("        </triangles>");
  return lines.join("\n");
}

export function meshesTo3mf(parts, assemblyName = "Assembly") {
  const bases = parts
    .map((part, i) => `      <base name="${part.name}" displaycolor="${part.color || "#FFFFFFFF"}"/>`)
    .join("\n");
  const objects = parts
    .map((part, i) => {
      const id = i + 1;
      return `    <object id="${id}" name="${part.name}" type="model" pid="10" pindex="${i}">
      <mesh>
${meshXml(part.mesh)}
      </mesh>
    </object>`;
    })
    .join("\n");
  const assemblyId = parts.length + 1;
  const components = parts
    .map((_, i) => `      <component objectid="${i + 1}" transform="${IDENTITY}"/>`)
    .join("\n");
  const model = `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <metadata name="Application">${assemblyName}</metadata>
  <resources>
    <basematerials id="10">
${bases}
    </basematerials>
${objects}
    <object id="${assemblyId}" name="${assemblyName}" type="model">
      <components>
${components}
      </components>
    </object>
  </resources>
  <build>
    <item objectid="${assemblyId}" transform="${IDENTITY}"/>
  </build>
</model>
`;
  const contentTypes = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
</Types>
`;
  const rels = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>
</Relationships>
`;
  return zipStore([
    { name: "[Content_Types].xml", data: contentTypes },
    { name: "_rels/.rels", data: rels },
    { name: "3D/3dmodel.model", data: model },
  ]);
}
