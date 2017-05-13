package qu.cms.server.embedded;

import java.net.URI;
import javax.ws.rs.core.UriBuilder;
import org.eclipse.jetty.server.Server;
import org.glassfish.jersey.jetty.JettyHttpContainerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import qu.cms.service.ContactService;

/**
 * Embedded http server using jetty.
 */
public class MinimalHttpServer {

	public static void main(String[] args) {

		URI baseUri = UriBuilder.fromUri("http://localhost/").port(9090).build();
		ResourceConfig config = new ResourceConfig(ContactService.class); 
		Server server = JettyHttpContainerFactory.createServer(baseUri, config);
		System.out.println("Listening @ http://localhost:9090/api/contacts" );
	}
}