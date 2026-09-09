// Productos según el caso
const productos = [
    { codigo: 'TC001', nombre: 'Torta Cuadrada de Chocolate', categoria: 'Tortas Cuadradas', precio: 45000 },
    { codigo: 'TC002', nombre: 'Torta Cuadrada de Frutas', categoria: 'Tortas Cuadradas', precio: 50000 },
    { codigo: 'TT001', nombre: 'Torta Circular de Vainilla', categoria: 'Tortas Circulares', precio: 40000 },
    { codigo: 'TT002', nombre: 'Torta Circular de Manjar', categoria: 'Tortas Circulares', precio: 42000 },
    { codigo: 'PI001', nombre: 'Mousse de Chocolate', categoria: 'Postres Individuales', precio: 5000 },
    { codigo: 'PI002', nombre: 'Tiramisú Clásico', categoria: 'Postres Individuales', precio: 5500 },
    { codigo: 'PSA001', nombre: 'Torta Sin Azúcar de Naranja', categoria: 'Productos Sin Azúcar', precio: 48000 },
    { codigo: 'PSA002', nombre: 'Cheesecake Sin Azúcar', categoria: 'Productos Sin Azúcar', precio: 47000 },
    { codigo: 'PT001', nombre: 'Empanada de Manzana', categoria: 'Pastelería Tradicional', precio: 3000 },
    { codigo: 'PT002', nombre: 'Tarta de Santiago', categoria: 'Pastelería Tradicional', precio: 6000 },
    { codigo: 'PG001', nombre: 'Brownie Sin Gluten', categoria: 'Productos Sin Gluten', precio: 4000 },
    { codigo: 'PG002', nombre: 'Pan Sin Gluten', categoria: 'Productos Sin Gluten', precio: 3500 },
    { codigo: 'PV001', nombre: 'Torta Vegana de Chocolate', categoria: 'Productos Vegana', precio: 50000 },
    { codigo: 'PV002', nombre: 'Galletas Veganas de Avena', categoria: 'Productos Vegana', precio: 4500 },
    { codigo: 'TE001', nombre: 'Torta Especial de Cumpleaños', categoria: 'Tortas Especiales', precio: 55000 },
    { codigo: 'TE002', nombre: 'Torta Especial de Boda', categoria: 'Tortas Especiales', precio: 60000 }
];

// Carrito en localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Renderizar productos en catálogo
function renderizarProductos(lista) {
    const contenedor = document.getElementById('lista-productos');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    lista.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'producto';

        div.innerHTML = `
            <h4>${prod.nombre}</h4>
            <p class="precio">$${prod.precio.toLocaleString('es-CL')} CLP</p>
            <p>${prod.categoria}</p>
            <button data-codigo="${prod.codigo}">Agregar al carrito</button>
        `;

        contenedor.appendChild(div);
    });

    contenedor.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const codigo = btn.getAttribute('data-codigo');
            agregarAlCarrito(codigo);
        });
    });
}

// Filtrar productos
function filtrarProductos() {
    const busqueda = document.getElementById('busqueda');
    const filtro = document.getElementById('filtro-categoria');
    if (!busqueda || !filtro) return;

    const texto = busqueda.value.toLowerCase();
    const categoria = filtro.value;

    const filtrados = productos.filter(p => {
        const coincideTexto = p.nombre.toLowerCase().includes(texto);
        const coincideCategoria = categoria === '' || p.categoria === categoria;
        return coincideTexto && coincideCategoria;
    });

    renderizarProductos(filtrados);
}

// Agregar al carrito
function agregarAlCarrito(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    if (!producto) return;

    const existente = carrito.find(item => item.codigo === codigo);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    renderizarCarrito();
}

// Eliminar del carrito
function eliminarDelCarrito(codigo) {
    carrito = carrito.filter(item => item.codigo !== codigo);
    guardarCarrito();
    renderizarCarrito();
}

// Modificar cantidad
function modificarCantidad(codigo, delta) {
    const item = carrito.find(i => i.codigo === codigo);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        eliminarDelCarrito(codigo);
        return;
    }

    guardarCarrito();
    renderizarCarrito();
}

