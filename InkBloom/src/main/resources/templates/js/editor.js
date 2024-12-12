// Inicializa Quill
const editor = new Quill('#editor', {
  theme: 'snow'
});

// Carga el contenido inicial desde el servidor
const contenido = document.getElementById('editor').dataset.documento;
editor.root.innerHTML = contenido;

// Función para guardar los cambios
async function guardarCambios() {
  const contenido = editor.root.innerHTML;
  const response = await fetch('/documento/agregar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto: contenido }),
  });
  
  if (response.ok) {
      alert('Documento guardado!');
      mostrarDocumentosRecientes(); // Actualiza la lista de documentos
  } else {
      alert('Hubo un error al guardar el documento');
  }
}

// Función para deshacer cambios
function deshacer() {
  editor.history.undo();
}

// Función para rehacer cambios
function rehacer() {
  editor.history.redo();
}

// Función para mostrar los documentos recientes
async function mostrarDocumentosRecientes() {
  const response = await fetch('/documentos');
  const documentos = await response.json();

  const documentosList = document.querySelector('ul'); // Selecciona el <ul> donde se muestran los documentos
  documentosList.innerHTML = ''; // Limpia la lista actual

  documentos.forEach(doc => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `/documento/crear?titulo=${doc.titulo}`;
      a.textContent = doc.titulo;
      li.appendChild(a);
      documentosList.appendChild(li);
  });
}

// Llama a la función para cargar los documentos cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarDocumentosRecientes);

// Agrega el evento de clic al botón para guardar los cambios
document.getElementById('guardarCambiosBtn').addEventListener('click', guardarCambios);
