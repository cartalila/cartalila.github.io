/* =====================================================================
   LILA · PASTELERÍA · CAFÉ — DATOS DE LA CARTA
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para cambiar datos.
   · CONFIG: datos del local (WhatsApp, horario, Wi-Fi, Google Sheets…).
     Lo que se deje vacío ("") simplemente no se muestra en la carta.
   · CARTA: un objeto por producto, en el orden en que se muestran.
     Si conectas la hoja de Google (googleSheetId), la carta se lee de
     la hoja y esta lista queda como respaldo si no hay internet.
   ===================================================================== */

window.LILA_CONFIG = {
  nombre: "Lila",
  subtitulo: "Pastelería · Café",
  lema: "Sabores del Caribe, horneados con cariño",
  historia: "Lila nace en honor a una mujer que convirtió su hogar en lugar de encuentro. Cada receta guarda algo de ella: el sabor del Caribe, la mesa compartida y el gusto por consentir.",

  // --- Contacto (vacío = no se muestra) --------------------------------
  whatsapp: "",            // Solo números con indicativo, ej: "573001234567"
  enviarPedidoPorWhatsApp: true, // Muestra "Enviar por WhatsApp" en Mi pedido (si hay número)
  telefono: "",            // ej: "3001234567"
  instagram: "",           // Usuario sin @, ej: "lilapasteleria"
  direccion: "",           // ej: "Calle 12 # 10-25, Cereté, Córdoba"
  mapa: "",                // Enlace de Google Maps del local
  wifi: { red: "", clave: "" },

  // --- Horario (vacío = no se muestra "Abierto/Cerrado") ---------------
  // Formato "HH:MM-HH:MM" (24 h). Varios turnos: "07:00-12:00, 14:00-21:00"
  horario: {
    lunes: "", martes: "", miercoles: "", jueves: "",
    viernes: "", sabado: "", domingo: ""
  },
  zonaHoraria: "America/Bogota",

  // --- Pedido ----------------------------------------------------------
  propinaSugerida: 0.10,   // Propina voluntaria sugerida (10 %)

  // --- Carta en vivo desde Google Sheets (opcional) ---------------------
  // 1) Sube "carta_lila_google_sheets.xlsx" a Drive y ábrelo con Google Sheets.
  // 2) Compartir → "Cualquier persona con el enlace" → Lector.
  // 3) Copia el ID de la URL: docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
  googleSheetId: "",
  googleSheetHoja: "Carta",
  datosURL: "",            // Alternativa avanzada: URL directa a un CSV
  revisarCambiosCadaMin: 3,

  // Fecha de esta versión de respaldo (se muestra si no hay hoja conectada)
  versionCarta: "2026-11-13",

  // Vista con la que abre la carta: "fotos" o "lista" (el cliente puede cambiarla)
  vistaInicial: "fotos",
  // Secciones que van sobre fondo lavanda, como en la carta impresa
  seccionesLila: ["Bar"],
  // Fotos que se alternan en las ventanas de la portada (nombres de productos con foto)
  fachada: ["Affogato", "A la burrata", "Criolla", "Chips de plátano criollos", "Tentación Lila", "Tequila sunrise", "Soda italiana de kiwi", "Capuchino", "Ensalada César", "Wrap de pollo Alfredo"],
  // "Combínalo con": sugerencias por categoría o sección (nombres exactos de la carta)
  combina: {
    "Cocina": ["Limonada de coco", "Soda de frutos rojos", "Soda italiana de kiwi", "Limonada natural", "Mojito"],
    "Pastelería": ["Capuchino", "Americano", "Affogato", "Espresso doble"],
    "Panadería": ["Capuchino", "Americano", "Milo caliente", "Espresso doble"],
    "Galletas": ["Capuchino", "Milo caliente", "Affogato"],
    "Café": ["Torta de enyucado", "Croissant de mantequilla", "Palito de queso", "Galleta con chips de chocolate"],
    "Bebidas": ["Chips de plátano criollos", "Mini patacones burger", "Pollo y aguacate"],
    "Bar": ["Chips de plátano criollos", "Mini patacones burger", "Pulled pork"]
  },

  // Notas que acompañan algunas categorías
  categorias: {
    "Jugos naturales": { subtitulo: "En agua o en leche" },
    "Especiales de la semana": { subtitulo: "Cada día de la semana tiene su antojo" }
  },

  avisoAlergias: "Si tienes alguna alergia, avísanos antes de ordenar. En nuestra cocina se manejan gluten, lácteos, huevo, frutos secos, mostaza y pescado; los productos sin gluten pueden contener trazas.",
  avisoPrecios: "Precios en pesos colombianos, impuestos incluidos.",
  avisoAlcohol: "El exceso de alcohol es perjudicial para la salud · Prohíbase el expendio de bebidas embriagantes a menores de edad.",
  despedida: "Gracias por compartir nuestra mesa"
};

