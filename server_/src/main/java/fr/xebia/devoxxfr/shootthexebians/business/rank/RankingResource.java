package fr.xebia.devoxxfr.shootthexebians.business.rank;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.jongo.MongoCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Path("ranking")
@Component
@Consumes(APPLICATION_JSON)
@Produces(APPLICATION_JSON)
public class RankingResource {

    @Autowired
    private MongoCollection scoresCollection;

    @GET
    public List<Rank> buildRanking() {
        Iterable<Rank> sortedRanks = scoresCollection.find().sort("{score: -1}").as(Rank.class);
        List<Rank> ranking = new ArrayList<>();
        Long index = 1L;
        for (Rank rank : sortedRanks) {
            rank.setRank(index++);
            ranking.add(rank);
        }
        return ranking;
    }

}
