package fr.xebia.devoxxfr.shootthexebians.business.scores;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.ok;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.jongo.MongoCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Path("scores")
@Component
@Consumes(APPLICATION_JSON)
@Produces(APPLICATION_JSON)
public class ScoresResource {

    @Autowired
    private MongoCollection scoresCollection;

    @POST
    public Response createScore(@NotNull @Valid Score score) {
        scoresCollection.update("{player: '" + score.getPlayer() + "'}").upsert().with(score);
        return ok().entity(score).build();
    }
}
