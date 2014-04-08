package fr.xebia.devoxxfr.shootthexebians.business;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.jongo.MongoCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Path("clean")
@Component
@Consumes(APPLICATION_JSON)
@Produces(APPLICATION_JSON)
public class CleanDataResource {

    @Autowired
    private MongoCollection scoresCollection;

    @GET
    public void deleteAll() {
        scoresCollection.remove();
    }
}
