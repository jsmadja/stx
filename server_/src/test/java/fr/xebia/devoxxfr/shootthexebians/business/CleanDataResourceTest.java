package fr.xebia.devoxxfr.shootthexebians.business;

import static org.assertj.core.api.Assertions.assertThat;
import org.jongo.MongoCollection;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;
import fr.xebia.devoxxfr.shootthexebians.business.scores.Score;

public class CleanDataResourceTest {

    @Rule
    public FongoJongo fongoJongo = new FongoJongo();

    private CleanDataResource resource = new CleanDataResource();
    private MongoCollection scoresCollection;

    @Before
    public void initCollection() {
        scoresCollection = fongoJongo.getCollection("scoresCollection");
        ReflectionTestUtils.setField(resource, "scoresCollection", scoresCollection);
    }

    @Test
    public void should_remove_all_scores() {
        // given
        scoresCollection.insert(new Score("player1@xebia.fr", "craft", 12345L));
        scoresCollection.insert(new Score("player2@xebia.fr", "agile", 6789L));
        assertThat(scoresCollection.count()).isEqualTo(2);

        // when
        resource.deleteAll();

        // then
        assertThat(scoresCollection.count()).isEqualTo(0);
    }
}
