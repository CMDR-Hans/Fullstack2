package cl.duoc.SonidoVivoReact.controller;

import cl.duoc.SonidoVivoReact.exception.GlobalExceptionHandler;
import cl.duoc.SonidoVivoReact.exception.ConflictException;
import cl.duoc.SonidoVivoReact.exception.ResourceNotFoundException;
import cl.duoc.SonidoVivoReact.service.VentaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@WebMvcTest(VentaController.class)
@Import(GlobalExceptionHandler.class)
class VentaControllerValidationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private VentaService ventaService;

    @Test
    void rejectsSaleWithNonPositiveQuantity() throws Exception {
        mockMvc.perform(post("/ventas")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                  "clienteId": 1,
                                  "items": [{"productoId": 1, "cantidad": -2}]
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.details['items[0].cantidad']").exists());

        verifyNoInteractions(ventaService);
    }

    @Test
    void rejectsNonPositivePathId() throws Exception {
        mockMvc.perform(get("/ventas/0"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));

        verifyNoInteractions(ventaService);
    }

    @Test
    void mapsMissingSaleToNotFound() throws Exception {
        when(ventaService.obtenerPorId(99L))
                .thenThrow(new ResourceNotFoundException("Venta no encontrada con ID: 99"));

        mockMvc.perform(get("/ventas/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Venta no encontrada con ID: 99"));
    }

    @Test
    void mapsStockConflictToConflict() throws Exception {
        when(ventaService.procesarVenta(any()))
                .thenThrow(new ConflictException("Stock insuficiente"));

        mockMvc.perform(post("/ventas")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                  "clienteId": 1,
                                  "items": [{"productoId": 2, "cantidad": 1}]
                                }
                                """))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409));
    }
}
