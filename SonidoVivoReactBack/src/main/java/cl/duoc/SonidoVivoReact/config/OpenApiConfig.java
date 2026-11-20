package cl.duoc.SonidoVivoReact.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        Server servidorLocal = new Server()
                .url("http://localhost:8080/api/v1")
                .description("Servidor local de desarrollo");

        return new OpenAPI()
                .info(new Info()
                        .title("Sonido Vivo - API REST")
                        .version("1.5.0")
                        .description("""
                                API REST para administrar el catálogo de Sonido Vivo, los clientes registrados
                                y el procesamiento de ventas.

                                Mondongo
                                """)
                        .contact(new Contact()
                                .name("Equipo de desarrollo Sonido Vivo")
                                .email("soporte@sonidovivo.cl"))
                                //No hace nada pero no se cuanto debia completarlo
                        .license(new License()
                                .name("Uso académico")))
                .externalDocs(new ExternalDocumentation()
                        .description("OpenAPI JSON")
                        .url("/api/v1/api-docs"))
                .servers(List.of(servidorLocal))
                .tags(List.of(
                        new Tag().name("Clientes").description("Alta, consulta, modificación y eliminación de clientes."),
                        new Tag().name("Productos").description("Administración del catálogo y consulta de disponibilidad."),
                        new Tag().name("Ventas").description("Procesamiento, consulta, historial y cancelación de ventas.")
                ));
    }
}