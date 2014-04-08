package fr.xebia.devoxxfr.shootthexebians.common;

import java.net.UnknownHostException;

public class MongoUnreachableException extends RuntimeException {

    public MongoUnreachableException(UnknownHostException e) {
        super(e);
    }
}
