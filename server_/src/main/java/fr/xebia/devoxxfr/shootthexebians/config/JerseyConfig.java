package fr.xebia.devoxxfr.shootthexebians.config;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;

@ApplicationPath("api")
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        packages("fr.xebia.devoxxfr.shootthexebians");
        property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true);
        register(JacksonJsonProvider.class);
    }
}
