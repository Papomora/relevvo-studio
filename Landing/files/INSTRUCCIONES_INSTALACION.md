# 📱 GUÍA DE INSTALACIÓN - LANDING PAGE REFERIDOS
## Para www.relevvostudio.com/referidos

---

## ✅ QUÉ RECIBISTE

**Archivo:** `landing_referidos.html`
- 670 líneas de código HTML + CSS + JavaScript
- Diseño profesional con branding Relevvo (púrpura + magenta)
- Responsivo (funciona en mobile, tablet, desktop)
- Optimizado para conversión
- Animaciones suaves y accesibles

---

## 🚀 PASO 1: CREAR LA PÁGINA EN TU SITIO

### Opción A: Si usas WordPress

1. Ve a **Páginas → Añadir nueva**
2. Cambia el editor a "Código HTML"
3. Copia TODO el contenido de `landing_referidos.html`
4. Pega en el editor de código
5. Slug: `referidos`
6. Publica

**URL resultante:** www.relevvostudio.com/referidos

### Opción B: Si usas Webflow

1. Crea página nueva
2. Nombre: "Referidos"
3. URL: `/referidos`
4. Añade un componente "Embed" (HTML)
5. Copia el contenido de `landing_referidos.html`
6. Pega en el embed
7. Publica

### Opción C: Si usas Next.js / React

1. Crea archivo: `app/referidos/page.tsx`
2. Convierte el HTML a JSX:
   ```tsx
   export default function ReferidosPage() {
     return (
       <div>{/* Pega el contenido aquí */}</div>
     )
   }
   ```
3. Importa Tailwind si necesitas (ya está hecho con CSS)
4. Deploy

### Opción D: Si subas directamente por FTP

1. Abre tu cliente FTP (Filezilla, etc)
2. Navega a: `/public_html/referidos/`
3. Sube `landing_referidos.html` como `index.html`
4. Accede a: www.relevvostudio.com/referidos

---

## 🔧 PASO 2: CONFIGURAR TYPEFORM

**IMPORTANTE:** El formulario está dentro de la landing page. Necesitas reemplazar el ID.

### Pasos:

