package com.appreservas.auth.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;   
import io.swagger.v3.oas.annotations.servers.Server;

@Configuration
@SecurityScheme(
  name = "Bearer Authentication",
  type = SecuritySchemeType.HTTP,
  bearerFormat = "JWT",
  scheme = "bearer"
)
@OpenAPIDefinition(
  info =@Info(
    title = "User API",
    // version = "${api.version}",
    version = "0.0.1",
    contact = @Contact(
      name = "Baeldung", email = "user-apis@baeldung.com", url = "https://www.baeldung.com"
    ),
    license = @License(
      name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
    ),
    // termsOfService = "${tos.uri}",
    termsOfService = "TOS",
    // description = "${api.description}"
    description = "Description"
  ),
  servers = @Server(
    // url = "${api.server.url}",
    url = "",
    description = "Production"
  )
)
public class OpenApiConfig {}