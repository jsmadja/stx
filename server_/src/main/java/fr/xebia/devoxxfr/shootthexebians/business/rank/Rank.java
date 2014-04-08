package fr.xebia.devoxxfr.shootthexebians.business.rank;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonAutoDetect(
        fieldVisibility = JsonAutoDetect.Visibility.ANY // mandatory for serialization
)
public class Rank {

    private Long rank;
    private String player;
    private String fondation;
    private Long score;
    private String chrono;
    private String accuracy;

    @JsonCreator
    public Rank(@JsonProperty("rank") Long rank,
                @JsonProperty("player") String player,
                @JsonProperty("fondation") String fondation,
                @JsonProperty("score") Long score,
                @JsonProperty("chrono") String chrono,
                @JsonProperty("accuracy") String accuracy) {
        this.rank = rank;
        this.player = player;
        this.fondation = fondation;
        this.score = score;
        this.chrono = chrono;
        this.accuracy = accuracy;
    }

    public void setRank(Long rank) {
        this.rank = rank;
    }

    // Added for tests
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Rank rank1 = (Rank) o;

        if (player != null ? !player.equals(rank1.player) : rank1.player != null) return false;
        if (rank != null ? !rank.equals(rank1.rank) : rank1.rank != null) return false;
        if (fondation != null ? !fondation.equals(rank1.fondation) : rank1.fondation != null) return false;
        if (score != null ? !score.equals(rank1.score) : rank1.score != null) return false;

        return true;
    }
}
