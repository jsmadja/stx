package fr.xebia.devoxxfr.shootthexebians.config;

import static org.springframework.core.Ordered.HIGHEST_PRECEDENCE;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import org.springframework.core.annotation.Order;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

@Order(HIGHEST_PRECEDENCE)
public class SpringContextIntializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        servletContext.setInitParameter("contextConfigLocation", "fr.xebia.devoxxfr.shootthexebians.config");
        WebApplicationContext rootAppContext = new AnnotationConfigWebApplicationContext();
        if (rootAppContext != null) {
            servletContext.addListener(new ContextLoaderListener(rootAppContext));
        }
    }
}
