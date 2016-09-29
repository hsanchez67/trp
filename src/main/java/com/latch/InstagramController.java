package com.latch;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.latch.domain.UserDTO;
import com.latch.domain.instagram.InstagramDTO;
import com.latch.domain.instagram.User;
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

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.Principal;

/**
 * Created by Hector on 3/15/2016.
 */

@Slf4j
@Controller
public class InstagramController {

    // Local development
    //private static final String instagram_callback_redirect_url = "http%3A%2F%2Flocalhost%2Fcallback%2FaccessToken";
    // AWS Portal
    private static final String instagram_callback_redirect_url = "https%3A%2F%2Fthereferralportal.com%2Fcallback%2FaccessToken";
    private static final String instagram_client_id = "4f2438d98de74603b0a511dcd3e5a844";
    private static final String instagram_client_secret = "1a0f12841128437d9d23daf22e19248c";

    @LoadBalanced
    private final UserService userService;
    private final SocialService socialService;

    @Autowired
    public InstagramController(UserService userService, SocialService socialService) {
        this.userService = userService;
        this.socialService = socialService;
    }

    @RequestMapping(value={"/authorization/instagram"}, method = RequestMethod.GET)
    public String authorization(WebRequest request) {
        log.info("Instagram In OAuth2 /authorization ");
        return "redirect:" + "https://api.instagram.com/oauth/authorize/?client_id="+InstagramController.instagram_client_id+"&redirect_uri="+InstagramController.instagram_callback_redirect_url+"&response_type=code";
    }

    @RequestMapping(value={"/callback/accessToken"}, method = RequestMethod.GET)
	public String accessTokenResponse(@RequestParam(name = "access_token", required = false) String access_token,
			@RequestParam(name = "user", required = false) User user,
			@RequestParam(name = "code", required = false) String code,
			@RequestParam(name = "error", required = false) String error,
			@RequestParam(name = "error_reason", required = false) String error_reason,
			@RequestParam(name = "error_description", required = false) String error_description,
			Principal principal) throws IOException {
    	
    	log.info("### accessTokenResponse(): access_token={}, user={}, code={}, error={}, error_reason={}, error_description={}", access_token, user, code, error, error_reason, error_description);
        
    	if (error != null) {
            log.error("Instagram Error: " + error + " | Error Reason: " + error_reason + " | Error Description: " + error_description);
        } else if (access_token != null) {
            log.info("Instagram In OAuth2 /accessToken response ");
            log.info(access_token);
            log.info(user.toString());

            return "components/Settings/settings";
        } else if (code != null) {
                log.info("Instagram In OAuth2 /accessToken ");
                log.info(code);

                // "x-www-form-urlencoded" HTTP POST request:  https://www.linkedin.com/uas/oauth2/accessToken
                String targetURL = "https://api.instagram.com/oauth/access_token";
                StringBuilder result = new StringBuilder();

                URL url;
                HttpURLConnection connection = null;
                InstagramDTO instagramDTO;
                try {
                    String urlParameters = "client_id="+InstagramController.instagram_client_id+"&client_secret="+InstagramController.instagram_client_secret+"&grant_type=authorization_code&redirect_uri="+InstagramController.instagram_callback_redirect_url+"&code="+code;
                    log.info(urlParameters);

                    //Create connection
                    url = new URL(targetURL);
                    connection = (HttpURLConnection)url.openConnection();
                    connection.setRequestMethod("POST");
                    connection.setRequestProperty("Host", "www.instagram.com");
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
                    instagramDTO = mapper.readValue(jsonObj.toString(), InstagramDTO.class);

                    UserDTO userDTO = userService.getUserByEmail(principal.getName())
                            .orElse(null);

                    if (userDTO != null) {
                        instagramDTO.setUserId(userDTO.getId());
                        socialService.createInstagram(instagramDTO);
                        log.info("InstagramDTO: " + instagramDTO.toString());
                    } else {
                        return "redirect:" + "/settings?t=instagram&s=e";
                    }


                    log.info(result.toString());
                    log.info(instagramDTO.toString());
                    return "redirect:" + "/settings?t=instagram";
                } catch (IOException e) {

                    System.err.println("Error LinkedIn accessToken ");

                    HttpURLConnection httpConn = (HttpURLConnection) connection;
                    InputStream is;
                    String line;

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
        }
        log.info("Instagram In OAuth2 /authorization/accessToken ");
        return ("authorization/accessToken");
    }
}
