# Tareas pendientes para una sesión local

Cosas que la sesión en la nube no pudo terminar por restricciones de red.
Cada bloque trae los pasos exactos; al terminar, borrar el bloque.

## 1. Imagen destacada del blog (Magnific, variante A)

La imagen aprobada está en Magnific:
https://www.magnific.com/app/creation/jUzdcMPLD0

Pasos:
1. Descargar la imagen en resolución completa (botón de descarga en Magnific).
2. Recortarla a 1200×630 px (16:9 → 1.9:1, recorte centrado) y guardarla como
   PNG o JPG de menos de ~400 KB en `public/images/blog/marca-mas-que-logo.png`
   (reemplaza la gráfica plana actual). Con Python + Pillow:

   ```python
   from PIL import Image
   im = Image.open("render.png").convert("RGB")
   w, h = im.size
   target = 1200 / 630
   if w / h > target:
       nw = int(h * target); x = (w - nw) // 2; im = im.crop((x, 0, x + nw, h))
   else:
       nh = int(w / target); y = (h - nh) // 2; im = im.crop((0, y, w, y + nh))
   im.resize((1200, 630), Image.LANCZOS).save(
       "public/images/blog/marca-mas-que-logo.png", optimize=True)
   ```

3. Verificar que `content/blog/marca-mas-que-logo.md` sigue apuntando a
   `image: "/images/blog/marca-mas-que-logo.png"` (ya está así).
4. `npx next build` y comprobar que `/blog/marca-mas-que-logo` muestra la
   imagen y que `og:image` la referencia.
5. Commit: `feat(blog): imagen destacada fotográfica (Magnific) para marca-mas-que-logo`.
