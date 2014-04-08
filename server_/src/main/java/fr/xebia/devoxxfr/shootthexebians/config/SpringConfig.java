package fr.xebia.devoxxfr.shootthexebians.config;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import fr.xebia.devoxxfr.shootthexebians.common.MongoUnreachableException;
import java.net.UnknownHostException;
import org.jongo.Jongo;
import org.jongo.MongoCollection;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "fr.xebia.devoxxfr.shootthexebians")
public class SpringConfig {

    @Bean(name = "scoresCollection")
    public MongoCollection getScoresCollection() {
        DB db;
        MongoClientURI mongohq_url = new MongoClientURI(System.getProperty("MONGOHQ_URL"));
        try {
            db = new MongoClient(mongohq_url).getDB(mongohq_url.getDatabase());
            db.authenticate(mongohq_url.getUsername(), mongohq_url.getPassword());
        } catch (UnknownHostException e) {
            throw new MongoUnreachableException(e);
        }
        Jongo jongo = new Jongo(db);
        return jongo.getCollection("scores");
    }
}