// Guardar carrito
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Renderizar carrito
function renderizarCarrito() {
    const contenedor = document.getElementById('lista-carrito');
    const subtotalEl = document.getElementById('subtotal');
    const descuentoEl = document.getElementById('descuento');
    const totalEl = document.getElementById('total');
    const vaciarBtn = document.getElementById('vaciar-carrito');

    if (!contenedor) return;

    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>El carrito está vacío.</p>';
        if (subtotalEl) subtotalEl.textContent = '0';
        if (descuentoEl) descuentoEl.textContent = '0';
        if (totalEl) totalEl.textContent = '0';
        return;
    }

    let subtotal = 0;

    carrito.forEach(item => {
        const fila = document.createElement('div');
        fila.className = 'item-carrito';

        fila.innerHTML = `
            <span>${item.nombre} (x${item.cantidad})</span>
            <div>
                <span>$${(item.precio * item.cantidad).toLocaleString('es-CL')} CLP</span>
                <button data-accion="menos" data-codigo="${item.codigo}">-</button>
                <button data-accion="mas" data-codigo="${item.codigo}">+</button>
                <button data-accion="eliminar" data-codigo="${item.codigo}">Eliminar</button>
            </div>
        `;

        contenedor.appendChild(fila);
        subtotal += item.precio * item.cantidad;
    });

    // Descuentos simulados (lógica básica)
    const edad = localStorage.getItem('edadUsuario') || 0;
    const codigoPromo = localStorage.getItem('codigoPromo') || '';

    let descuento = 0;

    if (Number(edad) > 50) {
        descuento = subtotal * 0.5;
    } else if (codigoPromo.toUpperCase() === 'FELICES50') {
        descuento = subtotal * 0.1;
    }

    const total = subtotal - descuento;

    if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString('es-CL');
    if (descuentoEl) descuentoEl.textContent = descuento.toLocaleString('es-CL');
    if (totalEl) totalEl.textContent = total.toLocaleString('es-CL');

    contenedor.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const accion = btn.getAttribute('data-accion');
            const codigo = btn.getAttribute('data-codigo');

            if (accion === 'menos') {
                modificarCantidad(codigo, -1);
            } else if (accion === 'mas') {
                modificarCantidad(codigo, 1);
            } else if (accion === 'eliminar') {
                eliminarDelCarrito(codigo);
            }
        });
    });

    if (vaciarBtn) {
        vaciarBtn.addEventListener('click', () => {
            carrito = [];
            guardarCarrito();
            renderizarCarrito();
        });
    }
}

// Validación formulario registro
function inicializarFormularioRegistro() {
    const form = document.getElementById('formulario-registro');
    if (!form) return;

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const edad = document.getElementById('edad');
    const codigo = document.getElementById('codigo');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorEdad = document.getElementById('error-edad');
    const errorCodigo = document.getElementById('error-codigo');
    const errorPassword = document.getElementById('error-password');
    const errorPassword2 = document.getElementById('error-password2');
    const mensajeExito = document.getElementById('mensaje-exito');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Limpiar errores
        [errorNombre, errorEmail, errorEdad, errorCodigo, errorPassword, errorPassword2].forEach(el => {
            if (el) el.textContent = '';
        });
        if (mensajeExito) mensajeExito.style.display = 'none';

        let valido = true;

        // Nombre
        if (!nombre.value.trim() || nombre.value.trim().length < 3) {
            if (errorNombre) errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
            valido = false;
        }

        // Email
        const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!reEmail.test(email.value.trim())) {
            if (errorEmail) errorEmail.textContent = 'Ingresa un correo electrónico válido.';
            valido = false;
        }

        // Edad
        const edadNum = Number(edad.value);
        if (!edad.value || edadNum < 1 || edadNum > 120) {
            if (errorEdad) errorEdad.textContent = 'Ingresa una edad válida entre 1 y 120.';
            valido = false;
        }

        // Código promocional (opcional, solo validar si está lleno)
        if (codigo.value.trim() && codigo.value.trim().toUpperCase() !== 'FELICES50') {
            if (errorCodigo) errorCodigo.textContent = 'Código promocional no válido.';
            valido = false;
        }

        // Password
        if (!password.value || password.value.length < 6) {
            if (errorPassword) errorPassword.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            valido = false;
        }

        // Confirmar password
        if (password.value !== password2.value) {
            if (errorPassword2) errorPassword2.textContent = 'Las contraseñas no coinciden.';
            valido = false;
        }

        if (!valido) return;

        // Guardar datos simulados
        localStorage.setItem('edadUsuario', String(edadNum));
        localStorage.setItem('codigoPromo', codigo.value.trim().toUpperCase());

        if (mensajeExito) {
            mensajeExito.textContent = 'Registro exitoso. Tus descuentos han sido aplicados.';
            mensajeExito.style.display = 'block';
        }

        form.reset();
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Catálogo
    const listaProductos = document.getElementById('lista-productos');
    if (listaProductos) {
        renderizarProductos(productos);

        const busqueda = document.getElementById('busqueda');
        const filtro = document.getElementById('filtro-categoria');

        if (busqueda) busqueda.addEventListener('input', filtrarProductos);
        if (filtro) filtro.addEventListener('change', filtrarProductos);
    }

    // Carrito
    const carritoSection = document.getElementById('carrito');
    if (carritoSection) {
        renderizarCarrito();
    }

    // Formulario
    inicializarFormularioRegistro();
});