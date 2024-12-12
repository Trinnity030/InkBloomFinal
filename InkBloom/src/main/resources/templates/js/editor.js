// Inicializa Quill
const editor = new Quill('#editor', {
  theme: 'snow'
});

// Carga el contenido inicial desde el servidor
const contenido = document.getElementById('editor').dataset.documento;
editor.root.innerHTML = contenido;

// Función para deshacer cambios
function deshacer() {
  editor.history.undo();
}

// Función para rehacer cambios
function rehacer() {
  editor.history.redo();
}

// Función para exportar el contenido del editor como archivo .txt
function exportarComoTxt() {
  const contenido = editor.root.innerHTML; // Obtiene el contenido del editor
  const textoPlano = contenido.replace(/<[^>]+>/g, ''); // Elimina las etiquetas HTML para convertirlo en texto plano
  
  const blob = new Blob([textoPlano], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = 'documento.txt'; // Nombre del archivo descargado
  document.body.appendChild(enlace);
  enlace.click();

  // Limpia el enlace para evitar problemas de memoria
  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);
}

// Recuperar el nombre del documento desde localStorage
const documentName = localStorage.getItem("documentName");

// Verificar que el nombre se recuperó correctamente
console.log("Nombre recuperado de localStorage:", documentName);

// Asignar el nombre del documento al span en el h2
if (documentName) {
    document.getElementById("documentTitle").textContent = documentName;
} else {
    document.getElementById("documentTitle").textContent = "Documento no especificado";
}
