package com.example.InkBloom.Model;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class DocumentoService {
    private Documento documento; // Documento activo
    private final Stack<Documento> pilaDeshacer = new Stack<>(); // Pila para acciones de deshacer
    private final Stack<Documento> pilaRehacer = new Stack<>();  // Pila para acciones de rehacer


    // Crea y guarda un documento en la lista
    public void crearDocumento(String titulo) {
        this.documento = new Documento(titulo);
        pilaDeshacer.push(new Documento(documento)); // Guarda el estado inicial
        pilaRehacer.clear(); // Limpia la pila de rehacer
    }


    // Agregar texto al documento actual y registra el cambio
    public void agregarTexto(String texto) {
        pilaRehacer.clear();
        if (documento.pushLine(texto)) {
            pilaDeshacer.push(new Documento(documento)); // Guarda el estado
        }
    }

    // Quita texto del documento actual y registra el cambio
    public void quitarTexto() {
        if (!documento.isEmpty()) {
            pilaRehacer.clear();
            if (documento.removeLine()) {
                pilaDeshacer.push(new Documento(documento)); // Guarda el estado
            }
        }
    }

    // Restaura un estado anterior del documento
    public void deshacer() {
        if (pilaDeshacer.size() > 1) {
            pilaRehacer.push(pilaDeshacer.pop());
            documento.copyState(pilaDeshacer.peek());
        }
    }

    // Restaura un estado deshecho
    public void rehacer() {
        if (!pilaRehacer.isEmpty()) {
            pilaDeshacer.push(pilaRehacer.pop());
            documento.copyState(pilaDeshacer.peek());
        }
    }
}
