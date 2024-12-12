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