/* ---------------------------------------------------------------------
   CAMPOS DE CADA PRODUCTO (mismos nombres que las columnas de la hoja)
   seccion, categoria, nombre, descripcion, precio (número sin puntos)
   contiene   → alérgenos separados por coma: Gluten, Lácteos, Huevo,
                Frutos secos, Mostaza, Pescado, Alcohol.
                Condicional entre paréntesis: "Lácteos (en leche)"
   etiquetas  → ej: "Sin gluten, Opción integral, Saludable"
   opciones   → grupos separados por ";"  ·  opciones por "|"
                "Pan: Brioche | Integral de semillas"  → el cliente elige una
                "Extra: Gratinado +3000"               → adicional opcional
   foto       → nombre del archivo en img/ (sin extensión) o una URL
   disponible → "SI" / "NO" (NO = aparece como "Agotado hoy")
   dias       → días en que se vende, ej: "Viernes" o "Sábado, Domingo"
   otros_dias → qué pasa los demás días: "Bajo pedido" o "No disponible"
   grupo      → subtítulo para agrupar especiales (ej: "Día de muffins")
   nota       → texto corto extra · destacado → "SI" = tarjeta especial
   --------------------------------------------------------------------- */

window.LILA_CARTA = [
  // ============================== COCINA ==============================
  { seccion: "Cocina", categoria: "Plato insignia", destacado: "SI",
    nombre: "Pastelón de maduro «La Lila»", precio: 28000,
    descripcion: "Capas de plátano maduro, boloñesa de res y cerdo (tomate, zanahoria y pimentón), queso costeño, mozzarella, huevo y crema de leche, gratinado al horno. Se sirve con ensalada de lechuga y tomate, suero costeño y chimichurri.",
    contiene: "Lácteos, Huevo" },

  { seccion: "Cocina", categoria: "Para compartir", nombre: "Chips de plátano criollos", precio: 12000,
    descripcion: "Chips de plátano verde con chorizo santarosano dorado, pico de gallo fresco y suero costeño para acompañar.",
    contiene: "Lácteos", foto: "chips-platano" },
  { seccion: "Cocina", categoria: "Para compartir", nombre: "Mini patacones burger", precio: 25000,
    descripcion: "4 unidades. Patacón de plátano verde, carne de res y cerdo, mozzarella, lechuga y cebolla caramelizada. Con salsa Lila de la casa para acompañar.",
    contiene: "Gluten, Lácteos, Huevo, Mostaza", foto: "mini-patacones" },

  { seccion: "Cocina", categoria: "Sándwiches", nombre: "Pollo y aguacate", precio: 22000,
    descripcion: "Pan brioche o integral de semillas, pechuga de pollo asada, aguacate, lechuga, tomate y salsa especial Lila (mayonesa, mostaza, miel y albahaca).",
    contiene: "Gluten, Lácteos, Huevo, Mostaza", etiquetas: "Opción integral",
    opciones: "Pan: Brioche | Integral de semillas", foto: "sandwich-pollo-aguacate" },
  { seccion: "Cocina", categoria: "Sándwiches", nombre: "Pulled pork", precio: 28000,
    descripcion: "Pan brioche relleno de bondiola de cerdo desmechada en salsa BBQ, ensalada coleslaw y lechuga.",
    contiene: "Gluten, Lácteos, Huevo", foto: "sandwich-pulled-pork" },
  { seccion: "Cocina", categoria: "Sándwiches", nombre: "A la burrata", precio: 25000,
    descripcion: "Pan brioche o integral de semillas, queso burrata, jamón serrano, tomates cherry y lechuga romana, con salsas de la casa.",
    contiene: "Gluten, Lácteos, Huevo, Mostaza", etiquetas: "Opción integral",
    opciones: "Pan: Brioche | Integral de semillas", foto: "sandwich-burrata" },

  { seccion: "Cocina", categoria: "Wraps", nombre: "Wrap de pulled pork", precio: 30000,
    descripcion: "Tortilla de harina de trigo dorada, cerdo desmechado en salsa BBQ, mozzarella, cebolla caramelizada y lechuga, con parmesano rallado.",
    contiene: "Gluten, Lácteos", foto: "wrap-pulled-pork" },
  { seccion: "Cocina", categoria: "Wraps", nombre: "Wrap de pollo Alfredo", precio: 22000,
    descripcion: "Tortilla de harina de trigo dorada, pollo desmechado en salsa Alfredo (crema de leche, mantequilla, ajo y parmesano), mozzarella, lechuga y tomate. Con salsa Lila de la casa para acompañar.",
    contiene: "Gluten, Lácteos, Huevo, Mostaza", foto: "wrap-pollo-alfredo" },
  { seccion: "Cocina", categoria: "Wraps", nombre: "Wrap de boloñesa", precio: 25000,
    descripcion: "Tortilla de harina de trigo dorada, boloñesa de res y cerdo, mozzarella y lechuga. Con salsa Lila de la casa para acompañar.",
    contiene: "Gluten, Lácteos, Huevo, Mostaza", opciones: "Extra: Gratinado +3000", foto: "wrap-bolonesa" },

  { seccion: "Cocina", categoria: "Pastas", nombre: "Boloñesa", precio: 30000,
    descripcion: "Fettuccine con boloñesa de res y cerdo de cocción lenta (tomate, zanahoria, pimentón y especias), mantequilla, parmesano y hierbabuena.",
    contiene: "Gluten, Lácteos", foto: "pasta-bolonesa" },
  { seccion: "Cocina", categoria: "Pastas", nombre: "Alfredo con pollo", precio: 30000,
    descripcion: "Fettuccine en salsa Alfredo (crema de leche, mantequilla, ajo y parmesano) con pollo desmechado, parmesano rallado, pimienta negra y perejil.",
    contiene: "Gluten, Lácteos", foto: "pasta-alfredo" },
  { seccion: "Cocina", categoria: "Pastas", nombre: "Criolla", precio: 30000,
    descripcion: "Penne en salsa cremosa de tomate (crema de leche, cebolla, pimentón y ajo) con pollo, chorizo santarosano y cubos de queso costeño asado; termina con parmesano y perejil.",
    contiene: "Gluten, Lácteos", foto: "pasta-criolla" },

  { seccion: "Cocina", categoria: "Ensalada", nombre: "Ensalada César", precio: 32000,
    descripcion: "Lechuga romana, pechuga de pollo a la plancha en tajadas, tomates cherry, parmesano, crutones de la casa y salsa César (mayonesa, parmesano, limón, mostaza Dijon, ajo y salsa inglesa).",
    contiene: "Gluten, Lácteos, Huevo, Mostaza, Pescado", etiquetas: "Saludable", foto: "ensalada-cesar" },

  // ============================ PASTELERÍA ============================
  { seccion: "Pastelería", categoria: "Especiales de la semana", grupo: "Día de muffins",
    dias: "Miércoles", otros_dias: "Bajo pedido", nota: "Los demás días, bajo pedido.",
    nombre: "Muffin de ahuyama", precio: 7000,
    descripcion: "Ahuyama, harinas de avena sin gluten y almendra, huevo, aceite de coco, panela, canela, jengibre y semillas de ahuyama.",
    contiene: "Huevo, Frutos secos", etiquetas: "Sin gluten" },
  { seccion: "Pastelería", categoria: "Especiales de la semana", grupo: "Día de muffins",
    dias: "Miércoles", otros_dias: "Bajo pedido", nota: "Los demás días, bajo pedido.",
    nombre: "Muffin de banano", precio: 7000,
    descripcion: "Banano maduro, harinas de avena sin gluten y almendra, huevo, aceite de coco, canela y nueces. Sin azúcar añadida.",
    contiene: "Huevo, Frutos secos", etiquetas: "Sin gluten, Sin azúcar añadida" },
  { seccion: "Pastelería", categoria: "Especiales de la semana", grupo: "Viernes de brownie",
    dias: "Viernes", otros_dias: "No disponible", nota: "Solo los viernes, hasta agotar existencias.",
    nombre: "Brownie con helado", precio: 12000,
    descripcion: "Brownie de chocolate tibio con una bola de helado de vainilla y salsa de chocolate.",
    contiene: "Gluten, Lácteos, Huevo" },
  { seccion: "Pastelería", categoria: "Especiales de la semana", grupo: "Dulces de fin de semana",
    dias: "Sábado, Domingo", otros_dias: "No disponible", nota: "Disponibles los fines de semana.",
    nombre: "Cuchareable de red velvet", precio: 15000,
    descripcion: "Postre de cuchara de red velvet.",
    contiene: "Gluten, Lácteos, Huevo" },
  { seccion: "Pastelería", categoria: "Especiales de la semana", grupo: "Dulces de fin de semana",
    dias: "Sábado, Domingo", otros_dias: "No disponible", nota: "Disponibles los fines de semana.",
    nombre: "Cheesecake de frutos rojos", precio: 15000,
    descripcion: "Base de galleta María y mantequilla; relleno de queso crema, leche condensada y crema de leche; salsa casera de fresa, mora y arándanos.",
    contiene: "Gluten, Lácteos" },

  { seccion: "Pastelería", categoria: "En honor a Lila", destacado: "SI",
    nombre: "Torta de enyucado", precio: 7000,
    descripcion: "Receta de la casa: yuca rallada, coco, queso costeño, mantequilla, leche de coco, azúcar y anís, horneada hasta dorar.",
    contiene: "Lácteos" },

  { seccion: "Pastelería", categoria: "Tortas", nombre: "Chocolate", precio: 10000,
    descripcion: "Bizcocho húmedo de cacao (harina de trigo, huevo, leche, aceite y café) con ganache de chocolate semiamargo y crema de leche.",
    contiene: "Gluten, Lácteos, Huevo" },
  { seccion: "Pastelería", categoria: "Tortas", nombre: "Vainilla", precio: 10000,
    descripcion: "Bizcocho de mantequilla, huevo, harina de trigo, leche y vainilla.",
    contiene: "Gluten, Lácteos, Huevo" },
  { seccion: "Pastelería", categoria: "Tortas", nombre: "Zanahoria", precio: 10000,
    descripcion: "Harinas de almendra y avena sin gluten, zanahoria, huevo, panela, aceite de coco, nueces, uvas pasas y canela. Cubierta de queso crema, miel y naranja.",
    contiene: "Lácteos, Huevo, Frutos secos", etiquetas: "Sin gluten" },

  { seccion: "Pastelería", categoria: "Postres", nombre: "Pavé de leche Klim", precio: 15000,
    descripcion: "Capas de galletas humedecidas en leche y crema de leche batida con leche en polvo Klim, leche condensada y vainilla.",
    contiene: "Gluten, Lácteos" },

  { seccion: "Pastelería", categoria: "Yogurt", nombre: "Yogurt griego", precio: 9000,
    descripcion: "Yogurt griego cremoso con granola y frutas frescas de temporada.",
    contiene: "Lácteos, Gluten" },

  // ========================= PANADERÍA Y CAFÉ =========================
  { seccion: "Panadería y café", categoria: "Panadería", nombre: "Croissant de mantequilla", precio: 5500,
    descripcion: "Masa hojaldrada de harina de trigo, mantequilla, leche, azúcar y levadura, barnizada con huevo.",
    contiene: "Gluten, Lácteos, Huevo" },
  { seccion: "Panadería y café", categoria: "Panadería", nombre: "Palito de queso", precio: 4500,
    descripcion: "Hojaldre de harina de trigo y mantequilla relleno de queso costeño, con parmesano por encima.",
    contiene: "Gluten, Lácteos, Huevo" },
  { seccion: "Panadería y café", categoria: "Panadería", nombre: "Pastel de carne", precio: 5000,
    descripcion: "Hojaldre relleno de boloñesa de res y cerdo con papa.",
    contiene: "Gluten, Lácteos, Huevo" },
  { seccion: "Panadería y café", categoria: "Panadería", nombre: "Pastel de pollo", precio: 5000,
    descripcion: "Hojaldre relleno de pollo en salsa cremosa (crema de leche y parmesano), cebolla, pimentón y mozzarella.",
    contiene: "Gluten, Lácteos, Huevo" },

  { seccion: "Panadería y café", categoria: "Galletas", nombre: "Galleta con chips de chocolate", precio: 5000,
    descripcion: "Mantequilla, azúcar morena, huevo, harina de trigo, vainilla y chips de chocolate.",
    contiene: "Gluten, Lácteos, Huevo" },
  { seccion: "Panadería y café", categoria: "Galletas", nombre: "Galleta craquelada de chocolate", precio: 5000,
    descripcion: "Galleta suave de chocolate con el exterior craquelado y azúcar pulverizada.",
    contiene: "Gluten, Lácteos, Huevo" },

  { seccion: "Panadería y café", categoria: "Café", nombre: "Espresso doble", precio: 4500,
    descripcion: "Doble shot de espresso, intenso y con crema.", foto: "expreso" },
  { seccion: "Panadería y café", categoria: "Café", nombre: "Capuchino", precio: 9000,
    descripcion: "Espresso, leche vaporizada y abundante espuma de leche; canela o cacao opcional.",
    contiene: "Lácteos", opciones: "Toque: Sin toque | Canela | Cacao", foto: "capuchino" },
  { seccion: "Panadería y café", categoria: "Café", nombre: "Americano", precio: 5000,
    descripcion: "Espresso y agua caliente." },
  { seccion: "Panadería y café", categoria: "Café", nombre: "Affogato", precio: 12000,
    descripcion: "Helado de vainilla «ahogado» en un espresso caliente.",
    contiene: "Lácteos", foto: "affogato" },
  { seccion: "Panadería y café", categoria: "Café", nombre: "Milo caliente", precio: 10000,
    descripcion: "Milo (bebida de malta y cacao) disuelto en leche caliente.",
    contiene: "Gluten, Lácteos" },

  // ============================= BEBIDAS ==============================
  { seccion: "Bebidas", categoria: "Limonadas y sodas", nombre: "Limonada natural", precio: 8000,
    descripcion: "Limón recién exprimido, agua, azúcar y hielo." },
  { seccion: "Bebidas", categoria: "Limonadas y sodas", nombre: "Limonada de coco", precio: 10000,
    descripcion: "Limón, crema de coco, jarabe de azúcar y hielo, con borde de coco tostado." },
  { seccion: "Bebidas", categoria: "Limonadas y sodas", nombre: "Limonada cerezada", precio: 10000,
    descripcion: "Frapé de limón con jarabe de cereza y una cereza marrasquino." },
  { seccion: "Bebidas", categoria: "Limonadas y sodas", nombre: "Soda de frutos rojos", precio: 13000,
    descripcion: "Jarabe casero de fresa, mora y arándanos, limón, soda y hielo." },
  { seccion: "Bebidas", categoria: "Limonadas y sodas", nombre: "Soda de frutos amarillos", precio: 13000,
    descripcion: "Jarabe casero de maracuyá, mango y piña, limón, soda y hielo." },
  { seccion: "Bebidas", categoria: "Limonadas y sodas", nombre: "Soda italiana de kiwi", precio: 15000,
    descripcion: "Kiwi fresco, jarabe de kiwi, limón, soda y hielo, con borde de tajín o sal (a tu elección).",
    opciones: "Borde: Tajín | Sal", foto: "soda-kiwi" },

  { seccion: "Bebidas", categoria: "Jugos naturales", nombre: "Jugo natural", precio: 10000,
    descripcion: "Fruta natural en agua o en leche. Pregunta por las frutas disponibles.",
    contiene: "Lácteos (en leche)", opciones: "Preparación: En agua | En leche" },

  // =============================== BAR ================================
  { seccion: "Bar", categoria: "Trago insignia", destacado: "SI",
    nombre: "Tentación Lila", precio: 24000,
    descripcion: "Spicy mango frozen: mango pintón con vodka de tamarindo, almíbar y una pizca de tajín, en vaso escarchado con limón y tajín, chamoy por dentro y gotas de chamoy por encima.",
    contiene: "Alcohol", foto: "tentacion-lila" },

  { seccion: "Bar", categoria: "Cócteles", nombre: "Margarita", precio: 20000,
    descripcion: "Frozen de tequila, triple sec, limón y almíbar, en copa escarchada con sal o sal tajín; decorada con limón y hierbabuena.",
    contiene: "Alcohol", opciones: "Escarchado: Sal | Sal tajín", foto: "margarita" },
  { seccion: "Bar", categoria: "Cócteles", nombre: "Daiquiri frozen de cereza", precio: 20000,
    descripcion: "Ron blanco, sirope de cereza, almíbar y limón, licuado en frozen; decorado con limón, romero y hierbabuena.",
    contiene: "Alcohol", foto: "daiquiri-cereza" },
  { seccion: "Bar", categoria: "Cócteles", nombre: "Mojito", precio: 20000,
    descripcion: "Ron blanco, hierbabuena macerada con limón y almíbar, hielo y soda; decorado con rodajas de limón.",
    contiene: "Alcohol", foto: "mojito" },
  { seccion: "Bar", categoria: "Cócteles", nombre: "Tequila sunrise", precio: 20000,
    descripcion: "Tequila sobre sirope de cereza y jugo de naranja en dos colores, con un toque de Sprite y pincho de 3 cerezas. ¡Mézclalo antes de tomar!",
    contiene: "Alcohol", foto: "margarita-sunrise" },

  { seccion: "Bar", categoria: "Cervezas", nombre: "Cerveza nacional", precio: 6000,
    descripcion: "Pregunta por las marcas disponibles.",
    contiene: "Alcohol, Gluten" },
  { seccion: "Bar", categoria: "Cervezas", nombre: "Michelada", precio: 3000,
    descripcion: "Preparación de limón, sal y hielo para acompañar tu cerveza (se cobra aparte)." },

  { seccion: "Bar", categoria: "Gaseosas y agua", nombre: "Gaseosa personal", precio: 5000,
    descripcion: "Pregunta por los sabores disponibles." },
  { seccion: "Bar", categoria: "Gaseosas y agua", nombre: "Soda Bretaña", precio: 5000,
    descripcion: "Agua con gas en botella personal." },
  { seccion: "Bar", categoria: "Gaseosas y agua", nombre: "Agua", precio: 3000,
    descripcion: "Con o sin gas.", opciones: "Tipo: Sin gas | Con gas" }
];
