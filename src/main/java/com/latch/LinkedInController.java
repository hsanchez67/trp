package com.latch;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.latch.domain.UserDTO;
import com.latch.domain.linkein.LinkedInDTO;
import com.latch.service.SocialService;
import com.latch.service.UserService;

import lombok.extern.slf4j.Slf4j;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;

import org.scribe.builder.*;
import org.scribe.builder.api.*;
import org.scribe.model.*;
import org.scribe.oauth.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.Principal;
import java.util.Scanner;

/**
 * Created by Hector on 3/7/2016.
 */

@Slf4j
@Controller
public class LinkedInController {

    //Local development
    //private static final String linkedin_redirect_url = "http%3A%2F%2Flocalhost%2Fauthorization%2FaccessToken";
    //AWS Portal
    private static final String linkedin_redirect_url = "https%3A%2F%2Fthereferralportal.com%2Fauthorization%2FaccessToken";
    private static final String linkedin_client_id = "75d7ud3qvc6awg";
    private static final String linkedin_client_secret = "c8goalQFi90Kilme";
    private static final String linkedin_state = "DCEeFWf45A53sdfKef424";
    private static final String PROTECTED_RESOURCE_URL = "http://api.linkedin.com/v1/people/~";

    @LoadBalanced
    private final UserService userService;
    private final SocialService socialService;

    @Autowired
    public LinkedInController(UserService userService, SocialService socialService) {
        this.userService = userService;
        this.socialService = socialService;
    }


    @RequestMapping(value={"/authorization/accessToken"}, method = RequestMethod.GET)
    public String accessTokenResponse(@RequestParam(name="access_token", required = false) String access_token, @RequestParam(name="expires_in", required = false) String expires_in, @RequestParam(name="code", required = false) String code, @RequestParam(name="state", required = false) String state, Principal principal) throws IOException  {
        if (access_token != null && expires_in != null) {
            log.info("Linked In OAuth2 /accessToken response ");
            log.info(access_token);
            log.info(expires_in);

            Token accessToken = new Token(access_token, expires_in);
            if (accessToken == null) {
                log.info(accessToken.toString());
            }
            return "components/Settings/settings";
        } else if (code != null && state != null) {
            if (state.equals(LinkedInController.linkedin_state)) {
                log.info("Linked In OAuth2 /accessToken ");
                log.info(code);
                log.info(state);

                // "x-www-form-urlencoded" HTTP POST request:  https://www.linkedin.com/uas/oauth2/accessToken
                String targetURL = "https://www.linkedin.com/uas/oauth2/accessToken";
                StringBuilder result = new StringBuilder();

                URL url;
                HttpURLConnection connection = null;
                LinkedInDTO linkedInDTO;
                try {
                    String urlParameters = "grant_type=authorization_code&code="+code+"&redirect_uri="+LinkedInController.linkedin_redirect_url+"&client_id="+LinkedInController.linkedin_client_id+"&client_secret="+LinkedInController.linkedin_client_secret;
                    log.info(urlParameters);

                    //Create connection
                    url = new URL(targetURL);
                    connection = (HttpURLConnection)url.openConnection();
                    connection.setRequestMethod("POST");
                    connection.setRequestProperty("Host", "www.linkedin.com");
                    connection.setRequestProperty("Content-Type",
                            "application/x-www-form-urlencoded");
                    connection.setUseCaches (false);
                    connection.setDoInput(true);
                    connection.setDoOutput(true);
                    //Send request
                    OutputStreamWriter wr = new OutputStreamWriter(connection.getOutputStream());
                    wr.write(urlParameters);
                    wr.flush();
                    wr.close();

                    //Get Response
                    BufferedReader rd = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    String line;
                    while ((line = rd.readLine()) != null) {
                        result.append(line);
                    }
                    wr.close();
                    rd.close();

                    JSONObject jsonObj = new JSONObject(result.toString());
                    ObjectMapper mapper = new ObjectMapper();
                    linkedInDTO = mapper.readValue(jsonObj.toString(), LinkedInDTO.class);

                    UserDTO user = userService.getUserByEmail(principal.getName())
                            .orElse(null);

                    if (user != null) {
                        linkedInDTO.setUserId(user.getId());
                        socialService.createLinkedin(linkedInDTO);
                        log.info("LinkedInDTO: " + linkedInDTO.toString());
                    } else {
                        return "redirect:" + "/settings?t=linkedin&s=e";
                    }

                    log.info(result.toString());
                    return "redirect:" + "/settings?t=linkedin";
                } catch (IOException e) {

                    System.err.println("Error LinkedIn accessToken ");

                    HttpURLConnection httpConn = (HttpURLConnection) connection;
                    InputStream is =  null;
                    String line = null;

                    if (httpConn.getResponseCode() >= 400) {
                        is = httpConn.getErrorStream();
                    } else {
                        is = httpConn.getInputStream();
                    }
                    InputStreamReader isr = new InputStreamReader(is);
                    BufferedReader b = new BufferedReader(isr);
                    while ((line = b.readLine()) != null) {
                        System.out.println(line);
                        result.append(line);
                     }

                } finally {

                    if(connection != null) {
                        connection.disconnect();
                    }
                }

            } else {
                log.error("Linked In state code doesn't match! Possible CSRF (Cross-site request forgery_ attack! ");
            }
        }
        log.info("Linked In OAuth2 /authorization/accessToken ");
        return ("authorization/accessToken");
    }
/*
    @RequestMapping(value={"/authorization/accessToken"}, method = RequestMethod.GET)
    public String accessTokenGet(@RequestParam(name="code", required = false) String code, @RequestParam(name="state", required = false) String state) {

        log.info("Linked In OAuth2 /accessToken Get");
        log.info(code);
        log.info(state);

        String url = "https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code="+code+"&redirect_uri="+this.linkedin_redirect_url+"&client_id="+this.linkedin_client_id+"&client_secret="+this.linkedin_client_secret;
        return "redirect:" + url;
    }

    @RequestMapping(value={"/authorization/accessToken"}, method = RequestMethod.PUT)
    public String accessTokenPut(@RequestParam(name="access_token", required = false) String access_token, @RequestParam(name="expires_in", required = false) String expires_in) {

        log.info("Linked In OAuth2 /accessToken put ");
        log.info(access_token);
        log.info(expires_in);

        Token accessToken = new Token(access_token, expires_in);
        if (accessToken == null) {
            log.info(accessToken.toString());
        }
        return "components/Settings/settings";
    }
*/
    @RequestMapping(value={"/authorization/linkedin"}, method = RequestMethod.GET)
    public String authorization(WebRequest request) {
        log.info("Linked In OAuth2 /authorization ");
        return "redirect:" + "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id="+linkedin_client_id+"&redirect_uri="+linkedin_redirect_url+"&state="+LinkedInController.linkedin_state+"&scope=r_basicprofile%20r_emailaddress%20w_share";
    }


