package br.com.sistemas.chamados.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import br.com.sistemas.chamados.entity.Categoria;
import br.com.sistemas.chamados.entity.Chamado;
import br.com.sistemas.chamados.entity.Cliente;
import br.com.sistemas.chamados.entity.Prioridade;
import br.com.sistemas.chamados.entity.StatusChamado;

@DataJpaTest
class ChamadoRepositoryTest {

    @Autowired
    private ChamadoRepository chamadoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Test
    void salvaChamadoComRelacionamentosEStatusAberto() {
        Cliente cliente = clienteRepository.save(new Cliente("Ana Souza", "ana@exemplo.com", "47999999999"));
        Categoria categoria = categoriaRepository.save(new Categoria("Infraestrutura", "Rede e equipamentos"));

        Chamado salvo = chamadoRepository.save(
            new Chamado("Sem rede", "Computador sem acesso", Prioridade.ALTA, cliente, categoria, null));

        Chamado encontrado = chamadoRepository.findById(salvo.getId()).orElseThrow();
        assertThat(encontrado.getStatus()).isEqualTo(StatusChamado.ABERTO);
        assertThat(encontrado.getDataAbertura()).isNotNull();
        assertThat(encontrado.getCliente().getId()).isEqualTo(cliente.getId());
        assertThat(encontrado.getCategoria().getId()).isEqualTo(categoria.getId());
    }
}
