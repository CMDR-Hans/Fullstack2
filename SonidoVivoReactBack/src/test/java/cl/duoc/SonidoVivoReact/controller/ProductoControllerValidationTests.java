package cl.duoc.SonidoVivoReact.controller;

import cl.duoc.SonidoVivoReact.exception.GlobalExceptionHandler;
import cl.duoc.SonidoVivoReact.exception.ResourceNotFoundException;
import cl.duoc.SonidoVivoReact.service.ProductoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductoController.class)
@Import(GlobalExceptionHandler.class)
class ProductoControllerValidationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductoService productoService;

    @Test
    void rechazaProductoSinNombreNiStock() throws Exception {
        mockMvc.perform(post("/productos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "precio": 100000
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));

        verifyNoInteractions(productoService);
    }

    @Test
    void rechazaIdNegativo() throws Exception {
        mockMvc.perform(get("/productos/-1"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));

        verifyNoInteractions(productoService);
    }

    @Test
    void mapeaProductoInexistenteANotFound() throws Exception {
        when(productoService.obtenerPorId(99L))
                .thenThrow(new ResourceNotFoundException("Producto no encontrado con ID: 99"));

        mockMvc.perform(get("/productos/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Producto no encontrado con ID: 99"));
    }
}