    @RequestMapping(value = "linkedin", method = RequestMethod.GET)
    public void requestConnectionLinkedin() {
        OAuthService service = new ServiceBuilder()
                .provider(LinkedInApi.class)
                .apiKey(LinkedInController.linkedin_client_id)
                .apiSecret(LinkedInController.linkedin_client_secret)
                .build();
        Scanner in = null;
        try {
        	in = new Scanner(System.in);
	        System.out.println("=== LinkedIn's OAuth Workflow ===");
	        System.out.println();
	
	        // Obtain the Request Token
	        System.out.println("Fetching the Request Token...");
	        Token requestToken = service.getRequestToken();
	        System.out.println("Got the Request Token!");
	        System.out.println();
	
	        System.out.println("Now go and authorize Scribe here:");
	        System.out.println(service.getAuthorizationUrl(requestToken));
	        System.out.println("And paste the verifier here");
	        System.out.print(">>");
	        Verifier verifier = new Verifier(in.nextLine());
	        System.out.println();
	
	        // Trade the Request Token and Verfier for the Access Token
	        System.out.println("Trading the Request Token for an Access Token...");
	        Token accessToken = service.getAccessToken(requestToken, verifier);
	        System.out.println("Got the Access Token!");
	        System.out.println("(if your curious it looks like this: " + accessToken + " )");
	        System.out.println();
	
	        // Now let's go and ask for a protected resource!
	        System.out.println("Now we're going to access a protected resource...");
	        OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL);
	        service.signRequest(accessToken, request);
	        Response response = request.send();
	        System.out.println("Got it! Lets see what we found...");
	        System.out.println();
	        System.out.println(response.getBody());
	
	        System.out.println();
	        System.out.println("Thats it man! Go and build something awesome with Scribe! :)");
        } finally {
        	if(in != null) try { in.close(); } catch(Exception e) {}
        }
    }

}
