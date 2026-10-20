package br.com.sistemas.chamados.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IdentificacaoController {
    
    @GetMapping("/identificacao")
    public String identificacao() {
        return "Fernanda Lemes de Souza, 144 6CN (Engenharia de Software) Projeto Spring Boot em execução";
    }
}
