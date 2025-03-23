const API_URL = 'http://localhost:3000/libros'; // Ajusta la URL si es necesario

document.addEventListener('DOMContentLoaded', () => {
    obtenerLibros();
});

async function obtenerLibros() {
    try {
        const respuesta = await fetch(API_URL);
        const libros = await respuesta.json();
        mostrarLibros(libros);
    } catch (error) {
        console.error('Error al obtener libros:', error);
    }
}

function mostrarLibros(libros) {
    const listaLibros = document.getElementById('libros-lista');
    listaLibros.innerHTML = '';

    libros.forEach(libro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${libro.id}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>
                <button onclick="editarLibro(${libro.id})">Editar</button>
                <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
            </td>
        `;
        listaLibros.appendChild(fila);
    });
}

function editarLibro(id) {
    alert(`Función para editar el libro con ID: ${id}`);
}

async function eliminarLibro(id) {
    if (confirm('¿Seguro que quieres eliminar este libro?')) {
        try {
            const respuesta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (respuesta.ok) {
                obtenerLibros();
            } else {
                console.error('Error al eliminar el libro');
            }
        } catch (error) {
            console.error('Error en la petición de eliminación:', error);
        }
    }
}
