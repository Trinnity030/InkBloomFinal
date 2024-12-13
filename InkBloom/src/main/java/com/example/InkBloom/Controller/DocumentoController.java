package com.example.InkBloom.Controller;

import com.example.InkBloom.Model.Documento;
import com.example.InkBloom.Model.DocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Queue;

// Controlador que maneja las rutas para interactuar con el documento
@Controller
@RequestMapping("/documento")
public class DocumentoController {

    @Autowired
    private DocumentoService documentoService; // Servicio para manejar documentos

    /**
     * Maneja la solicitud para mostrar la lista de documentos.
     * Se utiliza el metodo GET en la URL "/documentos".
     *
     * @param model El objeto Model permite enviar datos al archivo HTML.
     * @return El nombre del archivo HTML que se renderizará (sin extensión).
     */


    @GetMapping("/crear")
    public String crearDocumento(@RequestParam String titulo, Model model) {
        documentoService.crearDocumento(titulo); // Crea el documento

        return "documento"; // Devuelve la vista "documento"
    }

    @PostMapping("/agregar")
    public String agregarTexto(@RequestParam String texto, Model model) {
        documentoService.agregarTexto(texto);

        return "documento";
    }

    @PostMapping("/quitar")
    public String quitarTexto(Model model) {
        documentoService.quitarTexto();

        return "documento";
    }

    @PostMapping("/deshacer")
    public String deshacer(Model model) {
        documentoService.deshacer();

        return "documento";
    }

    @PostMapping("/rehacer")
    public String rehacer(Model model) {
        documentoService.rehacer();
        return "documento";
    }








}
