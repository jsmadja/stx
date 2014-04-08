package fr.xebia.devoxxfr.shootthexebians.business.scores;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.Min;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

@JsonAutoDetect(
        fieldVisibility = JsonAutoDetect.Visibility.ANY // mandatory for serialization
)
public class Score {

    @NotBlank
    private String player;
    @NotBlank
    private String fondation;
    @Min(0)
    private Long score;
    @NotBlank
    private String chrono;
    @NotBlank
    private String accuracy;

    @JsonCreator
    public Score(@JsonProperty("player") String player,
                 @JsonProperty("fondation") String fondation,
                 @JsonProperty("score") Long score,
                 @JsonProperty("chrono") String chrono,
                 @JsonProperty("accuracy") String accuracy
                 ) {
        this.player = player;
        this.fondation = fondation;
        this.score = score;
        this.chrono = chrono;
        this.accuracy = accuracy;
    }

    protected String getPlayer() {
        return player;
    }

    // Added for tests
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Score score1 = (Score) o;

        if (fondation != null ? !fondation.equals(score1.fondation) : score1.fondation != null) return false;
        if (player != null ? !player.equals(score1.player) : score1.player != null) return false;
        if (score != null ? !score.equals(score1.score) : score1.score != null) return false;

        return true;
    }
}
