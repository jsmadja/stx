package fr.xebia.devoxxfr.shootthexebians.business;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import org.springframework.stereotype.Component;

@Path("health")
@Component
public class HealthResource {

    @GET
    public String getHealth() {
        return "It works!";
    }
}