1. **Ve a [typeform.com](https://typeform.com)**
2. **Inicia sesión** (o crea cuenta si no tienes)
3. **Crea nuevo formulario**
4. **Añade preguntas** (usa el documento `Plan_Referidos_PESOS_v2.md` sección 8)
5. **Configura notificaciones** (para recibir respuestas por email)
6. **Publica el formulario**
7. **Copia el ID único**

### Dónde está el ID de Typeform:

Cuando publiques en Typeform, recibirás una URL como:
```
https://forms.typeform.com/to/abc123xyz
```

El ID es: `abc123xyz`

### Cómo reemplazarlo en la landing:

**En `landing_referidos.html`, busca esta línea (línea ~600):**

```html
<iframe src="https://forms.typeform.com/to/YOUR_FORM_ID" width="100%" height="700" frameborder="0" allow="camera; microphone; geolocation" style="border-radius: 12px; border: none;"></iframe>
```

**Reemplaza `YOUR_FORM_ID` con tu ID real:**

```html
<iframe src="https://forms.typeform.com/to/abc123xyz" width="100%" height="700" frameborder="0" allow="camera; microphone; geolocation" style="border-radius: 12px; border: none;"></iframe>
```

---

## 📧 PASO 3: CONFIGURAR RESPUESTAS AUTOMÁTICAS

### En Typeform:

1. Ve a **Settings → Notifications**
2. **Email notifications**
3. Añade tu email: `hola@relevvostudio.com`
4. Selecciona "Recibir notificación para cada respuesta"
5. Guarda

Ahora recibirás un email cada vez que alguien complete el formulario.

---

## 📱 PASO 4: VERIFICAR QUE FUNCIONA

1. Abre www.relevvostudio.com/referidos en tu navegador
2. Verifica:
   - ✅ Navbar fija arriba
   - ✅ Hero section visible
   - ✅ Botones funcionan (scroll smooth)
   - ✅ Secciones se animan al scroll
   - ✅ FAQ items clickeables
   - ✅ Formulario Typeform carga
   - ✅ Botones de WhatsApp/Email funcionan
   - ✅ Responsive en mobile

3. Completa el formulario de prueba
4. Verifica que llegó el email a `hola@relevvostudio.com`

---

## 🎨 PASO 5: PERSONALIZAR (Opcional)

### Cambiar colores:

Busca en el HTML:
```css
--primary: #5E00A8;        /* Púrpura */
--secondary: #E91E8C;      /* Magenta */
```

Reemplaza con tus colores (formato hex).

### Cambiar links de contacto:

Busca y reemplaza:
- `573223094005` → Tu número WhatsApp
- `hola@relevvostudio.com` → Tu email
- `www.relevvostudio.com` → Tu web
- `@relevvostudio` → Tu Instagram

### Cambiar textos:

Busca en el HTML y reemplaza:
- "relevvo" → Tu nombre
- "Creatividad con método" → Tu tagline
- Números ($105k, $1.990k, etc) → Tus valores

---

## 🚀 PASO 6: PROMOCIONAR

Una vez esté online:

### En Instagram:
```
🎯 Gana dinero refiriendo clientes

Si tu cliente pide diseño → nosotros lo hacemos → vos ganas comisión

15% del primer mes ($105k-$600k)

Sin cuotas. Sin B.S.

www.relevvostudio.com/referidos

Link en bio
```

### En Email:
```
Hola [Nombre],

Abrimos programa de referidos.

Si tu cliente necesita diseño: www.relevvostudio.com/referidos

Sin cuotas, sin B.S.

Saludos,
Relevvo Studio
```

### En WhatsApp:
```
Hey! 👋

Relevvo referidos: refierés cliente → nosotros lo hacemos → ganas comisión

15% ($105k-$600k)

www.relevvostudio.com/referidos
```

---

## 🔐 SEGURIDAD (IMPORTANTE)

### Antes de publicar:

- [ ] Verifica que `YOUR_FORM_ID` fue reemplazado
- [ ] Prueba el formulario completo
- [ ] Verifica emails de notificación funcionan
- [ ] Chequea en mobile que todo se ve bien
- [ ] Verifica links a WhatsApp/Email/Instagram

### Meta tags actualizados:
- Title: "Programa de Referidos | Relevvo Studio"
- Description: "Gana dinero refiriendo clientes a Relevvo..."

---

## 📊 PASO 7: TRACKEAR REFERIDOS

Cuando lleguen respuestas, cópialas a tu **Google Sheet** (creado en `Plan_Referidos_PESOS_v2.md`):

- Fecha
- Nombre referidor
- Email referidor
- Empresa cliente
- Plan propuesto
- Comisión estimada
- Estado

---

## ❓ TROUBLESHOOTING

### El formulario no carga

**Problema:** Ves un espacio en blanco donde debería estar el formulario.

**Soluciones:**
1. Verifica que reemplazaste `YOUR_FORM_ID` con tu ID real
2. Verifica que el ID de Typeform esté correcto (cópialo de nuevo desde Typeform)
3. Espera 30 segundos (Typeform a veces tarda en cargar)
4. Intenta en otra pestaña de incógnito
5. Verifica que Typeform esté activo (no pausado)

### No recibo emails de nuevas respuestas

**Problema:** Completaste el formulario pero no llegó el email.

**Soluciones:**
1. Verifica que configuraste **Email Notifications en Typeform**
2. Chequea la carpeta de Spam/Promotions
3. En Typeform Settings → Notifications, revisa que:
   - Email esté correcto
   - "Send notification for each response" esté activado
4. Prueba completar el formulario de nuevo

### La página se ve rara en mobile

**Problema:** Elementos superpuestos o cortados en teléfono.

**Soluciones:**
1. Verifica viewport meta en HTML (está ahí)
2. Abre en navegador privado/incógnito
3. LimpiaCache del navegador (Ctrl+Shift+Delete)
4. Prueba en otro teléfono/navegador

### Los botones no hacen nada

**Problema:** Clickeas "Comenzar" pero no pasa nada.

**Soluciones:**
1. Abre la consola (F12) y revisa si hay errores
2. Verifica que JavaScript esté habilitado en el navegador
3. Prueba con otro navegador (Chrome, Firefox, Safari)

---

## 📞 SOPORTE

Si algo no funciona:

1. **Copia el error exacto** (desde consola F12)
2. **Toma screenshot** de qué se ve mal
3. **Envía a:** hola@relevvostudio.com
4. **Asunto:** "Landing page referidos - [tu problema]"

---

## 📋 CHECKLIST FINAL

Antes de considerar "terminado":

- [ ] Landing page cargada en www.relevvostudio.com/referidos
- [ ] Typeform ID reemplazado en el HTML
- [ ] Formulario carga correctamente
- [ ] Emails de notificación funcionan
- [ ] Página se ve bien en mobile, tablet, desktop
- [ ] Botones de WhatsApp/Email funcionan
- [ ] Google Sheet creado para trackear referidos
- [ ] Instagram posts listos para publicar
- [ ] Email de invitación lista
- [ ] Contactos identificados (30-50 personas)

**Si completaste TODO:** Estás listo para lanzar. 🚀

---

## 📚 ARCHIVOS RELACIONADOS

Tienes estos documentos además de la landing page:

1. **Plan_Referidos_PESOS_v2.md** - Estrategia completa
2. **Copy_PESOS_v2.md** - Emails y copy listos
3. **Resumen_Ejecutivo_PESOS_v2.md** - Para tu equipo
4. **LANZAMIENTO_EXPRESS_48h.md** - Plan de lanzamiento

Úsalos como referencia para configurar Typeform y redactar emails.

---

**¿Dudas? Revisa los documentos o contacta en WhatsApp: +57 322 309 4005**

Adelante. 💜
