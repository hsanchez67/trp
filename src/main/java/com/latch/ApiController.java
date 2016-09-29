package com.latch;

import java.io.*;
import java.lang.reflect.Field;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.latch.domain.*;
import com.latch.domain.facebook.FacebookDTO;
import com.latch.domain.googleplus.GooglePlus;
import com.latch.domain.googleplus.GooglePlusDTO;
import com.latch.domain.instagram.*;
import com.latch.domain.linkein.LinkedInDTO;
import com.latch.domain.linkein.LinkedInProfile;
import com.latch.domain.zillow.Zillow;
import com.latch.domain.zillow.ZillowDTO;
import com.latch.security.TokenHandler;
import com.latch.service.*;

import org.apache.commons.lang3.ArrayUtils;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.safety.Whitelist;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.GeocodingResult;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ApiController {
	
	private static final Logger log = LoggerFactory.getLogger(ApiController.class);

	private static final GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY");
	private static final String zwsid = "X1-ZWz1f6rqy0rwgb_7c2wf";

	private static final String google_plus_api = "AIzaSyA4poR9Y3Im0CW7lfgjK1dANMEYF5n74yY";

	private String p2pinline = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><meta name=\"viewport\" content=\"width=device-width\"></head><body style=\"-moz-box-sizing:border-box;-ms-text-size-adjust:100%;-webkit-box-sizing:border-box;-webkit-text-size-adjust:100%;Margin:0;box-sizing:border-box; color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important\"><style>@media only screen and (max-width:596px){.small-float-center{margin:0 auto!important;float:none!important;text-align:center!important}.small-text-center{text-align:center!important}.small-text-left{text-align:left!important}.small-text-right{text-align:right!important}}@media only screen and (max-width:596px){table.body table.container .hide-for-large{display:block!important;width:auto!important;overflow:visible!important}}@media only screen and (max-width:596px){table.body table.container .row.hide-for-large{display:table!important;width:100%!important}}@media only screen and (max-width:596px){table.body table.container .show-for-large{display:none!important;width:0;mso-hide:all;overflow:hidden}}@media only screen and (max-width:596px){table.body img{width:auto!important;height:auto!important}table.body center{min-width:0!important}table.body .container{width:95%!important}table.body .column,table.body .columns{height:auto!important;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:16px!important;padding-right:16px!important}table.body .column .column,table.body .column .columns,table.body .columns .column,table.body .columns .columns{padding-left:0!important;padding-right:0!important}table.body .collapse .column,table.body .collapse .columns{padding-left:0!important;padding-right:0!important}td.small-1,th.small-1{display:inline-block!important;width:8.33333%!important}td.small-2,th.small-2{display:inline-block!important;width:16.66667%!important}td.small-3,th.small-3{display:inline-block!important;width:25%!important}td.small-4,th.small-4{display:inline-block!important;width:33.33333%!important}td.small-5,th.small-5{display:inline-block!important;width:41.66667%!important}td.small-6,th.small-6{display:inline-block!important;width:50%!important}td.small-7,th.small-7{display:inline-block!important;width:58.33333%!important}td.small-8,th.small-8{display:inline-block!important;width:66.66667%!important}td.small-9,th.small-9{display:inline-block!important;width:75%!important}td.small-10,th.small-10{display:inline-block!important;width:83.33333%!important}td.small-11,th.small-11{display:inline-block!important;width:91.66667%!important}td.small-12,th.small-12{display:inline-block!important;width:100%!important}.column td.small-12,.column th.small-12,.columns td.small-12,.columns th.small-12{display:block!important;width:100%!important}.body .coldumn td.small-1,.body .column th.small-1,.body .columns td.small-1,.body .columns th.small-1,td.small-1 center,th.small-1 center{display:inline-block!important;width:8.33333%!important}.body .column td.small-2,.body .column th.small-2,.body .columns td.small-2,.body .columns th.small-2,td.small-2 center,th.small-2 center{display:inline-block!important;width:16.66667%!important}.body .column td.small-3,.body .column th.small-3,.body .columns td.small-3,.body .columns th.small-3,td.small-3 center,th.small-3 center{display:inline-block!important;width:25%!important}.body .column td.small-4,.body .column th.small-4,.body .columns td.small-4,.body .columns th.small-4,td.small-4 center,th.small-4 center{display:inline-block!important;width:33.33333%!important}.body .column td.small-5,.body .column th.small-5,.body .columns td.small-5,.body .columns th.small-5,td.small-5 center,th.small-5 center{display:inline-block!important;width:41.66667%!important}.body .column td.small-6,.body .column th.small-6,.body .columns td.small-6,.body .columns th.small-6,td.small-6 center,th.small-6 center{display:inline-block!important;width:50%!important}.body .column td.small-7,.body .column th.small-7,.body .columns td.small-7,.body .columns th.small-7,td.small-7 center,th.small-7 center{display:inline-block!important;width:58.33333%!important}.body .column td.small-8,.body .column th.small-8,.body .columns td.small-8,.body .columns th.small-8,td.small-8 center,th.small-8 center{display:inline-block!important;width:66.66667%!important}.body .column td.small-9,.body .column th.small-9,.body .columns td.small-9,.body .columns th.small-9,td.small-9 center,th.small-9 center{display:inline-block!important;width:75%!important}.body .column td.small-10,.body .column th.small-10,.body .columns td.small-10,.body .columns th.small-10,td.small-10 center,th.small-10 center{display:inline-block!important;width:83.33333%!important}.body .column td.small-11,.body .column th.small-11,.body .columns td.small-11,.body .columns th.small-11,td.small-11 center,th.small-11 center{display:inline-block!important;width:91.66667%!important}table.body td.small-offset-1,table.body th.small-offset-1{margin-left:8.33333%!important;Margin-left:8.33333%!important}table.body td.small-offset-2,table.body th.small-offset-2{margin-left:16.66667%!important;Margin-left:16.66667%!important}table.body td.small-offset-3,table.body th.small-offset-3{margin-left:25%!important;Margin-left:25%!important}table.body td.small-offset-4,table.body th.small-offset-4{margin-left:33.33333%!important;Margin-left:33.33333%!important}table.body td.small-offset-5,table.body th.small-offset-5{margin-left:41.66667%!important;Margin-left:41.66667%!important}table.body td.small-offset-6,table.body th.small-offset-6{margin-left:50%!important;Margin-left:50%!important}table.body td.small-offset-7,table.body th.small-offset-7{margin-left:58.33333%!important;Margin-left:58.33333%!important}table.body td.small-offset-8,table.body th.small-offset-8{margin-left:66.66667%!important;Margin-left:66.66667%!important}table.body td.small-offset-9,table.body th.small-offset-9{margin-left:75%!important;Margin-left:75%!important}table.body td.small-offset-10,table.body th.small-offset-10{margin-left:83.33333%!important;Margin-left:83.33333%!important}table.body td.small-offset-11,table.body th.small-offset-11{margin-left:91.66667%!important;Margin-left:91.66667%!important}table.body table.columns td.expander,table.body table.columns th.expander{display:none!important}table.body .right-text-pad,table.body .text-pad-right{padding-left:10px!important}table.body .left-text-pad,table.body .text-pad-left{padding-right:10px!important}table.menu{width:100%!important}table.menu td,table.menu th{width:auto!important;display:inline-block!important}table.menu.small-vertical td,table.menu.small-vertical th,table.menu.vertical td,table.menu.vertical th{display:block!important}table.menu[align=center]{width:auto!important}table.button.expand{width:100%!important}}</style><table class=\"body\" data-made-with-foundation=\"\" style=\"Margin:0;background:#f3f3f3;border-collapse:collapse;border-spacing:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td class=\"center\" align=\"center\" valign=\"top\" style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><center data-parsed=\"\" style=\"min-width:580px;width:100%\"><div class=\"header text-center\" align=\"center\" style=\"background:#8a8a8a;color:#fff;font-size:18px;font-weight:500\"><table class=\"container\" style=\"Margin:0 auto;background:#8a8a8a;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;padding-bottom:16px;padding-top:16px;text-align:inherit;vertical-align:top;width:580px\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;padding-bottom:16px;padding-top:16px;text-align:left;vertical-align:top;word-wrap:break-word\"><table class=\"row collapse\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"small-4 large-4 columns first\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:201.33px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><img src=\"cid:b101469c-885b-4139-bace-0b815bfc02db\" alt=\"Latch\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:block;max-width:100%;outline:0;text-decoration:none;width:auto\"></th></tr></tbody></table></th><th class=\"small-8 large-8 columns last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:394.67px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"text-right\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:right\">Latch Professional Introduction</p></th></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></div><table class=\"container text-center\" style=\"Margin:0 auto;background:#fefefe;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:580px\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><br><table class=\"row\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr><th class=\"small-12 large-1 columns first last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:32.33px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><h5 style=\"Margin:0;Margin-bottom:10px;color:inherit;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left;word-wrap:normal\">%%p1 fn%% and %%p2 fn%%,</h5><p class=\"lead\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weidght:500;font-weight:400;line-height:1.6;margin:0;margin-bottom:10px;padding:0;text-align:left\">I would like to Introduce you</p><p id=\"reason-text\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><strong>Re: </strong>%%reason text%%</p></th></tr></tbody></table><table class=\"callout-primary\" style=\"background:#888;border:1px solid #444;border-collapse:collapse;border-spacing:0;color:#fff;margin-bottom:10px;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"small-12 large-6 columns first\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:8px;text-align:left;width:50%\"><table class=\"text-center\" style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:center;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"text-center\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:center\"><img src=\"cid:avatar1.jpg\" class=\"thumbnail top10\" alt=\"%%p1 fn%%\" style=\"-moz-border-radius:100%;-ms-border-radius:100%;-ms-interpolation-mode:bicubic;-o-border-radius:100%;-webkit-border-radius:100%;border:none;border-radius:100%;box-shadow:0 0 0 1px rgba(10,10,10,.2);clear:both;display:inline-block;height:80px;line-height:0;margin-bottom:5px;margin-right:10px;margin-top:10px;max-width:80px;outline:0;text-decoration:none;transition:box-shadow .2s ease-out;width:80px\"></p><p class=\"text-center white\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:center\"><span class=\"lead\">%%p2 fn%%</span> meet <span class=\"lead\">%%p1 fn%%</span></p><p class=\"text-center white\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:center\"><a href=\"%%p1 publicUrl%%\" style=\"Margin:0;color:#fff;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:underline\">%%p1 fn%%'s full profile</a></p></th><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left;width:80px\"><img src=\"cid:804ae63b-a83d-4e1e-881b-76e1ceb74386\" class=\"arrow\" alt=\"meet\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:block;height:72px;margin:0 auto;max-width:100%;outline:0;padding-top:20px;text-decoration:none;width:72px\"></th><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"text-center\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:center\"><img src=\"cid:avatar2.jpg\" class=\"thumbnail top10\" alt=\"%%p2 fn%%\" style=\"-moz-border-radius:100%;-ms-border-radius:100%;-ms-interpolation-mode:bicubic;-o-border-radius:100%;-webkit-border-radius:100%;border:none;border-radius:100%;box-shadow:0 0 0 1px rgba(10,10,10,.2);clear:both;display:inline-block;height:80px;line-height:0;margin-bottom:5px;margin-right:10px;margin-top:10px;max-width:80px;outline:0;text-decoration:none;transition:box-shadow .2s ease-out;width:80px\"></p><p class=\"text-center white\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:center\"><span class=\"lead\">%%p1 fn%%</span> meet <span class=\"lead\">%%p2 fn%%</span></p><p class=\"text-center white\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:center\"><a href=\"%%p2 publicUrl%%\" style=\"Margin:0;color:#fff;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:underline\">%%p2 fn%%'s full profile</a></p></th></tr></tbody></table></th></tr><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><center style=\"min-width:.33px;width:100%\"><table class=\"button small radius\" style=\"Margin:0 0 16px 0;border-collapse:collapse;border-spacing:0;margin:0 0 16px 0;padding:0;text-align:left;vertical-align:top;width:auto!important\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;background:#337ab7;border:2px solid #337ab7;border-collapse:collapse!important;color:#fefefe;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:5px 10px 5px 10px;text-align:left;vertical-align:top;word-wrap:break-word\"><center data-parsed=\"\" style=\"min-width:.33px;width:100%\"><a href=\"%%publicUrl%%\" align=\"center\" class=\"text-center\" style=\"Margin:0;border:1px solid transparent;border-radius:3px;color:#fefefe;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;line-height:1.3;margin:0;padding:5px 10px 5px 10px;text-align:left;text-decoration:none\">Open in Latch Portal</a></center></td></tr></tbody></table></td><td class=\"expander\" style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-wrap:break-word\"></td></tr></tbody></table><center style=\"min-width:.33px;width:100%\"></center></center></td></tr></tbody></table><table id=\"includeMessage\" style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">%%includeMessage%%</p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"></p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">%%user fn%% %%user ln%%</p></th></tr></tbody></table><p id=\"endOfIncludeMessage\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"></p><table class=\"callout\" style=\"Margin-bottom:16px;border-collapse:collapse;border-spacing:0;margin-bottom:16px;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"callout-inner secondary\" style=\"Margin:0;background:#f2f2f2;border:1px solid #fff;color:#5A5A5A;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:10px;text-align:left;width:100%\"><table class=\"row\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"small-12 large-6 columns last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:8px;padding-right:16px;text-align:left;width:50%\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><h6 style=\"Margin:0;Margin-bottom:10px;color:inherit;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left;word-wrap:normal\">%%user fn%% %%user ln%%</h6><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><img class=\"icon\" src=\"cid:c469ad83-ce7f-4037-aa01-3896c2e40d84\" alt=\"\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:inline-block;height:16px;line-height:1px;max-width:100%;outline:0;text-decoration:none;width:16px\"> %%user phone%%</p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><img class=\"icon\" src=\"cid:7a3ecf13-c908-4512-971d-37327de25910\" alt=\"\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:inline-block;height:16px;line-height:1px;max-width:100%;outline:0;text-decoration:none;width:16px\"> <a href=\"mailto:%%user email%%\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">%%user email%%</a></p></th></tr></tbody></table></th></tr></tbody></table></th><th class=\"expander\" style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0!important;text-align:left;visibility:hidden;width:0\"></th></tr></tbody></table><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"disclaimer\" style=\"Margin:0;Margin-bottom:10px;color:#8c8c8c;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">Latch, Inc.<br>2998 Douglas Blvd #350, Roseville, CA 95661, United States<br>@2016 Latch, Inc. All Rights Reserved<br><br><strong><a classname=\"bold\" href=\"https://www.thereferralportal.com\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">Latch Inc.</a> | <a href=\"https://www.thereferralportal.com/privacy\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">Privacy Policy</a></strong></p></th></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table></body></html>";

	private String p2cinline = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><meta name=\"viewport\" content=\"width=device-width\"></head><body style=\"-moz-box-sizing:border-box;-ms-text-size-adjust:100%;-webkit-box-sizing:border-box;-webkit-text-size-adjust:100%;Margin:0;box-sizing:border-box;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important\"><style>@media only screen and (max-width:596px){.small-float-center{margin:0 auto!important;float:none!important;text-align:center!important}.small-text-center{text-align:center!important}.small-text-left{text-align:left!important}.small-text-right{text-align:right!important}}@media only screen and (max-width:596px){table.body table.container .hide-for-large{display:block!important;width:auto!important;overflow:visible!important}}@media only screen and (max-width:596px){table.body table.container .row.hide-for-large{display:table!important;width:100%!important}}@media only screen and (max-width:596px){table.body table.container .show-for-large{display:none!important;width:0;mso-hide:all;overflow:hidden}}@media only screen and (max-width:596px){table.body img{width:auto!important;height:auto!important}table.body center{min-width:0!important}table.body .container{width:95%!important}table.body .column,table.body .columns{height:auto!important;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:16px!important;padding-right:16px!important}table.body .column .column,table.body .column .columns,table.body .columns .column,table.body .columns .columns{padding-left:0!important;padding-right:0!important}table.body .collapse .column,table.body .collapse .columns{padding-left:0!important;padding-right:0!important}td.small-1,th.small-1{display:inline-block!important;width:8.33333%!important}td.small-2,th.small-2{display:inline-block!important;width:16.66667%!important}td.small-3,th.small-3{display:inline-block!important;width:25%!important}td.small-4,th.small-4{display:inline-block!important;width:33.33333%!important}td.small-5,th.small-5{display:inline-block!important;width:41.66667%!important}td.small-6,th.small-6{display:inline-block!important;width:50%!important}td.small-7,th.small-7{display:inline-block!important;width:58.33333%!important}td.small-8,th.small-8{display:inline-block!important;width:66.66667%!important}td.small-9,th.small-9{display:inline-block!important;width:75%!important}td.small-10,th.small-10{display:inline-block!important;width:83.33333%!important}td.small-11,th.small-11{display:inline-block!important;width:91.66667%!important}td.small-12,th.small-12{display:inline-block!important;width:100%!important}.column td.small-12,.column th.small-12,.columns td.small-12,.columns th.small-12{display:block!important;width:100%!important}.body .column td.small-1,.body .column th.small-1,.body .columns td.small-1,.body .columns th.small-1,td.small-1 center,th.small-1 center{display:inline-block!important;width:8.33333%!important}.body .column td.small-2,.body .column th.small-2,.body .columns td.small-2,.body .columns th.small-2,td.small-2 center,th.small-2 center{display:inline-block!important;width:16.66667%!important}.body .column td.small-3,.body .column th.small-3,.body .columns td.small-3,.body .columns th.small-3,td.small-3 center,th.small-3 center{display:inline-block!important;width:25%!important}.body .column td.small-4,.body .column th.small-4,.body .columns td.small-4,.body .columns th.small-4,td.small-4 center,th.small-4 center{display:inline-block!important;width:33.33333%!important}.body .column td.small-5,.body .column th.small-5,.body .columns td.small-5,.body .columns th.small-5,td.small-5 center,th.small-5 center{display:inline-block!important;width:41.66667%!important}.body .column td.small-6,.body .column th.small-6,.body .columns td.small-6,.body .columns th.small-6,td.small-6 center,th.small-6 center{display:inline-block!important;width:50%!important}.body .column td.small-7,.body .column th.small-7,.body .columns td.small-7,.body .columns th.small-7,td.small-7 center,th.small-7 center{display:inline-block!important;width:58.33333%!important}.body .column td.small-8,.body .column th.small-8,.body .columns td.small-8,.body .columns th.small-8,td.small-8 center,th.small-8 center{display:inline-block!important;width:66.66667%!important}.body .column td.small-9,.body .column th.small-9,.body .columns td.small-9,.body .columns th.small-9,td.small-9 center,th.small-9 center{display:inline-block!important;width:75%!important}.body .column td.small-10,.body .column th.small-10,.body .columns td.small-10,.body .columns th.small-10,td.small-10 center,th.small-10 center{display:inline-block!important;width:83.33333%!important}.body .column td.small-11,.body .column th.small-11,.body .columns td.small-11,.body .columns th.small-11,td.small-11 center,th.small-11 center{display:inline-block!important;width:91.66667%!important}table.body td.small-offset-1,table.body th.small-offset-1{margin-left:8.33333%!important;Margin-left:8.33333%!important}table.body td.small-offset-2,table.body th.small-offset-2{margin-left:16.66667%!important;Margin-left:16.66667%!important}table.body td.small-offset-3,table.body th.small-offset-3{margin-left:25%!important;Margin-left:25%!important}table.body td.small-offset-4,table.body th.small-offset-4{margin-left:33.33333%!important;Margin-left:33.33333%!important}table.body td.small-offset-5,table.body th.small-offset-5{margin-left:41.66667%!important;Margin-left:41.66667%!important}table.body td.small-offset-6,table.body th.small-offset-6{margin-left:50%!important;Margin-left:50%!important}table.body td.small-offset-7,table.body th.small-offset-7{margin-left:58.33333%!important;Margin-left:58.33333%!important}table.body td.small-offset-8,table.body th.small-offset-8{margin-left:66.66667%!important;Margin-left:66.66667%!important}table.body td.small-offset-9,table.body th.small-offset-9{margin-left:75%!important;Margin-left:75%!important}table.body td.small-offset-10,table.body th.small-offset-10{margin-left:83.33333%!important;Margin-left:83.33333%!important}table.body td.small-offset-11,table.body th.small-offset-11{margin-left:91.66667%!important;Margin-left:91.66667%!important}table.body table.columns td.expander,table.body table.columns th.expander{display:none!important}table.body .right-text-pad,table.body .text-pad-right{padding-left:10px!important}table.body .left-text-pad,table.body .text-pad-left{padding-right:10px!important}table.menu{width:100%!important}table.menu td,table.menu th{width:auto!important;display:inline-block!important}table.menu.small-vertical td,table.menu.small-vertical th,table.menu.vertical td,table.menu.vertical th{display:block!important}table.menu[align=center]{width:auto!important}table.button.expand{width:100%!important}}</style><table class=\"body\" data-made-with-foundation=\"\" style=\"Margin:0;background:#f3f3f3;border-collapse:collapse;border-spacing:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td class=\"center\" align=\"center\" valign=\"top\" style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><center data-parsed=\"\" style=\"min-width:580px;width:100%\"><div class=\"header text-center\" align=\"center\" style=\"background:#8a8a8a;color:#fff;font-size:18px;font-weight:500\"><table class=\"container\" style=\"Margin:0 auto;background:#8a8a8a;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;padding-bottom:16px;padding-top:16px;text-align:inherit;vertical-align:top;width:580px\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;padding-bottom:16px;padding-top:16px;text-align:left;vertical-align:top;word-wrap:break-word\"><table class=\"row collapse\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"small-4 large-4 columns first\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:201.33px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><img src=\"cid:b101469c-885b-4139-bace-0b815bfc02db\" alt=\"Latch\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:block;max-width:100%;outline:0;text-decoration:none;width:auto\"></th></tr></tbody></table></th><th class=\"small-8 large-8 columns last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:394.67px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"text-right\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:right\">Latch Professional Referral</p></th></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></div><table class=\"container text-center\" style=\"Margin:0 auto;background:#fefefe;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:580px\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><br><table class=\"row\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr><th class=\"small-12 large-1 columns first last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:32.33px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><h5 class=\"bold500\" style=\"Margin:0;Margin-bottom:10px;color:inherit;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left;word-wrap:normal\">%%p2 fn%%,</h5><p class=\"lead2\" style=\"Margin:0;Margin-bottom:10px;color:#000;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weidght:500;font-weight:400;line-height:1.6;margin:0;margin-bottom:10px;padding:0;text-align:left\">%%p1 fn%% is a %%p1 profession%% that I recommend based on your needs.</p><p id=\"reason-text\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><strong>Re: </strong>%%reason text%%</p></th></tr></tbody></table><table class=\"callout-primary\" style=\"background:#888;border:1px solid #444;border-collapse:collapse;border-spacing:0;color:#fff;margin-bottom:10px;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"small-12 large-6 columns first\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:8px;text-align:left;width:50%\"><table class=\"text-center margin5\" style=\"border-collapse:collapse;border-spacing:0;margin-left:5px;margin-right:5px;padding:0;text-align:center;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"mainText\" style=\"Margin:0;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><img src=\"cid:avatar1.jpg\" class=\"thumbnail top10 left10 float-left\" alt=\"%%p1 fn%%\" style=\"-moz-border-radius:100%;-ms-border-radius:100%;-ms-interpolation-mode:bicubic;-o-border-radius:100%;-webkit-border-radius:100%;border:none;border-radius:100%;box-shadow:0 0 0 1px rgba(10,10,10,.2);clear:both;display:inline-block;float:left;height:80px;line-height:0;margin-bottom:5px;margin-left:10px;margin-right:10px;margin-top:10px;max-width:80px;outline:0;text-align:left;text-decoration:none;transition:box-shadow .2s ease-out;width:80px\"></p><p class=\"lead\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weidght:500;font-weight:400;line-height:1.6;margin:0;margin-bottom:10px;padding:0;text-align:left\">%%p1 fn%% %%p1 ln%%</p><p class=\"subheader\" style=\"Margin:0;Margin-bottom:8px;Margin-top:4px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:1.4;margin:0;margin-bottom:8px;margin-top:4px;padding:0;text-align:left\">%%p1 leadParagraph%%</p><p class=\"mainText\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">%%p1 description%%</p></th></tr></tbody></table></th></tr><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><center style=\"min-width:.33px;width:100%\"><table class=\"button small radius\" style=\"Margin:0 0 16px 0;border-collapse:collapse;border-spacing:0;margin:0 0 16px 0;padding:0;text-align:left;vertical-align:top;width:auto!important\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;background:#337ab7;border:2px solid #337ab7;border-collapse:collapse!important;color:#fefefe;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:5px 10px 5px 10px;text-align:left;vertical-align:top;word-wrap:break-word\"><center data-parsed=\"\" style=\"min-width:.33px;width:100%\"><a href=\"%%p1 publicUrl%%\" align=\"center\" class=\"text-center\" style=\"Margin:0;border:1px solid transparent;border-radius:3px;color:#fefefe;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;line-height:1.3;margin:0;padding:5px 10px 5px 10px;text-align:left;text-decoration:none\">Open in Latch Portal</a></center></td></tr></tbody></table></td><td class=\"expander\" style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0!important;text-align:left;vertical-align:top;visibility:hidden;width:0;word-wrap:break-word\"></td></tr></tbody></table><center style=\"min-width:.33px;width:100%\"></center></center></td></tr></tbody></table><table id=\"includeMessage\" style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">%%includeMessage%%</p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"></p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">%%user fn%% %%user ln%%</p></th></tr></tbody></table><p id=\"endOfIncludeMessage\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"></p><table class=\"callout\" style=\"Margin-bottom:16px;border-collapse:collapse;border-spacing:0;margin-bottom:16px;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"callout-inner secondary\" style=\"Margin:0;background:#f2f2f2;border:1px solid #fff;color:#5A5A5A;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:10px;text-align:left;width:100%\"><table class=\"row\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"small-12 large-6 columns last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:8px;padding-right:16px;text-align:left;width:50%\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><h6 style=\"Margin:0;Margin-bottom:10px;color:inherit;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left;word-wrap:normal\">%%user fn%% %%user ln%%</h6><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><img class=\"icon\" src=\"cid:c469ad83-ce7f-4037-aa01-3896c2e40d84\" alt=\"\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:inline-block;height:16px;line-height:1px;max-width:100%;outline:0;text-decoration:none;width:16px\"> %%user phone%%</p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><img class=\"icon\" src=\"cid:7a3ecf13-c908-4512-971d-37327de25910\" alt=\"\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:inline-block;height:16px;line-height:1px;max-width:100%;outline:0;text-decoration:none;width:16px\"> <a href=\"mailto:%%user email%%\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">%%user email%%</a></p></th></tr></tbody></table></th></tr></tbody></table></th><th class=\"expander\" style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0!important;text-align:left;visibility:hidden;width:0\"></th></tr></tbody></table><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"disclaimer\" style=\"Margin:0;Margin-bottom:10px;color:#8c8c8c;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">Latch, Inc.<br>2998 Douglas Blvd #350, Roseville, CA 95661, United States<br>@2016 Latch, Inc. All Rights Reserved<br><br><strong><a classname=\"bold\" href=\"https://www.thereferralportal.com\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">Latch Inc.</a> | <a href=\"http://www.thereferralportal.com/privacy\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">Privacy Policy</a></strong></p></th></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table></body></html>";

	private String basicinline = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><meta name=\"viewport\" content=\"width=device-width\"></head><body style=\"-moz-box-sizing:border-box;-ms-text-size-adjust:100%;-webkit-box-sizing:border-box;-webkit-text-size-adjust:100%;Margin:0;box-sizing:border-box;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important\"><style>@media only screen and (max-width:596px){.small-float-center{margin:0 auto!important;float:none!important;text-align:center!important}.small-text-center{text-align:center!important}.small-text-left{text-align:left!important}.small-text-right{text-align:right!important}}@media only screen and (max-width:596px){table.body table.container .hide-for-large{display:block!important;width:auto!important;overflow:visible!important}}@media only screen and (max-width:596px){table.body table.container .row.hide-for-large{display:table!important;width:100%!important}}@media only screen and (max-width:596px){table.body table.container .show-for-large{display:none!important;width:0;mso-hide:all;overflow:hidden}}@media only screen and (max-width:596px){table.body img{width:auto!important;height:auto!important}table.body center{min-width:0!important}table.body .container{width:95%!important}table.body .column,table.body .columns{height:auto!important;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:16px!important;padding-right:16px!important}table.body .column .column,table.body .column .columns,table.body .columns .column,table.body .columns .columns{padding-left:0!important;padding-right:0!important}table.body .collapse .column,table.body .collapse .columns{padding-left:0!important;padding-right:0!important}td.small-1,th.small-1{display:inline-block!important;width:8.33333%!important}td.small-2,th.small-2{display:inline-block!important;width:16.66667%!important}td.small-3,th.small-3{display:inline-block!important;width:25%!important}td.small-4,th.small-4{display:inline-block!important;width:33.33333%!important}td.small-5,th.small-5{display:inline-block!important;width:41.66667%!important}td.small-6,th.small-6{display:inline-block!important;width:50%!important}td.small-7,th.small-7{display:inline-block!important;width:58.33333%!important}td.small-8,th.small-8{display:inline-block!important;width:66.66667%!important}td.small-9,th.small-9{display:inline-block!important;width:75%!important}td.small-10,th.small-10{display:inline-block!important;width:83.33333%!important}td.small-11,th.small-11{display:inline-block!important;width:91.66667%!important}td.small-12,th.small-12{display:inline-block!important;width:100%!important}.column td.small-12,.column th.small-12,.columns td.small-12,.columns th.small-12{display:block!important;width:100%!important}.body .column td.small-1,.body .column th.small-1,.body .columns td.small-1,.body .columns th.small-1,td.small-1 center,th.small-1 center{display:inline-block!important;width:8.33333%!important}.body .column td.small-2,.body .column th.small-2,.body .columns td.small-2,.body .columns th.small-2,td.small-2 center,th.small-2 center{display:inline-block!important;width:16.66667%!important}.body .column td.small-3,.body .column th.small-3,.body .columns td.small-3,.body .columns th.small-3,td.small-3 center,th.small-3 center{display:inline-block!important;width:25%!important}.body .column td.small-4,.body .column th.small-4,.body .columns td.small-4,.body .columns th.small-4,td.small-4 center,th.small-4 center{display:inline-block!important;width:33.33333%!important}.body .column td.small-5,.body .column th.small-5,.body .columns td.small-5,.body .columns th.small-5,td.small-5 center,th.small-5 center{display:inline-block!important;width:41.66667%!important}.body .column td.small-6,.body .column th.small-6,.body .columns td.small-6,.body .columns th.small-6,td.small-6 center,th.small-6 center{display:inline-block!important;width:50%!important}.body .column td.small-7,.body .column th.small-7,.body .columns td.small-7,.body .columns th.small-7,td.small-7 center,th.small-7 center{display:inline-block!important;width:58.33333%!important}.body .column td.small-8,.body .column th.small-8,.body .columns td.small-8,.body .columns th.small-8,td.small-8 center,th.small-8 center{display:inline-block!important;width:66.66667%!important}.body .column td.small-9,.body .column th.small-9,.body .columns td.small-9,.body .columns th.small-9,td.small-9 center,th.small-9 center{display:inline-block!important;width:75%!important}.body .column td.small-10,.body .column th.small-10,.body .columns td.small-10,.body .columns th.small-10,td.small-10 center,th.small-10 center{display:inline-block!important;width:83.33333%!important}.body .column td.small-11,.body .column th.small-11,.body .columns td.small-11,.body .columns th.small-11,td.small-11 center,th.small-11 center{display:inline-block!important;width:91.66667%!important}table.body td.small-offset-1,table.body th.small-offset-1{margin-left:8.33333%!important;Margin-left:8.33333%!important}table.body td.small-offset-2,table.body th.small-offset-2{margin-left:16.66667%!important;Margin-left:16.66667%!important}table.body td.small-offset-3,table.body th.small-offset-3{margin-left:25%!important;Margin-left:25%!important}table.body td.small-offset-4,table.body th.small-offset-4{margin-left:33.33333%!important;Margin-left:33.33333%!important}table.body td.small-offset-5,table.body th.small-offset-5{margin-left:41.66667%!important;Margin-left:41.66667%!important}table.body td.small-offset-6,table.body th.small-offset-6{margin-left:50%!important;Margin-left:50%!important}table.body td.small-offset-7,table.body th.small-offset-7{margin-left:58.33333%!important;Margin-left:58.33333%!important}table.body td.small-offset-8,table.body th.small-offset-8{margin-left:66.66667%!important;Margin-left:66.66667%!important}table.body td.small-offset-9,table.body th.small-offset-9{margin-left:75%!important;Margin-left:75%!important}table.body td.small-offset-10,table.body th.small-offset-10{margin-left:83.33333%!important;Margin-left:83.33333%!important}table.body td.small-offset-11,table.body th.small-offset-11{margin-left:91.66667%!important;Margin-left:91.66667%!important}table.body table.columns td.expander,table.body table.columns th.expander{display:none!important}table.body .right-text-pad,table.body .text-pad-right{padding-left:10px!important}table.body .left-text-pad,table.body .text-pad-left{padding-right:10px!important}table.menu{width:100%!important}table.menu td,table.menu th{width:auto!important;display:inline-block!important}table.menu.small-vertical td,table.menu.small-vertical th,table.menu.vertical td,table.menu.vertical th{display:block!important}table.menu[align=center]{width:auto!important}table.button.expand{width:100%!important}}</style><table class=\"body\" data-made-with-foundation=\"\" style=\"Margin:0;background:#f3f3f3;border-collapse:collapse;border-spacing:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td class=\"center\" align=\"center\" valign=\"top\" style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><center data-parsed=\"\" style=\"min-width:580px;width:100%\"><div class=\"header text-center\" align=\"center\" style=\"background:#8a8a8a;color:#fff;font-size:18px;font-weight:500\"><table class=\"container\" style=\"Margin:0 auto;background:#8a8a8a;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;padding-bottom:16px;padding-top:16px;text-align:inherit;vertical-align:top;width:580px\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;padding-bottom:16px;padding-top:16px;text-align:left;vertical-align:top;word-wrap:break-word\"><table class=\"row collapse\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"small-4 large-4 columns first\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:201.33px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><img src=\"cid:b101469c-885b-4139-bace-0b815bfc02db\" alt=\"Latch\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:block;max-width:100%;outline:0;text-decoration:none;width:auto\"></th></tr></tbody></table></th><th class=\"small-8 large-8 columns last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:394.67px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"text-right\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:right\">Latch Communication</p></th></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></div><table class=\"container text-center\" style=\"Margin:0 auto;background:#fefefe;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:580px\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><br><table class=\"row\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr><th class=\"small-12 large-1 columns first last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:32.33px\"><table id=\"includeMessage\" style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">%%includeMessage%%</p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"></p></th></tr></tbody></table><p id=\"endOfIncludeMessage\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"></p><table class=\"callout\" style=\"Margin-bottom:16px;border-collapse:collapse;border-spacing:0;margin-bottom:16px;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"callout-inner secondary\" style=\"Margin:0;background:#f2f2f2;border:1px solid #fff;color:#5A5A5A;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:10px;text-align:left;width:100%\"><table class=\"row\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"small-12 large-6 columns last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:8px;padding-right:16px;text-align:left;width:50%\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><h6 style=\"Margin:0;Margin-bottom:10px;color:inherit;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left;word-wrap:normal\">%%user fn%% %%user ln%%</h6><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><img class=\"icon\" src=\"cid:c469ad83-ce7f-4037-aa01-3896c2e40d84\" alt=\"\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:inline-block;height:16px;line-height:1px;max-width:100%;outline:0;text-decoration:none;width:16px\"> %%user phone%%</p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><img class=\"icon\" src=\"cid:7a3ecf13-c908-4512-971d-37327de25910\" alt=\"\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:inline-block;height:16px;line-height:1px;max-width:100%;outline:0;text-decoration:none;width:16px\"> <a href=\"mailto:%%user email%%\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">%%user email%%</a></p></th></tr></tbody></table></th></tr></tbody></table></th><th class=\"expander\" style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0!important;text-align:left;visibility:hidden;width:0\"></th></tr></tbody></table><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"disclaimer\" style=\"Margin:0;Margin-bottom:10px;color:#8c8c8c;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">Latch, Inc.<br>2998 Douglas Blvd #350, Roseville, CA 95661, United States<br>@2016 Latch, Inc. All Rights Reserved<br><br><strong><a classname=\"bold\" href=\"https://www.thereferralportal.com\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">Latch Inc.</a> | <a href=\"https://www.thereferralportal.com/privacy\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">Privacy Policy</a></strong></p></th></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table></body></html>";

	String latchinline = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><meta name=\"viewport\" content=\"width=device-width\"></head><body style=\"-moz-box-sizing:border-box;-ms-text-size-adjust:100%;-webkit-box-sizing:border-box;-webkit-text-size-adjust:100%;Margin:0;box-sizing:border-box;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important\"><style>@media only screen and (max-width:596px){.small-float-center{margin:0 auto!important;float:none!important;text-align:center!important}.small-text-center{text-align:center!important}.small-text-left{text-align:left!important}.small-text-right{text-align:right!important}}@media only screen and (max-width:596px){table.body table.container .hide-for-large{display:block!important;width:auto!important;overflow:visible!important}}@media only screen and (max-width:596px){table.body table.container .row.hide-for-large{display:table!important;width:100%!important}}@media only screen and (max-width:596px){table.body table.container .show-for-large{display:none!important;width:0;mso-hide:all;overflow:hidden}}@media only screen and (max-width:596px){table.body img{width:auto!important;height:auto!important}table.body center{min-width:0!important}table.body .container{width:95%!important}table.body .column,table.body .columns{height:auto!important;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:16px!important;padding-right:16px!important}table.body .column .column,table.body .column .columns,table.body .columns .column,table.body .columns .columns{padding-left:0!important;padding-right:0!important}table.body .collapse .column,table.body .collapse .columns{padding-left:0!important;padding-right:0!important}td.small-1,th.small-1{display:inline-block!important;width:8.33333%!important}td.small-2,th.small-2{display:inline-block!important;width:16.66667%!important}td.small-3,th.small-3{display:inline-block!important;width:25%!important}td.small-4,th.small-4{display:inline-block!important;width:33.33333%!important}td.small-5,th.small-5{display:inline-block!important;width:41.66667%!important}td.small-6,th.small-6{display:inline-block!important;width:50%!important}td.small-7,th.small-7{display:inline-block!important;width:58.33333%!important}td.small-8,th.small-8{display:inline-block!important;width:66.66667%!important}td.small-9,th.small-9{display:inline-block!important;width:75%!important}td.small-10,th.small-10{display:inline-block!important;width:83.33333%!important}td.small-11,th.small-11{display:inline-block!important;width:91.66667%!important}td.small-12,th.small-12{display:inline-block!important;width:100%!important}.column td.small-12,.column th.small-12,.columns td.small-12,.columns th.small-12{display:block!important;width:100%!important}.body .column td.small-1,.body .column th.small-1,.body .columns td.small-1,.body .columns th.small-1,td.small-1 center,th.small-1 center{display:inline-block!important;width:8.33333%!important}.body .column td.small-2,.body .column th.small-2,.body .columns td.small-2,.body .columns th.small-2,td.small-2 center,th.small-2 center{display:inline-block!important;width:16.66667%!important}.body .column td.small-3,.body .column th.small-3,.body .columns td.small-3,.body .columns th.small-3,td.small-3 center,th.small-3 center{display:inline-block!important;width:25%!important}.body .column td.small-4,.body .column th.small-4,.body .columns td.small-4,.body .columns th.small-4,td.small-4 center,th.small-4 center{display:inline-block!important;width:33.33333%!important}.body .column td.small-5,.body .column th.small-5,.body .columns td.small-5,.body .columns th.small-5,td.small-5 center,th.small-5 center{display:inline-block!important;width:41.66667%!important}.body .column td.small-6,.body .column th.small-6,.body .columns td.small-6,.body .columns th.small-6,td.small-6 center,th.small-6 center{display:inline-block!important;width:50%!important}.body .column td.small-7,.body .column th.small-7,.body .columns td.small-7,.body .columns th.small-7,td.small-7 center,th.small-7 center{display:inline-block!important;width:58.33333%!important}.body .column td.small-8,.body .column th.small-8,.body .columns td.small-8,.body .columns th.small-8,td.small-8 center,th.small-8 center{display:inline-block!important;width:66.66667%!important}.body .column td.small-9,.body .column th.small-9,.body .columns td.small-9,.body .columns th.small-9,td.small-9 center,th.small-9 center{display:inline-block!important;width:75%!important}.body .column td.small-10,.body .column th.small-10,.body .columns td.small-10,.body .columns th.small-10,td.small-10 center,th.small-10 center{display:inline-block!important;width:83.33333%!important}.body .column td.small-11,.body .column th.small-11,.body .columns td.small-11,.body .columns th.small-11,td.small-11 center,th.small-11 center{display:inline-block!important;width:91.66667%!important}table.body td.small-offset-1,table.body th.small-offset-1{margin-left:8.33333%!important;Margin-left:8.33333%!important}table.body td.small-offset-2,table.body th.small-offset-2{margin-left:16.66667%!important;Margin-left:16.66667%!important}table.body td.small-offset-3,table.body th.small-offset-3{margin-left:25%!important;Margin-left:25%!important}table.body td.small-offset-4,table.body th.small-offset-4{margin-left:33.33333%!important;Margin-left:33.33333%!important}table.body td.small-offset-5,table.body th.small-offset-5{margin-left:41.66667%!important;Margin-left:41.66667%!important}table.body td.small-offset-6,table.body th.small-offset-6{margin-left:50%!important;Margin-left:50%!important}table.body td.small-offset-7,table.body th.small-offset-7{margin-left:58.33333%!important;Margin-left:58.33333%!important}table.body td.small-offset-8,table.body th.small-offset-8{margin-left:66.66667%!important;Margin-left:66.66667%!important}table.body td.small-offset-9,table.body th.small-offset-9{margin-left:75%!important;Margin-left:75%!important}table.body td.small-offset-10,table.body th.small-offset-10{margin-left:83.33333%!important;Margin-left:83.33333%!important}table.body td.small-offset-11,table.body th.small-offset-11{margin-left:91.66667%!important;Margin-left:91.66667%!important}table.body table.columns td.expander,table.body table.columns th.expander{display:none!important}table.body .right-text-pad,table.body .text-pad-right{padding-left:10px!important}table.body .left-text-pad,table.body .text-pad-left{padding-right:10px!important}table.menu{width:100%!important}table.menu td,table.menu th{width:auto!important;display:inline-block!important}table.menu.small-vertical td,table.menu.small-vertical th,table.menu.vertical td,table.menu.vertical th{display:block!important}table.menu[align=center]{width:auto!important}table.button.expand{width:100%!important}}</style><table class=\"body\" data-made-with-foundation=\"\" style=\"Margin:0;background:#f3f3f3;border-collapse:collapse;border-spacing:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td class=\"center\" align=\"center\" valign=\"top\" style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><center data-parsed=\"\" style=\"min-width:580px;width:100%\"><div class=\"header text-center\" align=\"center\" style=\"background:#8a8a8a;color:#fff;font-size:18px;font-weight:500\"><table class=\"container\" style=\"Margin:0 auto;background:#8a8a8a;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;padding-bottom:16px;padding-top:16px;text-align:inherit;vertical-align:top;width:580px\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;padding-bottom:16px;padding-top:16px;text-align:left;vertical-align:top;word-wrap:break-word\"><table class=\"row collapse\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th class=\"small-4 large-4 columns first\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:201.33px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><img src=\"cid:b101469c-885b-4139-bace-0b815bfc02db\" alt=\"Latch\" style=\"-ms-interpolation-mode:bicubic;clear:both;display:block;max-width:100%;outline:0;text-decoration:none;width:auto\"></th></tr></tbody></table></th><th class=\"small-8 large-8 columns last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:394.67px\"><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"text-right\" style=\"Margin:0;Margin-bottom:10px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:right\">Latch Notification</p></th></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></div><table class=\"container text-center\" style=\"Margin:0 auto;background:#fefefe;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:580px\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><td style=\"-moz-hyphens:auto;-webkit-hyphens:auto;Margin:0;border-collapse:collapse!important;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;hyphens:auto;line-height:19px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word\"><br><table class=\"row\" style=\"border-collapse:collapse;border-spacing:0;display:table;padding:0;position:relative;text-align:left;vertical-align:top;width:100%\"><tbody><tr><th class=\"small-12 large-1 columns first last\" style=\"Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:32.33px\"><table id=\"includeMessage\" style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p id=\"reason-text\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"><strong>Re: </strong>%%reason text%%</p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">%%includeMessage%%</p><p style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"></p></th></tr></tbody></table><p id=\"endOfIncludeMessage\" style=\"Margin:0;Margin-bottom:10px;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\"></p><table style=\"border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%\"><tbody><tr style=\"padding:0;text-align:left;vertical-align:top\"><th style=\"Margin:0;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:19px;margin:0;padding:0;text-align:left\"><p class=\"disclaimer\" style=\"Margin:0;Margin-bottom:10px;color:#8c8c8c;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:left\">Latch, Inc.<br>2998 Douglas Blvd #350, Roseville, CA 95661, United States<br>@2016 Latch, Inc. All Rights Reserved<br><br><strong><a classname=\"bold\" href=\"https://www.thereferralportal.com\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">Latch Inc.</a> | <a href=\"https://www.thereferralportal.com/privacy\" style=\"Margin:0;color:#2199e8;font-family:Helvetica,Arial,sans-serif;font-weight:400;line-height:1.3;margin:0;padding:0;text-align:left;text-decoration:none\">Privacy Policy</a></strong></p></th></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table></body></html>";

	private final UserService userService;
	private final NetworkService networkService;
	private final RemoteFileService remoteFileService;
	private final SocialService socialService;
	private final CommunicationService communicationService;
	private final ProfessionService professionService;
	private final TagService tagService;
	private final ReviewService reviewService;
	private final UserNoteService userNoteService;
	private final TokenHandler tokenHandler;
	private final ReminderService reminderService;
	
	@Autowired
	public ApiController(UserService userService, NetworkService networkService, RemoteFileService remoteFileService,
			SocialService socialService, CommunicationService communicationService, ProfessionService professionService,
			TagService tagService, ReviewService reviewService, UserNoteService userNoteService, TokenHandler tokenHandler,
			ReminderService reminderService) {
		this.userService = userService;
		this.networkService = networkService;
		this.remoteFileService = remoteFileService;
		this.socialService = socialService;
		this.communicationService = communicationService;
		this.professionService = professionService;
		this.tagService = tagService;
		this.reviewService = reviewService;
		this.userNoteService = userNoteService;
		this.tokenHandler = tokenHandler;
		this.reminderService = reminderService;
	}

    @RequestMapping(value = "/registerUser", method = RequestMethod.POST)
    public Resource<UserDTO> registerUser(@RequestBody UserDTO input) {
		log.info("Register User: " + input.toString());
        UserDTO user = new UserDTO(input.getFirstName(), input.getLastName(), input.getEmail(), input.getPhone(), input.getMobilePhone(), input .getFaxNumber(), input.getPassword(), input.getProfession(), input.getAcceptTerms());
		// Check if user already exists
		UserDTO preExists = userService.getUserByEmail(user.getEmail()).orElse(null);
		if (preExists != null) {
			log.info("User already exists: " + preExists);
			return new Resource<>(preExists);
		}
        UserDTO newUser = null;
        log.info("Register User");
        if (user != null) {
			user.setScore("0");
			user.setAuthenticated(false);
			user.setVisible(true);
			user.setDefaultGroup("shortlist");
			newUser = userService.create(user)
					.orElse(null);
			// default_user.jpg
			newUser.setAvatar("default");
			// Check to see if Profile Name already exists
			String origProfileName;
			String profileName = origProfileName = user.getFirstName().toLowerCase()+"."+user.getLastName().toLowerCase();
			log.info(profileName);

			Optional<UserDTO> profileNameAlreadyExists = userService.getUserByProfileName(profileName);
			if(profileNameAlreadyExists.isPresent()) {
				int cnt = 1;
				while(profileNameAlreadyExists.isPresent()) {
					log.info("profile name already exists: "+ profileNameAlreadyExists.get().getProfileName());
					profileName = origProfileName + (cnt++);
					profileNameAlreadyExists = userService.getUserByProfileName(profileName);
				}
			}
			newUser.setProfileName(profileName);
			log.info("New User: " + newUser);
			newUser = userService.update(newUser).get();
			newUser.setScore("-1");

			// send validation email
			String reason = "Welcome to Latch";
			String htmlText = "";
			UserDTO toUser = newUser;
			String jwtToken = tokenHandler.createTokenForUser(toUser.getEmail());
			if (!toUser.getFirstName().equals("")) {
				htmlText = 	"<p>Dear "+ toUser.getFirstName() + ",</p>";
			}
			htmlText = htmlText + "<p>Congratulations! You are on your way to Introduce and Refer service professionals with confidence. ";
			htmlText = htmlText + " <a href=\"https://thereferralportal.com/authenticate/"+jwtToken+"\">Click here</a> to authenticate your account.</p><p>Sincerely,</p><p>The Latch Team.</p>";
			String text = this.html2text(htmlText);
			String subject = "Welcome to Latch";
			CommunicationDTO newComm = this.buildNotification(reason, toUser, toUser, htmlText, text, subject);
			this.communicationService.sendCommunication(newComm);
        }
		return new Resource<>(newUser);
    }

	private UserDTO registerNewUser(UserDTO user) {
		UserDTO newUser;
		user.setEmail(user.getEmail());
		user.setFirstName(user.getFirstName()==null?"":user.getFirstName());
		user.setLastName(user.getLastName() == null?"":user.getLastName());
		if (user.getProfession() != null) user.setProfession(user.getProfession());
		user.setPassword("");
		user.setScore("0");
		user.setAuthenticated(false);
		user.setVisible(false);
		user.setDefaultGroup("shortlist");
		newUser = userService.create(user)
				.orElse(null);
		// default_user.jpg
		newUser.setAvatar("default");
		// Check to see if Profile Name already exists
		String profileName;
		if (user.getFirstName().equals("") || user.getLastName().equals("")) {
			profileName = "";
		} else {
			profileName = user.getFirstName().toLowerCase() + "." + user.getLastName().toLowerCase();
			Optional<UserDTO> profileNameAlreadyExists = userService.getUserByProfileName(profileName);
			log.info("Does profile name exist: " + profileNameAlreadyExists.isPresent());
			log.info(profileNameAlreadyExists.toString());
			int count = 0;
			if (profileNameAlreadyExists.isPresent() && profileNameAlreadyExists.get().getId() != null) {
				log.info(profileNameAlreadyExists.toString());
				while (profileNameAlreadyExists.isPresent() && profileNameAlreadyExists.get().getId() != null) {
					profileNameAlreadyExists = userService.getUserByProfileName(profileName + count++);
					profileName = profileName + count++;
				}
			}
		}
		log.info(profileName);
		if (profileName.equals("")) {
			profileName = user.getEmail().substring(0, user.getEmail().indexOf("@"));
		} else {
			Optional<UserDTO> profileNameAlreadyExists = userService.getUserByProfileName(profileName);
			log.info("Does profile name exist: " + profileNameAlreadyExists.isPresent());
			log.info(profileNameAlreadyExists.toString());
			int count = 0;
			if (profileNameAlreadyExists.isPresent() && profileNameAlreadyExists.get().getId() != null) {
				log.info(profileNameAlreadyExists.toString());
				while (profileNameAlreadyExists.isPresent() && profileNameAlreadyExists.get().getId() != null) {
					profileNameAlreadyExists = userService.getUserByProfileName(profileName + count++);
					profileName = profileName + count++;
				}
			}
		}
		newUser.setProfileName(profileName);
		log.info("New User: " + newUser);
		newUser = userService.update(newUser).get();
		return newUser;
	}

	private void sendNewUserEmail(UserDTO fromUser, UserDTO toUser) {
		String reason = "A new way to communicate between professionals";
		String htmlText = "";
		String jwtToken = tokenHandler.createTokenForUser(toUser.getEmail());
		if (!toUser.getFirstName().equals("")) {
			htmlText = 	"<p>Dear "+ toUser.getFirstName() + ",</p>";
		}
		htmlText = htmlText + "<p>Congratulations! you have been invited by <strong>" + fromUser.getFirstName() + " " + fromUser.getLastName() + "</strong> to join";
		htmlText = htmlText + " the premier network of real estate and home services professionals.";
		htmlText = htmlText + " <a href=\"https://thereferralportal.com/authenticate/"+jwtToken+"\">Click here</a> to authenticate your account.</p><p>Sincerely,</p><p>The Latch Team.</p>";
		String text = this.html2text(htmlText);
		String subject = "Welcome to Latch";
		CommunicationDTO newComm = this.buildNotification(reason, toUser, fromUser, htmlText, text, subject);
		this.communicationService.sendCommunication(newComm);
	}

	private void sendNewUserEmailwoPassword(UserDTO fromUser, UserDTO toUser) {
		String reason = "A new way to communicate between professionals";
		String htmlText = "";
		String jwtToken = tokenHandler.createTokenForUser(toUser.getEmail());
		if (!toUser.getFirstName().equals("")) {
			htmlText = 	"<p>Dear "+ toUser.getFirstName() + ",</p>";
		}
		htmlText = htmlText + "<p>Congratulations! you have been invited by <strong>" + fromUser.getFirstName() + " " + fromUser.getLastName() + "</strong> to join";
		htmlText = htmlText + " the premier network of real estate and home services professionals.";
		htmlText = htmlText + " <a href=\"https://thereferralportal.com/authenticate/"+jwtToken+"\">Click here</a> to authenticate your account. Then you will be able to confirm your credentials</p><p>Sincerely,</p><p>The Latch Team.</p>";
		String text = this.html2text(htmlText);
		String subject = "Welcome to Latch";
		CommunicationDTO newComm = this.buildNotification(reason, toUser, fromUser, htmlText, text, subject);
		this.communicationService.sendCommunication(newComm);
	}

	private void sendImportResultEmail(UserDTO user, ArrayList<UserDTO> users) {
		String reason = "You imported <strong>" + users.size() + "</strong> new contact(s)";
		String htmlText = "";

		if (!user.getFirstName().equals("")) {
			htmlText = 	"<p>Dear "+ user.getFirstName() + ",</p>";
		}
		htmlText = htmlText + "<p><strong>Congratulations!</strong> Your new contacts were added successfully.  You imported <strong>" + users.size() + "</strong> new contact(s), and they were added to your private Network.<p>";
		if (users.size() > 0) {
			htmlText = htmlText + "<p>Your new contacts: <br />";
			for (UserDTO u:users){
				htmlText = htmlText + "- " + u.getFirstName() + " " + u.getLastName() + " (" + u.getEmail() + ")<br />";
			}
			htmlText = htmlText + "</p>";
		}
		htmlText = htmlText + "<p>If you don't see all your contacts, either they had an incorrectly formatted email address or they were lacking a full name.</p><p>Sincerely,</p><p>The Latch Team.</p>";
		String text = this.html2text(htmlText);
		String subject = "Your Import results";
		CommunicationDTO newComm = this.buildNotification(reason, user, user, htmlText, text, subject);
		this.communicationService.sendCommunication(newComm);
	}

	private CommunicationDTO buildNotification(String reason, UserDTO toUser, UserDTO fromUser, String mainText, String text, String subject) {
		CommunicationDTO commDTO = new CommunicationDTO();
		String htmlText = this.latchinline;
		htmlText = htmlText.replaceAll("%%reason text%%", reason);
		htmlText = htmlText.replaceAll("%%includeMessage%%", mainText);
		log.info("htmlText: " + htmlText);
		commDTO.setFromContactType("Professional");
		commDTO.setToContactType("Professional");
		commDTO.setTransactionType("Notification");
		commDTO.setStatus("System");
		commDTO.setNote(reason);
		commDTO.setNoteSwitch(true);
		commDTO.setSubject(subject);
		commDTO.setHtmlText(htmlText);
		commDTO.setText(text);
		commDTO.setToUserId(toUser.getId());
		commDTO.setFromUserId(fromUser.getId());
		commDTO.setInlineAssetIds(new String[] {"b101469c-885b-4139-bace-0b815bfc02db"});
		log.info(commDTO.toString());
		return commDTO;
	}

	@RequestMapping(value = "/importContacts", method = RequestMethod.POST)
	public Resource<Contacts> importContacts(@RequestBody Contacts input) throws Exception {
        Contacts contacts = new Contacts();
        log.info("Import Contacts");
        log.info(input.toString());
		Collection<UserDTO> users;
		users = input.getContacts();
		int imports = 0;
        for (UserDTO user: users) {
            String[] names = user.getFirstName().split(" ");
            user.setFirstName(names[0]);
            if (names.length > 1) user.setLastName(names[names.length - 1]);
			//Register the user
			UserDTO preExists = userService.getUserByEmail(user.getEmail()).orElse(null);
			if (preExists != null) {
				log.info("User already exists: " + preExists);
			} else {
				this.registerNewUser(user);
				imports++;
			}
        }
		contacts.setImports(imports);
        contacts.setContacts(users);
        contacts.setId(input.getId());
        contacts.setMessage(input.getMessage());
        log.info(contacts.toString());

        //TODO: Register Users (check that they don't exist) and create registration keys that will be included in the message mailed.
        //TODO:  return number of Users register (drop users from the list that already exist) and add them to the private Network. ??

        return new Resource<>(contacts);
    }

	// Using Social Inviter tool
	@RequestMapping(value = "/importContacts2", method = RequestMethod.POST)
	public Resource<Contacts> importContacts2(@RequestBody Contacts input) throws Exception {
		Contacts contacts = new Contacts();
		log.info("Import Contacts from: " + input.getService());
		log.info(input.toString());
		UserDTO fromUser = this.userService.getUserById(input.getId().toString()).get();
		NetworkDTO network = userService.getMyNetwork(fromUser).get();
		Collection<UserDTO> users;
		users = input.getContacts();
		ArrayList<UserDTO> newUsers = new ArrayList<>();
		ArrayList<UserDTO> preExistUsers = new ArrayList<>();
		int imports = 0;
		for (UserDTO user: users) {
			String[] names = user.getFirstName().split(" ");
			user.setFirstName(names[0]);
			if (names.length > 1) user.setLastName(names[names.length - 1]);
			//Register the user
			UserDTO preExists = userService.getUserByEmail(user.getEmail()).orElse(null);
			if (preExists != null) {
				log.info("User already exists: " + preExists);
				preExistUsers.add(preExists);
				// Save additional info in userNotes table
				user.setId(preExists.getId());
				this.saveUserNote(input.getId(), user, input.getService());
			} else {
				String sendInvite = user.getInvitation();
				log.info("Register New User: " + user);

				UserDTO importUser = new UserDTO();
				importUser.setProfession(user.getProfession());
				importUser.setBusinessName(user.getBusinessName());
				importUser.setBusinessAddress1(user.getBusinessAddress1());
				importUser.setBusinessAddress2(user.getBusinessAddress2());
				importUser.setBusinessCity(user.getBusinessCity());
				importUser.setBusinessState(user.getBusinessState());
				importUser.setBusinessZip(user.getBusinessZip());
				importUser.setMobilePhone(user.getMobilePhone());
				importUser.setFaxNumber(user.getFaxNumber());

				user.setProfession("");
				user.setBusinessName("");
				user.setBusinessAddress1("");
				user.setBusinessAddress2("");
				user.setBusinessCity("");
				user.setBusinessState("");
				user.setBusinessZip("");
				user.setMobilePhone("");
				user.setFaxNumber("");
				UserDTO newUser = this.registerNewUser(user);
				log.info("Brand new  user: " + user);
				// Save additional info in userNotes table
				importUser.setId(newUser.getId());
				this.saveUserNote(input.getId(), importUser, input.getService());

				if (sendInvite.equals("true")) {
					log.info("Send invitation " + newUser);
					this.sendNewUserEmailwoPassword(fromUser, newUser);
				}
				imports++;
				newUsers.add(newUser);
			}
		}
		if (preExistUsers.size() > 0) {
			this.networkService.addMembers(network, preExistUsers);
		}
		if (newUsers.size() > 0) {
			this.networkService.addMembers(network, newUsers);
		}

		contacts.setImports(imports);
		contacts.setContacts(newUsers);
		contacts.setId(input.getId());
		contacts.setMessage(input.getMessage());
		log.info(contacts.toString());
		if (newUsers.size() > 0) {
			this.sendImportResultEmail(fromUser, newUsers);
		}

		return new Resource<>(contacts);
	}

	private void saveUserNote(String id, UserDTO data, String service) {
		Optional<UserNoteDTO> optional = userNoteService.getByOwnerIdAndTargetId(id, data.getId());
		log.info("Current Note: " + optional);
		if (optional.isPresent() && optional.get().getId() != null) {
			UserNoteDTO userNote = optional.get();
			userNote.setProfession(data.getProfession());
			userNote.setBusinessName(data.getBusinessName());
			userNote.setBusinessAddress1(data.getBusinessAddress1());
			userNote.setBusinessAddress2(data.getBusinessAddress2());
			userNote.setBusinessCity(data.getBusinessCity());
			userNote.setBusinessState(data.getBusinessState());
			userNote.setBusinessZip(data.getBusinessZip());
			userNote.setMobilePhone(data.getMobilePhone());
			userNote.setFaxNumber(data.getFaxNumber());
			userNoteService.update(userNote);
		} else {
			UserNoteDTO userNote = new UserNoteDTO();
			userNote.setOwnerUserId(id);
			userNote.setTargetUserId(data.getId());
			userNote.setContent(service);
			userNote.setProfession(data.getProfession());
			userNote.setBusinessName(data.getBusinessName());
			userNote.setBusinessAddress1(data.getBusinessAddress1());
			userNote.setBusinessAddress2(data.getBusinessAddress2());
			userNote.setBusinessCity(data.getBusinessCity());
			userNote.setBusinessState(data.getBusinessState());
			userNote.setBusinessZip(data.getBusinessZip());
			userNote.setMobilePhone(data.getMobilePhone());
			userNote.setFaxNumber(data.getFaxNumber());
			userNoteService.create(userNote);
		}
	}

	@RequestMapping(value = "/createNewContact", method = RequestMethod.POST)
	public Resource<UserDTO> createNewContact(@RequestBody Contacts input) throws Exception {
		Contacts contacts = new Contacts();
		log.info("Import Contacts from: " + input.getService());
		log.info(input.toString());
		UserDTO fromUser = this.userService.getUserById(input.getId().toString()).get();
		NetworkDTO network = userService.getMyNetwork(fromUser).get();
		Collection<UserDTO> users;
		ArrayList<UserDTO> newUsers = new ArrayList<>();
		users = input.getContacts();
		int imports = 0;
		// return first on the list
		UserDTO newUser = new UserDTO();
		for (UserDTO user: users) {
			user.setFirstName(user.getFirstName());
			user.setLastName(user.getLastName());
			//Register the user
			UserDTO preExists = userService.getUserByEmail(user.getEmail()).orElse(null);
			if (preExists != null) {
				log.info("User already exists: " + preExists);
				newUser = preExists;
			} else {
				String sendInvite = user.getInvitation();
				log.info("Register New User: " + user);
				user = this.registerNewUser(user);
				log.info("Brand new user: " + user);
				if (sendInvite.equals("true")) {
					this.sendNewUserEmailwoPassword(fromUser, user);
				}
				imports++;
				newUser = user;
				newUsers.add(user);
			}
		}
		log.info("createNewContact:addMembers: " + newUsers.toString());
		this.networkService.addMembers(network, newUsers);
		contacts.setImports(imports);
		contacts.setContacts(users);
		contacts.setId(input.getId());
		contacts.setMessage(input.getMessage());
		log.info(contacts.toString());

		return new Resource<>(newUser);
	}

	@RequestMapping(value = "/getGroupsList", method = RequestMethod.POST)
	public PagedResources<TagDTO> getGroupsList(@RequestBody String userId) {
		log.info("Get GroupsList: " + userId.substring(7, userId.length()));
		String id = userId.substring(7,userId.length());

		PagedResources<TagDTO> tags = tagService.findMyUserTags(id, 0, 999, "id,asc");

		if (tags == null) {
			return null;
		}

		return tags;
	}

	@RequestMapping(value = "/getGroupList", method = RequestMethod.POST)
	public PagedResources<UserDTO> getGroupList(@RequestBody String groupId) {
		log.info("Get GroupList: " + groupId.substring(8, groupId.length()));
		String id = groupId.substring(8, groupId.length());


		List<String> ids = new ArrayList<>();
		ids.add(id);
		PagedResources<UserDTO> users = tagService.findUsersByTagIds(ids, 0, 999, "id,desc");

		if (users == null) {
			return null;
		}

		return users;
	}

	@RequestMapping(value = "/getNetworkList", method = RequestMethod.POST)
	public Resource<RequestDTO> getNetworkList(@RequestBody RequestDTO input) throws Exception {
		log.info("Get Networks list for user: " + input.getId());
		String id = input.getId();
		UserDTO user = userService.getUserById(id).get();
		//Set Groups info
		Resources<NetworkDTO> networks = userService.getNetworksOwned(user, 0, 99, "");
		if (networks != null) {
			input.setNetworkList(networks.getContent());
		}

		return new Resource<>(input);
	}

	@RequestMapping(value = "/getGroupTagsList", method = RequestMethod.POST)
	public Resource<RequestDTO> getGroupTagsList(@RequestBody RequestDTO input) throws Exception {
		log.info("Get Tags list for user: " + input.getId());
		String id = input.getId();

		//Set Groups info
		PagedResources<TagDTO> tags = tagService.findMyUserTags(id, 0, 999, "id,asc");
		if (tags != null) {
			input.setGroupList(tags.getContent());
		}

		return new Resource<>(input);
	}

	private RequestDTO addUserToGroup(RequestDTO input, String groupId, UserDTO user) {
		if (groupId.equals("shortlist")) {
			log.info("addUserToGroup: " + input.toString());
			boolean exists = false;
			for (UserDTO u: input.getUsers()) {
				if (this.userService.userExistsInShortlist(user, u.getId())) {
					exists = true;
				}
			}
			if (exists) {
				input.setError("One or more contacts you are trying to add to your Shortlist are already included.");
			}
			userService.addUserToShortlist(user, input.getUsers());
			// add users to my-network as well.
			NetworkDTO network = this.userService.getMyNetwork(user).get();
			this.networkService.addMembers(network, input.getUsers());
		} else if (groupId.equals("defaultGroup")) {
			List<String> ids = new ArrayList<>();
			boolean exists = false;
			for (UserDTO u : input.getUsers()) {
				ids.add(u.getId());
				log.info("User to add exists: " + this.tagService.userExistsWithTag(u.getId(), user.getDefaultGroup()));
				if (this.tagService.userExistsWithTag(u.getId(), user.getDefaultGroup())) {
					exists = true;
				}
			}
			if (exists) {
				input.setError("One or more contacts you are trying to add to your Group are already included.");
			}
			List<String> tags = new ArrayList<>();
			tags.add(user.getDefaultGroup());
			this.tagService.applyTagsToUsers(tags, ids);
		} else if (groupId.equals("my-network")) {
			NetworkDTO network = this.userService.getMyNetwork(user).get();
			Collection<UserDTO> users = input.getUsers();
			this.networkService.addMembers(network, users);
		} else {
			List<String> ids = new ArrayList<>();
			boolean exists = false;
			for (UserDTO u : input.getUsers()) {
				ids.add(u.getId());
				log.info("User to add exists: " + this.tagService.userExistsWithTag(u.getId(), user.getDefaultGroup()));
				if (this.tagService.userExistsWithTag(u.getId(), user.getDefaultGroup())) {
					exists = true;
				}
			}
			if (exists) {
				input.setError("One or more contacts you are trying to add to your Group are already included.");
			}
			List<String> tags = new ArrayList<>();
			tags.add(groupId);
			this.tagService.applyTagsToUsers(tags, ids);
		}
		return input;
	}

	@RequestMapping(value = "/addToShortList", method = RequestMethod.POST)
	public Resource<RequestDTO> addToShortList(@RequestBody RequestDTO input) throws Exception {
		log.info("Add User to Shortlist / Group / Network");
		log.info(input.toString());

		UserDTO user = userService.getUserById(input.getId()).get();
		String groupId = input.getGroupId();

		input = this.addUserToGroup(input, groupId, user);

		Collection<UserDTO> users;
		if (groupId.equals("shortlist")) {
			users = userService.getShortlist(user).getContent();
			input.setUsers(users);
			input.setGroupId(groupId);
			input.setGroupName(groupId);
		} else if (groupId.equals("my-network")) {
			NetworkDTO network = userService.getMyNetwork(user).get();
			users = networkService.getMembers(network.getId(), 0, 999, "").getContent();
			input.setUsers(users);
			input.setGroupId(groupId);
			input.setGroupName(groupId);
		} else if (groupId.equals("defaultGroup")) {
			List<String> tags = new ArrayList<>();
			tags.add(groupId);
			users = tagService.findUsersByTagIds(tags, 0, 999, "id,desc").getContent();
			input.setUsers(users);
			TagDTO tag = tagService.findTagById(user.getDefaultGroup());
			input.setGroupId(tag.getId());
			input.setGroupName(tag.getName());
		} else {
			List<String> tags = new ArrayList<>();
			tags.add(groupId);
			users = tagService.findUsersByTagIds(tags, 0, 999, "id,desc").getContent();
			input.setUsers(users);
			TagDTO tag = tagService.findTagById(groupId);
			input.setGroupId(tag.getId());
			input.setGroupName(tag.getName());
		}

		//Set Groups info
		PagedResources<TagDTO> tags = tagService.findMyUserTags(input.getId(), 0, 999, "id,asc");
		input.setGroupList(tags.getContent());

		return new Resource<>(input);
	}

	@RequestMapping(value = "/createNewGroup", method = RequestMethod.POST)
	public Resource<RequestDTO> createNewGroup(@RequestBody RequestDTO input) throws Exception {
		log.info("Create new Group / Tag");
		log.info(input.toString());

		UserDTO user = userService.getUserById(input.getId().toString()).get();
		String groupName = input.getGroupName();

		// TODO: Check that tag doesn't exist for this user and that is not "shortlist"
		TagDTO tag = tagService.createUserTag(user.getId(), groupName);

		List<String> newTag = new ArrayList<>();
		newTag.add(tag.getId());
		Collection<UserDTO> users = tagService.findUsersByTagIds(newTag, 0, 999, "id,desc").getContent();
		input.setUsers(users);
		input.setGroupId(tag.getId());
		input.setGroupName(tag.getName());

		//Set new group as default group
		user.setDefaultGroup(tag.getId());
		this.userService.update(user);

		//Set Groups info
		PagedResources<TagDTO> tags = tagService.findMyUserTags(input.getId(), 0, 999, "id,asc");
		input.setGroupList(tags.getContent());

		return new Resource<>(input);
	}

	@RequestMapping(value = "/deleteGroup", method = RequestMethod.POST)
	public Resource<RequestDTO> deleteGroup(@RequestBody RequestDTO input) throws Exception {
		log.info("Delete Group / Tag");
		log.info(input.toString());

		UserDTO user = userService.getUserById(input.getId()).get();
		String groupId = input.getGroupId();

		List<String> tags = new ArrayList<>();
		tags.add(groupId);
		Collection<UserDTO> users = tagService.findUsersByTagIds(tags, 0, 999, "id,desc").getContent();
		List<String> ids = new ArrayList<>();
		for (UserDTO u : users) {
			ids.add(u.getId());
		}
		this.tagService.removeTagsFromUsers(tags, ids);
		this.tagService.deleteTag(groupId);

		// Return shortlist and set it as default group
		user.setDefaultGroup("shortlist");
		this.userService.update(user);
		Collection<UserDTO> slUsers = userService.getShortlist(user).getContent();
		input.setUsers(slUsers);
		input.setGroupId("shortlist");
		input.setGroupName("shortlist");

		//Set Groups info
		PagedResources<TagDTO> existingTags = tagService.findMyUserTags(input.getId(), 0, 999, "id,asc");
		input.setGroupList(existingTags.getContent());

		return new Resource<>(input);
	}

	private void removeUserFromGroup(String groupId, RequestDTO input, UserDTO user) {
		if (groupId.equals("shortlist")) {
			for (UserDTO u : input.getUsers()) {
				userService.removeUserFromShortlist(user, u);
			}
		} else if (groupId.equals("my-network")) {
			NetworkDTO network = userService.getMyNetwork(user).get();
			for (UserDTO u : input.getUsers()) {
				networkService.leaveNetwork(network, u);
			}
		} else {
			List<String> ids = new ArrayList<>();
			for (UserDTO u : input.getUsers()) {
				ids.add(u.getId());
			}
			List<String> tags = new ArrayList<>();
			tags.add(groupId);
			this.tagService.removeTagsFromUsers(tags, ids);
		}
	}

	@RequestMapping(value = "/removeFromShortList", method = RequestMethod.POST)
	public Resource<RequestDTO> removeFromShortList(@RequestBody RequestDTO input) throws Exception {
		log.info("Remove User to Shortlist / Group / My Network");
		log.info(input.toString());

		UserDTO user = userService.getUserById(input.getId()).get();
		String groupId = input.getGroupId();

		this.removeUserFromGroup(groupId, input, user);

		Collection<UserDTO> users;
		if (groupId.equals("shortlist")) {
			users = userService.getShortlist(user).getContent();
			input.setUsers(users);
			input.setGroupId(groupId);
			input.setGroupName(groupId);
		} else {
			List<String> tags = new ArrayList<>();
			tags.add(groupId);
			users = tagService.findUsersByTagIds(tags, 0, 999, "id,desc").getContent();
			input.setUsers(users);
			TagDTO tag = tagService.findTagById(groupId);
			input.setGroupId(tag.getId());
			input.setGroupName(tag.getName());
		}

		//Set Groups info
		PagedResources<TagDTO> tags = tagService.findMyUserTags(input.getId(), 0, 999, "id,asc");
		input.setGroupList(tags.getContent());

		return new Resource<>(input);
	}

	@RequestMapping(value = "/handleNetworkChangeView", method = RequestMethod.POST)
	public Resource<RequestDTO> handleNetworkChangeView(@RequestBody RequestDTO input) throws Exception {
		log.info("Group Change: " + input.getGroupId());
		log.info(input.toString());
		String id = input.getId();
		String groupId = input.getGroupId();
		UserDTO user = userService.getUserById(id).get();

		Collection<UserDTO> users;
		if (groupId.equals("my-network")) {
			NetworkDTO network = userService.getMyNetwork(user).get();
			users = networkService.getMembers(network.getId(), 0, 999, "").getContent();
			input.setUsers(users);
			input.setGroupId(groupId);
			input.setGroupName(groupId);
			log.info("Group Change: my-network: " + users.size());
		} else if (groupId.equals("shortlist")) {
			users = userService.getShortlist(user).getContent();
			input.setUsers(users);
			input.setGroupId(groupId);
			input.setGroupName(groupId);
			log.info("Group Change: shortlist: " + users.size());
		} else {
			List<String> ids = new ArrayList<>();
			ids.add(groupId);
			users = tagService.findUsersByTagIds(ids, 0, 999, "id,desc").getContent();
			input.setUsers(users);
			TagDTO tag = tagService.findTagById(groupId);
			input.setGroupId(tag.getId());
			input.setGroupName(tag.getName());
			log.info("Group Change: "+ ids + ": " + users.size());
		}

		//Set Groups info
		PagedResources<TagDTO> tags = tagService.findMyUserTags(input.getId(), 0, 999, "id,asc");
		input.setGroupList(tags.getContent());

		return new Resource<>(input);
	}

	@RequestMapping(value = "/handleGroupChange", method = RequestMethod.POST)
	public Resource<RequestDTO> handleGroupChange(@RequestBody RequestDTO input) throws Exception {
		log.info("Group Change: " + input.getGroupId());
		String id = input.getId();
		String groupId = input.getGroupId();
		UserDTO user = userService.getUserById(id).get();
		user.setDefaultGroup(groupId);
		log.info(user.toString());
		this.userService.update(user);

		Collection<UserDTO> users;
		if (groupId.equals("shortlist")) {
			users = userService.getShortlist(user).getContent();
			input.setUsers(users);
			input.setGroupId(user.getDefaultGroup());
			input.setGroupName(user.getDefaultGroup());
		} else {
			List<String> ids = new ArrayList<>();
			ids.add(user.getDefaultGroup());
			users = tagService.findUsersByTagIds(ids, 0, 999, "id,desc").getContent();
			input.setUsers(users);
			TagDTO tag = tagService.findTagById(user.getDefaultGroup());
			input.setGroupId(tag.getId());
			input.setGroupName(tag.getName());
		}

		//Set Groups info
		PagedResources<TagDTO> tags = tagService.findMyUserTags(input.getId(), 0, 999, "id,asc");
		input.setGroupList(tags.getContent());

		if (users == null) {
			return new Resource<>(null);
		}

		return new Resource<>(input);
	}

	@RequestMapping(value = "/getDefaultGroup", method = RequestMethod.POST)
	public Resource<RequestDTO> getDefaultGroup(@RequestBody RequestDTO input) throws Exception {
		log.info("Get Default Group for user: " + input.getId());
		String id = input.getId();
		UserDTO user = userService.getUserById(id).get();

		Collection<UserDTO> users;
		if (user.getDefaultGroup() == null || user.getDefaultGroup().equals("shortlist")) {
			users = userService.getShortlist(user).getContent();
			input.setUsers(users);
			input.setGroupId(user.getDefaultGroup());
			input.setGroupName(user.getDefaultGroup());
		} else {
			List<String> ids = new ArrayList<>();
			ids.add(user.getDefaultGroup());
			users = tagService.findUsersByTagIds(ids, 0, 999, "id,desc").getContent();
			input.setUsers(users);
			TagDTO tag = tagService.findTagById(user.getDefaultGroup());
			input.setGroupId(tag.getId());
			input.setGroupName(tag.getName());
		}

		//Set Groups info
		PagedResources<TagDTO> tags = tagService.findMyUserTags(input.getId(), 0, 999, "id,asc");
		if (tags != null) {
			input.setGroupList(tags.getContent());
		}

		if (users == null) {
			return new Resource<>(null);
		}

		return new Resource<>(input);
	}

    @RequestMapping(value = "/getShortList", method = RequestMethod.POST)
    public Resources<UserDTO> getShortList(@RequestBody String userId) {
        log.info("Get ShortList: " + userId.substring(7, userId.length()));
        String id = userId.substring(7,userId.length());

        UserDTO user = userService.getUserById(id).get();

        Resources<UserDTO> users = userService.getShortlist(user);

        if (users == null) {
            return new Resources<>(null);
        }

        return new Resources<>(users);
    }

	@RequestMapping(value = "/getGroup", method = RequestMethod.POST)
	public Resource<RequestDTO> getGroup(@RequestBody RequestDTO input) throws Exception {
		log.info("Get Group " + input.getGroupId() + " for user: " + input.getId());
		String id = input.getId();
		UserDTO user = userService.getUserById(id).get();
		String groupId = input.getGroupId();

		Collection<UserDTO> users;
		if (groupId == null) {
			return new Resource<>(new RequestDTO());
		}

		if (groupId.equals("shortlist")) {
			users = userService.getShortlist(user).getContent();
			input.setUsers(users);
			input.setGroupId(user.getDefaultGroup());
			input.setGroupName(user.getDefaultGroup());
			input.setUser(user);
		} else {
			List<String> ids = new ArrayList<>();
			ids.add(groupId);
			users = tagService.findUsersByTagIds(ids, 0, 999, "id,desc").getContent();
			input.setUsers(users);
			TagDTO tag = tagService.findTagById(groupId);
			input.setGroupId(tag.getId());
			input.setGroupName(tag.getName());
			input.setUser(user);
		}


		if (users == null) {
			return new Resource<>(new RequestDTO());
		}

		return new Resource<>(input);
	}

	@RequestMapping(value = "/getShortListWithOwner", method = RequestMethod.POST)
	public Resource<Network> getShortListWithOwner(@RequestBody String userId) {
		log.info("Get ShortList: " + userId.substring(7, userId.length()));
		String id = userId.substring(7,userId.length());

		UserDTO user = userService.getUserById(id).get();

		Resources<UserDTO> users = userService.getShortlist(user);

		if (users == null) {
			return new Resource<>(null);
		}

		Network shortlist = new Network();
		shortlist.setChildren(users);
		shortlist.setUser(user);

		return new Resource<>(shortlist);
	}

	@RequestMapping(value = "/getMyNetworkWithOwner", method = RequestMethod.POST)
	public Resource<Network> getMyNetworkWithOwner(@RequestBody String userId) {
		log.info("Get MyNetwork: " + userId.substring(7, userId.length()));
		String id = userId.substring(7,userId.length());

		UserDTO user = userService.getUserById(id).get();
		NetworkDTO network = userService.getMyNetwork(user).get();
		Resources<UserDTO> users = networkService.getMembers(network.getId(), 0, 999, "");

		if (users == null) {
			return new Resource<>(null);
		}

		Network myNetwork = new Network();
		myNetwork.setChildren(users);
		myNetwork.setUser(user);

		return new Resource<>(myNetwork);
	}

	@RequestMapping(value = "/beforeSendMessage", method = RequestMethod.POST)
	 public Resource<RequestDTO> beforeSendMessage(@RequestBody RequestDTO input) throws Exception {
		RequestDTO request = new RequestDTO();
		log.info("beforeSendMessage to contacts");
		request.setId(input.getId());
		request.setIntroId(input.getIntroId());
		log.info(request.toString());

		UserDTO user = userService.getUserById(request.getId()).get();
		request.setUser(user);
		UserDTO profile = userService.getUserById(request.getIntroId()).get();
		ArrayList<UserDTO> users = new ArrayList<>();
		users.add(profile);
		request.setUsers(users);
		log.info(request.toString());

		return new Resource<>(request);
	}

	@RequestMapping(value = "/beforeSendMessageToGroup", method = RequestMethod.POST)
	public Resource<RequestDTO> beforeSendMessageToGroup(@RequestBody RequestDTO input) throws Exception {
		log.info("beforeSendMessage to group");
		log.info(input.toString());

		UserDTO user = userService.getUserById(input.getId()).get();
		input.setUser(user);
		if (input.getGroupId().equals("shortlist")) {
			Collection<UserDTO> users = this.userService.getShortlist(user).getContent();
			input.setUsers(users);
		} else {
			ArrayList<String> tags = new ArrayList<>();
			tags.add(input.getGroupId());
			Collection<UserDTO> users = tagService.findUsersByTagIds(tags, 0, 999, "id,desc").getContent();
			input.setUsers(users);
		}

		return new Resource<>(input);
	}

	@RequestMapping(value = "/beforeReplyToGroupMessage", method = RequestMethod.POST)
	public Resource<RequestDTO> beforeReplyToGroupMessage(@RequestBody RequestDTO input) throws Exception {
		RequestDTO request = new RequestDTO();
		log.info("beforeReplyTGroupMessage to contacts");
		log.info(input.toString());
		request.setId(input.getId());
		request.setFromUserId(input.getFromUserId());
		request.setCommId(input.getCommId());
		request.setGroupId(input.getGroupId());

		UserDTO user = userService.getUserById(request.getId()).get();
		request.setUser(user);
		UserDTO fromUser = userService.getUserById(request.getFromUserId()).get();
		request.setFromUser(fromUser);
		if (input.getGroupId().equals("shortlist")) {
			Collection<UserDTO> users = this.userService.getShortlist(user).getContent();
			request.setUsers(users);
		} else {
			ArrayList<String> tags = new ArrayList<>();
			tags.add(input.getGroupId());
			log.info("Tags: " + tags.toString());
			Collection<UserDTO> users = tagService.findUsersByTagIds(tags, 0, 999, "id,desc").getContent();
			request.setUsers(users);
		}
		log.info(request.toString());
		CommunicationDTO comm = this.communicationService.getCommunicationsById(request.getCommId());
		String message = comm.getHtmlText();
		message = message.substring(message.indexOf("<table id=\"includeMessage\""), message.indexOf("<p id=\"endOfIncludeMessage\"") - 26);
		Whitelist wl = Whitelist.basicWithImages();
		//wl.addTags("div", "span", "p", "table", "td", "tr"); // add additional tags here as necessary
		String clean = Jsoup.clean(message, wl);
		clean = clean.replaceAll("cid:", "/api/remoteFiles/view/");
		// Remove empty tags
		Document doc = Jsoup.parse(clean);
		for (Element element : doc.select("*")) {
			if (!element.hasText() && element.isBlock()) {
				element.remove();
			}
		}
		clean = doc.body().html();
		// Add > to every tag for history message
		clean = clean.replaceAll("<p>", "<p>>");
		clean = clean.replaceAll("<br>", "<br>>");
		comm.setHtmlText(clean);
		// if it is a referral remove first paragraph
		if (comm.getTransactionType().equals("Referral")) {
			clean = clean.substring(clean.indexOf("</p>") + 4, clean.length());
			comm.setHtmlText(clean);
		}
		comm.setSubject(">" + comm.getSubject());
		request.setCommunication(comm);
		request.setCancelUrl(getCancelUrlForCommunications(comm));

		return new Resource<>(request);
	}

	@RequestMapping(value = "/beforeReplyToMessage", method = RequestMethod.POST)
	public Resource<RequestDTO> beforeReplyToMessage(@RequestBody RequestDTO input) throws Exception {
		RequestDTO request = new RequestDTO();
		log.info("beforeReplyToMessage to contacts");
		log.info(input.toString());
		request.setId(input.getId());
		request.setFromUserId(input.getFromUserId());
		request.setCommId(input.getCommId());

		UserDTO user = userService.getUserById(request.getId()).get();
		request.setUser(user);
		UserDTO profile = userService.getUserById(request.getFromUserId()).get();
		ArrayList<UserDTO> users = new ArrayList<>();
		users.add(profile);
		request.setUsers(users);
		log.info(request.toString());
		CommunicationDTO comm = this.communicationService.getCommunicationsById(request.getCommId());
		String message = comm.getHtmlText();
		message = message.substring(message.indexOf("<table id=\"includeMessage\""), message.indexOf("<p id=\"endOfIncludeMessage\"") - 26);
		Whitelist wl = Whitelist.basicWithImages();
		//wl.addTags("div", "span", "p", "table", "td", "tr"); // add additional tags here as necessary
		String clean = Jsoup.clean(message, wl);
		clean = clean.replaceAll("cid:", "/api/remoteFiles/view/");
		// Remove empty tags
		Document doc = Jsoup.parse(clean);
		for (Element element : doc.select("*")) {
			if (!element.hasText() && element.isBlock()) {
				element.remove();
			}
		}
		clean = doc.body().html();
		// Add > to every tag for history message
		clean = clean.replaceAll("<p>", "<p>>");
		clean = clean.replaceAll("<br>", "<br>>");
		comm.setHtmlText(clean);
		// if it is a referral remove first paragraph
		if (comm.getTransactionType().equals("Referral")) {
			clean = clean.substring(clean.indexOf("</p>") + 4, clean.length());
			comm.setHtmlText(clean);
		}
		comm.setSubject(">" + comm.getSubject());
		request.setCommunication(comm);
		request.setCancelUrl(this.getCancelUrlForCommunications(comm));

		return new Resource<>(request);
	}

	private String getCancelUrlForCommunications(CommunicationDTO  comm) {
		if (comm.getTransactionType().equals("Referral")) {
			return "/referralRequest/"+comm.getId();
		} else if (comm.getTransactionType().equals("Introduction")) {
			return "/introductionRequest/"+comm.getId();
		} else if (comm.getTransactionType().equals("Communication")) {
			return "/message/"+comm.getId();
		}
		return "/home";
	}

	@RequestMapping(value = "/getReviewsForUser", method = RequestMethod.POST)
	public PagedResources<ReviewDTO> getReviewsForUser(@RequestBody RequestDTO input) {
		log.info("Get Reviews for User: " + input.getId());
		log.info(input.toString());
		int page = input.getPage();
		PagedResources<ReviewDTO> reviews = this.reviewService.findCompletedByReviewedUserId(input.getId().toString(), page, 10, "completeTime,desc");

		for (ReviewDTO review:reviews) {
			if (review.getReviewComments() != null && !review.getReviewComments().equals("")){
				review.setReviewer(this.userService.getUserById(review.getReviewerUserId()).get());
			}
		}

		if (reviews != null) {
			log.info("Fetch Reviews: " + reviews.getContent().size());
		}
		return  reviews;
	}

	@RequestMapping(value = "/submitReviewRequest", method = RequestMethod.POST)
	public Resource<ReviewDTO> submitReviewRequest(@RequestBody ReviewDTO input) throws Exception {
		log.info("Submitt Review Request");
		log.info(input.toString());

		try {
			if (input != null && input.getId() != null) {
				ReviewDTO review = reviewService.getReview(input.getId());

				if (review != null) {
					review.setNps(input.getNps());
					review.setOverallRating(input.getOverallRating());
					review.setOverallQualityOfService(input.getOverallQualityOfService());
					review.setTimelinessOfService(input.getTimelinessOfService());
					review.setReviewComments(input.getReviewComments());
					log.info("Review to submit: " + review);
					reviewService.submitReview(review);
					
					reminderService.unscheduleActionReminder(review.getCommunicationId());
				} else {
					return new Resource<>(input);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Error: Submit Review Request ", e.getMessage());
			return new Resource<>(input);
		}
		return new Resource<>(input);
	}

	@RequestMapping(value = "/scheduleReviewRequest", method = RequestMethod.POST)
	public Resource<RequestDTO> scheduleReviewRequest(@RequestBody RequestDTO input) throws Exception {
		log.info("Schedule Review Requests");
		log.info(input.toString());

		try {
			if (input != null) {
				UserDTO user = userService.getUserById(input.getId()).get();

				Collection<UserDTO> users = input.getUsers();
				if (users != null && users.size() > 0) {
					for (UserDTO u : users) {
						ReviewDTO review = new ReviewDTO();
						review.setReviewedUserId(user.getId());
						review.setReviewedUserRole("G");
						review.setReviewerUserId(u.getId());
						review.setReviewerUserRole("G");
						reviewService.requestReview(review, LocalDate.now());
					}
				} else {
					input.setError("Error: Couldn't schedule review request");
					return new Resource<>(input);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Error: ", e.getMessage());
			input.setError("Error: Couldn't schedule review request");
			return new Resource<>(input);
		}
		return new Resource<>(input);
	}

	@RequestMapping(value = "/removeUsersFromList", method = RequestMethod.POST)
	public Resource<RequestDTO> removeUsersFromList(@RequestBody RequestDTO input) throws Exception {
		log.info("Remove users from group: " + input.getGroupId());
		log.info(input.toString());

		try {
			if (input != null) {
				UserDTO user = userService.getUserById(input.getId()).get();
				this.removeUserFromGroup(input.getGroupId(), input, user);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Error: ", e.getMessage());
			input.setError("Error: Couldn't remove users from List");
			return new Resource<>(input);
		}
		return new Resource<>(input);
	}

	@RequestMapping(value = "/sendReviewRequest", method = RequestMethod.POST)
	public Resource<RequestDTO> sendReviewRequest(@RequestBody RequestDTO input) throws Exception {
		log.info("Send Review Request to contacts");
		log.info(input.toString());
		CommunicationDTO commDTO = new CommunicationDTO();
		try {
			if (input != null) {
				UserDTO user = userService.getUserById(input.getFromUserId()).get();
				String mainText = input.getHtmlText();
				String plainText = input.getText();
				log.info("mainText: " + mainText);
				String htmlText = this.basicinline;
				htmlText = htmlText.replaceAll("%%user fn%%", user.getFirstName() != null ? user.getFirstName() : "");
				htmlText = htmlText.replaceAll("%%user ln%%", user.getLastName() != null ? user.getLastName() : "");
				htmlText = htmlText.replaceAll("%%user phone%%", user.getPhone() != null ? user.getPhone() : "");
				htmlText = htmlText.replaceAll("%%user email%%", user.getEmail());
				htmlText = htmlText.replaceAll("%%includeMessage%%", mainText);
				log.info("htmlText: " + htmlText);
				commDTO.setFromContactType("Professional");
				commDTO.setToContactType("Professional");
				commDTO.setTransactionType("Review");
				commDTO.setStatus("New");

				//	commDTO.setSubjectUserId(input.getSubjectUserId());
				commDTO.setSubject(input.getSubject());
				//	commDTO.setHtmlText("<p>HTML version here</p><p><img src=\"cid:"+subjectUserId.getAvatar()+"\"></p>");
				commDTO.setHtmlText(htmlText);
				commDTO.setText(plainText);
				//	commDTO.setToUserId(input.getToUserId());
				commDTO.setFromUserId(input.getFromUserId());
				commDTO.setSubjectUserId(input.getFromUserId());
				commDTO.setAttachedAssetIds(input.getAttachedAssetIds());
				commDTO.setInlineAssetIds(new String[] {"b101469c-885b-4139-bace-0b815bfc02db", "c469ad83-ce7f-4037-aa01-3896c2e40d84", "7a3ecf13-c908-4512-971d-37327de25910"});
				//	commDTO.setInlineAssetIds(new String[] {subjectUserId.getAvatar()});
				// Save groupId if exists
				if (input.getGroupId() != null) {
					commDTO.setGroupId(input.getGroupId());
				}

				Collection<UserDTO> users = input.getUsers();
				if (users != null && users.size() > 0) {
					for (UserDTO u : users) {
						commDTO.setToUserId(u.getId());
						log.info(commDTO.toString());
						String reviewHTMLText;
						String reviewPlainText;
						if (u.getFirstName().equals("") || u.getFirstName() == null) {
							reviewHTMLText = htmlText.replace("[First Name]", "Sir or Madam");
							reviewPlainText = plainText.replace("[First Name]", "Sir or Madam");
						} else {
							reviewHTMLText = htmlText.replace("[First Name]", u.getFirstName());
							reviewPlainText = plainText.replace("[First Name]", u.getFirstName());
						}
						commDTO.setHtmlText(reviewHTMLText);
						commDTO.setText(reviewPlainText);
						// Create a review request and set the link in mainText
						ReviewDTO review = new ReviewDTO();
						review.setReviewedUserId(user.getId());
						review.setReviewedUserRole("G");
						review.setReviewerUserId(u.getId());
						review.setReviewedUserRole("G");
						reviewService.requestReview(review, LocalDate.now());

						mainText = mainText.replace("[Latch Link]", "<a href=\"https://thereferralportal.com/reviewRequest\">Latch Review Request</a>");
						plainText = plainText.replace("[Latch Link]", "<a href=\"https://thereferralportal.com/reviewRequest\">Latch Review Request</a>");

						communicationService.sendCommunication(commDTO);
						commDTO.setHtmlText(htmlText);
						commDTO.setText(plainText);

					}
				} else {
					input.setError("Error: Couldn't send message");
					return new Resource<>(input);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Error: ", e.getMessage());
			input.setError("Error: Couldn't send message");
			return new Resource<>(input);
		}
		return new Resource<>(input);
	}


	@RequestMapping(value = "/sendMessage", method = RequestMethod.POST)
	public Resource<RequestDTO> sendMessage(@RequestBody RequestDTO input) throws Exception {
		log.info("Send Message to contacts");
		log.info(input.toString());
		CommunicationDTO commDTO = new CommunicationDTO();
		try {
			if (input != null) {
				UserDTO user = userService.getUserById(input.getFromUserId()).get();
				//UserDTO toUserId = userService.getUserById(Long.parseLong(input.getToUserId())).get();  //contact2
				//UserDTO subjectUserId = toUserId;  //contact1
				String mainText = input.getHtmlText();
				String plainText = input.getText();
				log.info("mainText: " + mainText);
				String htmlText = this.basicinline;
				htmlText = htmlText.replaceAll("%%user fn%%", user.getFirstName() != null ? user.getFirstName() : "");
				htmlText = htmlText.replaceAll("%%user ln%%", user.getLastName() != null ? user.getLastName() : "");
				htmlText = htmlText.replaceAll("%%user phone%%", user.getPhone() != null ? user.getPhone() : "");
				htmlText = htmlText.replaceAll("%%user mobilePhone%%", user.getMobilePhone() != null ? user.getMobilePhone() : "");
				htmlText = htmlText.replaceAll("%%user faxNumber%%", user.getFaxNumber() != null ? user.getFaxNumber() : "");
				htmlText = htmlText.replaceAll("%%user email%%", user.getEmail());
				htmlText = htmlText.replaceAll("%%includeMessage%%", mainText);
				log.info("htmlText: " + htmlText);
				commDTO.setFromContactType("Professional");
				commDTO.setToContactType("Professional");
				commDTO.setTransactionType("Communication");
				commDTO.setStatus("New");
			/*	if (status != null && status.equals("Reply")) {
					commDTO.setStatus("Reply");
				} else {
					commDTO.setStatus("New");
				}
			*/
			//	commDTO.setSubjectUserId(input.getSubjectUserId());
				commDTO.setSubject(input.getSubject());
				//	commDTO.setHtmlText("<p>HTML version here</p><p><img src=\"cid:"+subjectUserId.getAvatar()+"\"></p>");
				commDTO.setHtmlText(htmlText);
				commDTO.setText(plainText);
			//	commDTO.setToUserId(input.getToUserId());
				commDTO.setFromUserId(input.getFromUserId());
				commDTO.setSubjectUserId(input.getFromUserId());
				commDTO.setAttachedAssetIds(input.getAttachedAssetIds());
				commDTO.setInlineAssetIds(new String[] {"b101469c-885b-4139-bace-0b815bfc02db", "c469ad83-ce7f-4037-aa01-3896c2e40d84", "7a3ecf13-c908-4512-971d-37327de25910"});
				//	commDTO.setInlineAssetIds(new String[] {subjectUserId.getAvatar()});
				// Save groupId if exists
				if (input.getGroupId() != null) {
					commDTO.setGroupId(input.getGroupId());
				}
				log.info("Send Message to contacts commDTO:");
				log.info(commDTO.toString());

				Collection<UserDTO> users = input.getUsers();
				if (users != null && users.size() > 0) {
					for (UserDTO u : users) {
						commDTO.setToUserId(u.getId());
						log.info(commDTO.toString());
						communicationService.sendCommunication(commDTO);
					}
				} else {
					input.setError("Error: Couldn't send message");
					return new Resource<>(input);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Error: ", e.getMessage());
			input.setError("Error: Couldn't send message");
			return new Resource<>(input);
		}
		return new Resource<>(input);
	}

	private CommunicationDTO buildIntroduction(RequestDTO input, UserDTO subjectUser, UserDTO toUser, UserDTO user) {
		CommunicationDTO commDTO = new CommunicationDTO();
		
		// pre-create the commDTO because the communicationId is needed to construct the JWT for the email message.
		commDTO.setToUserId(input.getToUserId());
		commDTO.setFromUserId(input.getFromUserId());
		commDTO = communicationService.createCommunication(commDTO);

		// build the JWT
		Map<String, Object> claims = new HashMap<>();
		claims.put("commid", commDTO.getId());
		claims.put("requestType", "introductionRequest");
		String jwtToken = tokenHandler.createTokenForUser(toUser.getEmail(), claims);

		String mainText = input.getHtmlText();
		log.info("mainText: " + mainText);
		String htmlText = this.p2pinline;
		htmlText = htmlText.replaceAll("avatar1.jpg", subjectUser.getAvatar());
		htmlText = htmlText.replaceAll("avatar2.jpg", toUser.getAvatar());
		htmlText = htmlText.replaceAll("%%p1 fn%%", subjectUser.getFirstName());
		htmlText = htmlText.replaceAll("%%p2 fn%%", toUser.getFirstName());
		htmlText = htmlText.replaceAll("%%p1 publicUrl%%", "https://thereferralportal.com/public/"+ subjectUser.getProfileName());
		htmlText = htmlText.replaceAll("%%p2 publicUrl%%", "https://thereferralportal.com/public/"+ toUser.getProfileName());
		htmlText = htmlText.replaceAll("%%publicUrl%%", "https://thereferralportal.com/secureAccess/"+ jwtToken);
		htmlText = htmlText.replaceAll("%%user fn%%", user.getFirstName());
		htmlText = htmlText.replaceAll("%%user ln%%", user.getLastName());
		htmlText = htmlText.replaceAll("%%user phone%%", user.getPhone()==null?"":user.getPhone());
		htmlText = htmlText.replaceAll("%%user mobilePhone%%", user.getMobilePhone()==null?"":user.getMobilePhone());
		htmlText = htmlText.replaceAll("%%user faxNumber%%", user.getFaxNumber()==null?"":user.getFaxNumber());
		htmlText = htmlText.replaceAll("%%user email%%", user.getEmail());
		if (input.getNoteSwitch()) {
			htmlText = htmlText.replaceAll("%%reason text%%", input.getNote());
		} else {
			htmlText = htmlText.replaceAll("%%reason text%%", "");
		}
		htmlText = htmlText.replaceAll("%%includeMessage%%", mainText);
		log.info("htmlText: " + htmlText);
		commDTO.setFromContactType("Professional");
		commDTO.setToContactType("Professional");
		commDTO.setTransactionType("Introduction");
		commDTO.setStatus("New");
		commDTO.setNote(input.getNote());
		commDTO.setNoteSwitch(input.getNoteSwitch());
		commDTO.setSubjectUserId(subjectUser.getId());
		commDTO.setSubject(input.getSubject());
		//	commDTO.setHtmlText("<p>HTML version here</p><p><img src=\"cid:"+subjectUserId.getAvatar()+"\"></p>");
		commDTO.setHtmlText(htmlText);
		commDTO.setText(input.getText());
		commDTO.setToUserId(toUser.getId());
		commDTO.setFromUserId(input.getFromUserId());
		commDTO.setAttachedAssetIds(input.getAttachedAssetIds());
		commDTO.setInlineAssetIds(new String[] {"b101469c-885b-4139-bace-0b815bfc02db", subjectUser.getAvatar() , "804ae63b-a83d-4e1e-881b-76e1ceb74386", toUser.getAvatar(), "c469ad83-ce7f-4037-aa01-3896c2e40d84", "7a3ecf13-c908-4512-971d-37327de25910"});
		//	commDTO.setInlineAssetIds(new String[] {subjectUserId.getAvatar()});
		log.info(commDTO.toString());
		return commDTO;
	}

	@RequestMapping(value = "/sendIntroduction", method = RequestMethod.POST)
	public Resource<RequestDTO> sendIntroduction(@RequestBody RequestDTO input) throws Exception {
		log.info("Send Introduction to User");
		CommunicationDTO commDTO;
		try {
			if (input != null) {
				UserDTO user = userService.getUserById(input.getFromUserId()).get();
				UserDTO subjectUser = userService.getUserById(input.getSubjectUserId()).get();  //contact1
				UserDTO toUser = userService.getUserById(input.getToUserId()).get();  //contact2

				commDTO = this.buildIntroduction(input, subjectUser, toUser, user);
				communicationService.sendCommunication(commDTO);
				reminderService.scheduleActionReminder(commDTO.getId());

				// flip user toUser and subjectUser and send again.
				commDTO = this.buildIntroduction(input, toUser, subjectUser, user);
				communicationService.sendCommunication(commDTO);
				reminderService.scheduleActionReminder(commDTO.getId());

			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Error: ", e.getMessage());
			input.setError("Error: Couldn't send message");
			return new Resource<>(input);
		}
		return new Resource<>(input);
	}

	@RequestMapping(value = "/getNumOfMessages", method = RequestMethod.POST)
	 public PagedResources<CommunicationDTO> getNumOfMessages(@RequestBody RequestDTO input) {
		log.info(input.toString());

		List<String> in = new ArrayList<>();
		in.add(input.getStatus());
		PagedResources<CommunicationDTO> communicationsTo = this.communicationService.findByToUserIdAndStatusIn(input.getId().toString(), in, 0, 20, "created,desc");

		if (communicationsTo != null) {
			log.info("Fetch " + input.getStatus() + " Messages: " + communicationsTo.getContent().size());
		}
		return  communicationsTo;
	}

	@RequestMapping(value = "/getNumOfTasks", method = RequestMethod.POST)
	public PagedResources<CommunicationDTO> getNumOfTasks(@RequestBody RequestDTO input) {
		log.info(input.toString());

		List<String> in = new ArrayList<>();
		in.add(input.getStatus());
		PagedResources<CommunicationDTO> communicationsFrom = this.communicationService.findByFromUserIdAndStatusIn(input.getId().toString(), in, 0, 20, "created,desc");

		if (communicationsFrom != null) {
			log.info("Fetch " + input.getStatus() + " Tasks: " + communicationsFrom.getContent().size());
		}
		return  communicationsFrom;
	}

	@RequestMapping(value = "/getPendingTasks", method = RequestMethod.POST)
	public RequestDTO getPendingTasks(@RequestBody RequestDTO input) {
		log.info(input.toString());

		List<String> in = new ArrayList<>();
		in.add(input.getStatus());
		PagedResources<CommunicationDTO> communicationsFrom = this.communicationService.findByFromUserIdAndStatusIn(input.getId().toString(), in, 0, 20, "created,desc");

		if (communicationsFrom != null) {
			log.info("Fetch " + input.getStatus() + " Messages: " + communicationsFrom.getContent().size());

			input.setNumTasks(communicationsFrom.getMetadata().getTotalElements());
			List<TasksDTO> tasks = new ArrayList<>();
			for (CommunicationDTO comm : communicationsFrom) {
				UserDTO userTo = this.userService.getUserById(comm.getToUserId()).get();
				TasksDTO task = new TasksDTO();
				task.setUser(userTo);
				task.setComm(comm);
				if (comm.getSubjectUserId() != null && !comm.getSubjectUserId().equals("")) {
					task.setSubjectUser(this.userService.getUserById(comm.getSubjectUserId()).get());
				}
				tasks.add(task);
			}
			input.setTasks(tasks);
		}

		return input;
	}

	@RequestMapping(value = "/getArchivedCommunicationsTo", method = RequestMethod.POST)
	public PagedResources<CommunicationDTO> getArchivedCommunicationsTo(@RequestBody RequestDTO input) {
		log.info(input.toString());

		List<String> in = new ArrayList<>();
		in.add("Archived");
		PagedResources<CommunicationDTO> communicationsTo = this.communicationService.findByToUserIdAndStatusIn(input.getId().toString(), in, 0, 20, "created,desc");

		if (communicationsTo != null) {
			log.info("Fetch Communications To: " + communicationsTo.getContent().size());
		}
		return communicationsTo;
	}

	@RequestMapping(value = "/getDeletedCommunicationsTo", method = RequestMethod.POST)
	public PagedResources<CommunicationDTO> getDeletedCommunicationsTo(@RequestBody RequestDTO input) {
		log.info(input.toString());

		List<String> in = new ArrayList<>();
		in.add("Deleted");
		in.add("Dejected");
		PagedResources<CommunicationDTO> communicationsTo = this.communicationService.findByToUserIdAndStatusIn(input.getId().toString(), in, 0, 20, "created,desc");

		if (communicationsTo != null) {
			log.info("Fetch Communications To: " + communicationsTo.getContent().size());
		}
		return communicationsTo;
	}

	@RequestMapping(value = "/getSentCommunicationsFrom", method = RequestMethod.POST)
	public PagedResources<CommunicationDTO> getSentCommunicationsFrom(@RequestBody RequestDTO input) {
		log.info(input.toString());

		List<String> notIn = new ArrayList<>();
		notIn.add("Pending");
		notIn.add("System");
		PagedResources<CommunicationDTO> communicationsFrom = this.communicationService.findByFromUserIdAndStatusNotIn(input.getId().toString(), notIn, 0, 20, "created,desc");

		if (communicationsFrom != null) {
			log.info("Fetch Communications from: " + communicationsFrom.getContent().size());
		}
		return communicationsFrom;
	}

	@RequestMapping(value = "/getHistory", method = RequestMethod.POST)
	public RequestDTO getHistory(@RequestBody RequestDTO input) {
		log.info(input.toString());
		int page = input.getPage();
		if (input.getId().toString().equals(input.getSubjectUserId().toString())) {
			input.setError("No History");
			input.setTouches(new Long(0));
			input.setReferrals(0);
			input.setIntros(0);
			input.setReviews(0);
			input.setMessages(0);
			return input;
		}
		List<String> notIn = new ArrayList<>();
		notIn.add("Pending");
		List<String> in = new ArrayList<>();
		in.add("Review");
		in.add("Introduction");
		in.add("Referral");
		in.add("Communication");
		PagedResources<CommunicationDTO> communications = this.communicationService.findByTwoUsersAndStatusNotIn(input.getId().toString(), input.getSubjectUserId().toString(), in, notIn, page, 15, "created,desc");

		List<String> inReferral = new ArrayList<>();
		inReferral.add("Referral");
		PagedResources<CommunicationDTO> referrals = this.communicationService.findByTwoUsersAndStatusNotIn(input.getId().toString(), input.getSubjectUserId().toString(), inReferral, notIn, 0, 20, "created,desc");
		if (referrals != null) {
			input.setReferrals(referrals.getContent().size());
		} else {
			input.setReferrals(0);
		}

		List<String> inIntroduction = new ArrayList<>();
		inIntroduction.add("Introduction");
		PagedResources<CommunicationDTO> intros = this.communicationService.findByTwoUsersAndStatusNotIn(input.getId().toString(), input.getSubjectUserId().toString(), inIntroduction, notIn, 0, 20, "created,desc");
		if (intros != null) {
			input.setIntros(intros.getContent().size());
		} else {
			input.setIntros(0);
		}

		List<String> inReview = new ArrayList<>();
		inReview.add("Review");
		PagedResources<CommunicationDTO> reviews = this.communicationService.findByTwoUsersAndStatusNotIn(input.getId().toString(), input.getSubjectUserId().toString(), inReview, notIn, 0, 20, "created,desc");
		if (reviews != null) {
			input.setReviews(reviews.getContent().size());
		} else {
			input.setReviews(0);
		}

		List<String> inCommunication = new ArrayList<>();
		inCommunication.add("Communication");
		PagedResources<CommunicationDTO> messages = this.communicationService.findByTwoUsersAndStatusNotIn(input.getId().toString(), input.getSubjectUserId().toString(), inCommunication, notIn, 0, 20, "created,desc");
		if (messages != null) {
			input.setMessages(messages.getContent().size());
		} else {
			input.setMessages(0);
		}

		UserDTO peer = this.userService.getUserById(input.getSubjectUserId()).get();

		if (communications != null && peer != null) {
			log.info("Get History for Compliance: " + communications.getContent().size());
			log.info("History communications total pages: " + communications.getMetadata().getTotalPages());
			log.info("History communications page number: " + communications.getMetadata().getNumber());
			log.info("History communications page number: " + communications.getMetadata().getTotalElements());
			input.setHistory(communications.getContent());
			input.setTouches(communications.getMetadata().getTotalElements());
			input.setTotalPages(communications.getMetadata().getTotalPages());
			input.setPageNumber(communications.getMetadata().getNumber());
			input.setUser(peer);
		}
		return input;
	}

	@RequestMapping(value = "/getNotificationsTo", method = RequestMethod.POST)
	public PagedResources<CommunicationDTO> getNotificationsTo(@RequestBody RequestDTO input) {
		log.info(input.toString());

		PagedResources<CommunicationDTO> notificationsTo = this.communicationService.findByToUserIdAndTransactionType(input.getId().toString(), "Notification", 0, 20, "created,desc");

		if (notificationsTo != null) {
			log.info("Fetch notifications To: " + notificationsTo.getContent().size());
		}
		return notificationsTo;
	}

	@RequestMapping(value = "/getCommunicationsTo", method = RequestMethod.POST)
	public PagedResources<CommunicationDTO> getCommunicationsTo(@RequestBody RequestDTO input) {
		log.info(input.toString());

		List<String> notIn = new ArrayList<>();
		notIn.add("Deleted");
		notIn.add("Dejected");
		notIn.add("Archived");
		notIn.add("Pending");
		notIn.add("System");
		PagedResources<CommunicationDTO> communicationsTo = this.communicationService.findByToUserIdAndStatusNotIn(input.getId().toString(), notIn, 0, 20, "created,desc");

		if (communicationsTo != null) {
			log.info("Fetch Communications To: " + communicationsTo.getContent().size());
		}
		return communicationsTo;
	}

	@RequestMapping(value = "/deleteCommunication", method = RequestMethod.POST)
	public PagedResources<CommunicationDTO> deleteCommunication(@RequestBody RequestDTO input) {
		log.info(input.toString());

		CommunicationDTO comm = this.communicationService.getCommunicationsById(input.getCommId());
		if (comm != null) {
			if (comm.getStatus().equals("Accepted")) {
				this.communicationService.updateStatus(comm.getId(), "Archived");
		 	} else if (comm.getStatus().equals("Rejected")) {
				this.communicationService.updateStatus(comm.getId(), "Dejected");
			} else {
				this.communicationService.updateStatus(comm.getId(), "Deleted");
			}
		}

		List<String> notIn = new ArrayList<>();
		notIn.add("Deleted");
		notIn.add("Dejected");
		notIn.add("Archived");
		notIn.add("Pending");
		notIn.add("System");
		PagedResources<CommunicationDTO> communicationsTo = this.communicationService.findByToUserIdAndStatusNotIn(input.getId().toString(), notIn, 0, 20, "created,desc");
		if (communicationsTo != null) {
			log.info("Fetch Communications To: " + communicationsTo.getContent().size());
		}

		return communicationsTo;
	}

	@RequestMapping(value = "/getPendingMessageById", method = RequestMethod.POST)
	public RequestDTO getPendingMessageById(@RequestBody RequestDTO input, Principal principal) {
		log.info(input.toString());

		CommunicationDTO comm = this.communicationService.getCommunicationsById(input.getCommId());
		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);

		RequestDTO request = new RequestDTO();

		if (comm != null && user != null) {
			log.info("Fetch Pending Communication By Id: " + comm.getId());
			request.setCommunication(comm);
			request.setFromUser(user);
			if (comm.getToUserId() != null && !comm.getToUserId().equals("")) {
				request.setToUser(this.userService.getUserById(comm.getToUserId()).get());
			}
			if (comm.getSubjectUserId() != null && !comm.getSubjectUserId().equals("")) {
				request.setSubjectUser(this.userService.getUserById(comm.getSubjectUserId()).get());
			}
		} else {
			return null;
		}
		return request;
	}

	@RequestMapping(value = "/getMessageById", method = RequestMethod.POST)
	public RequestDTO getMessageById(@RequestBody RequestDTO input, Principal principal) {
		log.info(input.toString());

		CommunicationDTO comm = this.communicationService.getCommunicationsById(input.getCommId());
		UserDTO user = userService.getUserByEmail(principal.getName())
				.orElse(null);
		boolean readOnly = input.getReadOnly();

		RequestDTO request = new RequestDTO();

		if (comm != null && user != null) {
			if (comm.getStatus().equals("New") && !readOnly) {
				this.communicationService.updateStatus(comm.getId(), "Read");
			}
			if (comm.getStatus().equals("Accepted") || comm.getStatus().equals("Archived") || comm.getStatus().equals("Deleted") || comm.getStatus().equals("Rejected") || comm.getStatus().equals("Dejected")) {
				request.setReadOnly(true);
			} else {
				request.setReadOnly(readOnly);
			}
			log.info("Fetch Communication By Id: " + comm.getId());
			String message = comm.getHtmlText();
			message = message.substring(message.indexOf("<table id=\"includeMessage\""), message.indexOf("<p id=\"endOfIncludeMessage\"") - 26);
			Whitelist wl = Whitelist.basicWithImages();
			//wl.addTags("div", "span", "p", "table", "td", "tr"); // add additional tags here as necessary
			String clean = Jsoup.clean(message, wl);
			clean = clean.replaceAll("cid:", "/api/remoteFiles/view/");
			// Remove empty tags
			Document doc = Jsoup.parse(clean);
			for (Element element : doc.select("*")) {
				if (!element.hasText() && element.isBlock()) {
					element.remove();
				}
			}
			clean = doc.body().html();
			comm.setHtmlText(clean);
			log.info(clean);
			UserDTO toUser = new UserDTO();
			UserDTO fromUser = new UserDTO();
			UserDTO subjectUser = new UserDTO();
			// Check type of message first
			if (comm.getTransactionType().equals("Introduction")) {
				// Compare current user with toUserId and subjectUserId
				if (comm.getToUserId().equals(user.getId())) {
					toUser = userService.getUserById(comm.getToUserId()).get();
					subjectUser = userService.getUserById(comm.getSubjectUserId()).get();
					fromUser = userService.getUserById(comm.getFromUserId()).get();
				} else {
					toUser = userService.getUserById(comm.getSubjectUserId()).get();
					subjectUser = userService.getUserById(comm.getToUserId()).get();
					fromUser = userService.getUserById(comm.getFromUserId()).get();
				}
			} else if(comm.getTransactionType().equals("Referral")) {
				toUser = userService.getUserById(comm.getToUserId()).get();
				subjectUser = userService.getUserById(comm.getSubjectUserId()).get();
				fromUser = userService.getUserById(comm.getFromUserId()).get();
				clean = clean.substring(clean.indexOf("</p>") + 4, clean.length() );
				comm.setHtmlText(clean);
			} else if (comm.getTransactionType().equals("Communication") || comm.getTransactionType().equals("Notification")) {
				toUser = userService.getUserById(comm.getToUserId()).get();
				fromUser = userService.getUserById(comm.getFromUserId()).get();
				if (comm.getSubjectUserId() != null) {
					subjectUser = userService.getUserById(comm.getSubjectUserId()).get();
				}
			}
			request.setCommunication(comm);
			request.setToUser(toUser);
			request.setFromUser(fromUser);
			request.setSubjectUser(subjectUser);

			// if group message then get group name
			if (comm.getGroupId() != null) {
				log.info("Get message group details");
				request.setGroupName(this.tagService.findTagById(comm.getGroupId()).getName());
				request.setGroupId(comm.getGroupId());
				ArrayList<String> tags = new ArrayList<>();
				tags.add(comm.getGroupId());
				Collection<UserDTO> users = tagService.findUsersByTagIds(tags, 0, 999, "id,desc").getContent();
				request.setUsers(users);
				log.info(request.toString());
			}
		} else {
			return null;
		}
		return request;
	}

	@RequestMapping(value = "/sendReferral", method = RequestMethod.POST)
	public Resource<RequestDTO> sendReferral(@RequestBody RequestDTO input) throws Exception {
		log.info("Send Referral to User");
		CommunicationDTO commDTO = new CommunicationDTO();
		try {
			if (input != null) {
				UserDTO user = userService.getUserById(input.getFromUserId()).get(); // current user
				UserDTO subjectUserId = userService.getUserById(input.getSubjectUserId()).get();  //contact1
				UserDTO toUserId = userService.getUserById(input.getToUserId()).get();  //contact2
				input.setFromUser(user);
				input.setSubjectUser(subjectUserId);
				input.setToUser(toUserId);

		/*		VelocityEngine ve = new VelocityEngine();
				ve.init();

				VelocityContext context = new VelocityContext();
				context.put("resource", input);

				Template t = ve.getTemplate("/emails/p2cinline.vm");
				StringWriter writer = new StringWriter();
				t.merge(context, writer);
		*/
				if (input.getCommId() != null && input.getDraft()) {
					commDTO = communicationService.getCommunicationsById(input.getCommId());
					commDTO.setAttempts(commDTO.getAttempts()+1);
				} else {
					commDTO.setAttempts(1);
				}
				commDTO.setToUserId(input.getToUserId());
				commDTO.setFromUserId(input.getFromUserId());
				if(StringUtils.isEmpty(commDTO.getId())) {
					// pre-create the commDTO because the communicationId is needed to construct the JWT for the email message.
					commDTO = communicationService.createCommunication(commDTO);
				}
				
				// build the JWT
				Map<String, Object> claims = new HashMap<>();
				claims.put("commid", commDTO.getId());
				claims.put("requestType", "referralRequest");
				String jwtToken = tokenHandler.createTokenForUser(toUserId.getEmail(), claims);

				String mainText = input.getHtmlText();
				log.info("mainText: " + mainText);
				mainText = mainText.replaceAll("%%p1 fn%%", subjectUserId.getFirstName());
				String htmlText = this.p2cinline;
				htmlText = htmlText.replaceAll("avatar1.jpg", subjectUserId.getAvatar());
				htmlText = htmlText.replaceAll("%%p1 fn%%", subjectUserId.getFirstName());
				htmlText = htmlText.replaceAll("%%p1 ln%%", subjectUserId.getLastName());
				htmlText = htmlText.replaceAll("%%p2 fn%%", toUserId.getFirstName());
				if (subjectUserId.getProfession() == null) {
					htmlText = htmlText.replaceAll("%%p1 profession%%", "Professional");
				} else {
					htmlText = htmlText.replaceAll("%%p1 profession%%", subjectUserId.getProfession());
				}
				htmlText = htmlText.replaceAll("%%p1 publicUrl%%", "https://thereferralportal.com/secureAccess/"+ jwtToken);
				if (subjectUserId.getLeadParagraph() != null) {
					htmlText = htmlText.replaceAll("%%p1 leadParagraph%%", subjectUserId.getLeadParagraph());
				} else {
					htmlText = htmlText.replaceAll("%%p1 leadParagraph%%", "");
				}
				if (subjectUserId.getDescription() != null) {
					htmlText = htmlText.replaceAll("%%p1 description%%", subjectUserId.getDescription());
				} else {
					htmlText = htmlText.replaceAll("%%p1 description%%", "");
				}
				htmlText = htmlText.replaceAll("%%user fn%%", user.getFirstName());
				htmlText = htmlText.replaceAll("%%user ln%%", user.getLastName());
				if (user.getPhone() != null) {
					htmlText = htmlText.replaceAll("%%user phone%%", user.getPhone());
				} else {
					htmlText.replaceAll("%%user phone%%", "");
				}
				if (user.getMobilePhone() != null) {
					htmlText = htmlText.replaceAll("%%user mobilePhone%%", user.getMobilePhone());
				} else {
					htmlText.replaceAll("%%user mobilePhone%%", "");
				}
				if (user.getFaxNumber() != null) {
					htmlText = htmlText.replaceAll("%%user faxNumber%%", user.getFaxNumber());
				} else {
					htmlText.replaceAll("%%user faxNumber%%", "");
				}
				htmlText = htmlText.replaceAll("%%user email%%", user.getEmail());
				if (input.getNoteSwitch()) {
					htmlText = htmlText.replaceAll("%%reason text%%", input.getNote());
				}  else {
					htmlText = htmlText.replaceAll("%%reason text%%", "");
				}
				htmlText = htmlText.replaceAll("%%includeMessage%%", mainText);
				log.info("htmlText: " + htmlText);

				commDTO.setFromContactType("Professional");
				commDTO.setToContactType("Professional");
				commDTO.setTransactionType("Referral");
				commDTO.setStatus("New");
				commDTO.setSubjectUserId(input.getSubjectUserId());
				commDTO.setNote(input.getNote());
				commDTO.setNoteSwitch(input.getNoteSwitch());
				commDTO.setSubject(input.getSubject());
				//	commDTO.setHtmlText("<p>HTML version here</p><p><img src=\"cid:"+subjectUserId.getAvatar()+"\"></p>");
				commDTO.setHtmlText(htmlText);
				commDTO.setText(input.getText());
				commDTO.setAttachedAssetIds(input.getAttachedAssetIds());
				commDTO.setInlineAssetIds(new String[] {"b101469c-885b-4139-bace-0b815bfc02db", subjectUserId.getAvatar() , "804ae63b-a83d-4e1e-881b-76e1ceb74386", "c469ad83-ce7f-4037-aa01-3896c2e40d84", "7a3ecf13-c908-4512-971d-37327de25910"});
				log.info(commDTO.toString());
				communicationService.sendCommunication(commDTO);
				
				reminderService.unscheduleReciprocationReminder(toUserId.getId(), user.getId());
				reminderService.scheduleActionReminder(commDTO.getId());
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Error: ", e.getMessage());
			input.setError("Error: Couldn't send message");
			return new Resource<>(input);
		}
		return new Resource<>(input);
	}

	@RequestMapping(value = "/getGooglePlusProfile", method = RequestMethod.POST)
	public Resource<GooglePlus> getGooglePlusProfile(@RequestBody RequestDTO input) throws Exception {
		log.info("Get GooglePlus Profile from API");
		log.info(input.toString());
		GooglePlusDTO googlePlusDTO;
		googlePlusDTO = socialService.getGooglePlus(input.getId());
		GooglePlus googlePlus = new GooglePlus();
		RestTemplate restTemplate = new RestTemplate();
		try {
			if (googlePlusDTO != null) {
				String url = "https://www.googleapis.com/plus/v1/people/" + googlePlusDTO.getGooglePlusUserId() + "?key=" + ApiController.google_plus_api;
				log.info("GooglePlus url: " + url);
				googlePlus = restTemplate.getForObject(url, GooglePlus.class);
				log.info(googlePlus.toString());
			} else {
				log.error("GooglePlusDTO is empty");
				return null;
			}
		} catch (Exception e) {
			log.error("Error: ", e.getMessage());
			return new Resource<>(googlePlus);
		}

		return new Resource<>(googlePlus);
	}

	@RequestMapping(value = "/saveGooglePlusId", method = RequestMethod.POST)
	public Resource<GooglePlusDTO> saveGooglePlusSettings(@RequestBody RequestDTO input) throws Exception {
		log.info("Save Google Plus Settings");
		log.info(input.toString());

		GooglePlusDTO googlePlusDTO =  new GooglePlusDTO();
		googlePlusDTO.setUserId(input.getId());
		googlePlusDTO.setGooglePlusUserId(input.getGooglePlusId());
		googlePlusDTO = socialService.createGooglePlus(googlePlusDTO);

		return new Resource<>(googlePlusDTO);
	}

	@RequestMapping(value = "/getGooglePlusSettings", method = RequestMethod.POST)
	public Resource<GooglePlusDTO> getGooglePlusSettings(@RequestBody RequestDTO input) throws Exception {
		log.info("Get Google Plus Settings");
		log.info(input.toString());

		GooglePlusDTO googlePlusDTO = socialService.getGooglePlus(input.getId());
		if (googlePlusDTO != null) {
			log.info(googlePlusDTO.toString());
		} else {
			log.error("GooglePlusDTO is empty");
			return null;
		}
		return new Resource<>(googlePlusDTO);
	}

	@RequestMapping(value = "/getZillowReviews", method = RequestMethod.POST)
	public Resource<Zillow> getZillowReviews(@RequestBody RequestDTO input) throws Exception {
		log.info("Get Zillow Reviews from API");
		log.info(input.toString());

		ZillowDTO zillowDTO = socialService.getZillow(input.getId());
		Zillow zillow = new Zillow();
		RestTemplate restTemplate = new RestTemplate();
		try {
			if (zillowDTO != null && !zillowDTO.getScreenName().equals("")) {
				log.debug("getZillowReviews after null");
				String url = "https://www.zillow.com/webservice/ProReviews.htm?zws-id=" + zwsid + "&output=json&count=10&screenname=" + zillowDTO.getScreenName();
				log.debug("getZillowReviews url: " + url);
				zillow = restTemplate.getForObject(url, Zillow.class);
				log.info(zillow.toString());
			} else {
				log.error("ZillowDTO is empty");
				return new Resource<>(zillow);
			}
		} catch (Exception e) {
			log.error("Error: ", e.getMessage());
			return new Resource<>(zillow);
		}

		return new Resource<>(zillow);
	}

	@RequestMapping(value = "/saveZillowScreenName", method = RequestMethod.POST)
	public Resource<ZillowDTO> saveZillowScreenName(@RequestBody RequestDTO input) throws Exception {
		log.info("Save Zillow Screen Name");
		log.info(input.toString());

		ZillowDTO zillow =  new ZillowDTO();
		zillow.setUserId(input.getId());
		zillow.setScreenName(input.getZillowScreenName());
		zillow = socialService.createZillow(zillow);

		return new Resource<>(zillow);
	}

	@RequestMapping(value = "/getZillowScreenName", method = RequestMethod.POST)
	public Resource<ZillowDTO> getZillowScreenName(@RequestBody RequestDTO input) throws Exception {
		log.info("Get Zillow ScreenName");
		log.info(input.toString());

		ZillowDTO zillowDTO = socialService.getZillow(input.getId());
		if (zillowDTO != null) {
			log.info(zillowDTO.toString());
		} else {
			log.error("ZillowDTO is empty");
			return null;
		}
		return new Resource<>(zillowDTO);
	}

	@RequestMapping(value = "/saveFacebookSettings", method = RequestMethod.POST)
	public Resource<FacebookDTO> saveFacebookSettings(@RequestBody RequestDTO input) throws Exception {
		log.info("Save Facebook Settings");
		log.info(input.toString());

		FacebookDTO facebook =  new FacebookDTO();
		facebook.setUserId(input.getId());
		facebook.setFacebookPageUrl(input.getFacebookPageUrl());
		facebook.setFacebookAppId(input.getFacebookAppId());
		facebook = socialService.createFacebook(facebook);

		return new Resource<>(facebook);
	}

	@RequestMapping(value = "/getFacebookSettings", method = RequestMethod.POST)
	public Resource<FacebookDTO> getFacebookSettings(@RequestBody RequestDTO input) throws Exception {
		log.info("Get Facebook Settings");
		log.info(input.toString());

		FacebookDTO facebookDTO = socialService.getFacebook(input.getId());
		if (facebookDTO != null) {
			log.info(facebookDTO.toString());
		} else {
			log.error("FacebookDTO is empty");
			return null;
		}
		return new Resource<>(facebookDTO);
	}

	@RequestMapping(value = "/getLinkedInToken", method = RequestMethod.POST)
	public Resource<LinkedInDTO> getLinkedInToken(@RequestBody RequestDTO input) throws Exception {
		log.info("Get LinkedIn Token");
		log.info(input.toString());

		LinkedInDTO linkedInDTO = socialService.getLinkedin(input.getId());
		if (linkedInDTO != null) {
			log.info(linkedInDTO.toString());
		} else {
			log.error("LinkedInDTO is empty");
			return null;
		}
		return new Resource<>(linkedInDTO);
	}

	@RequestMapping(value = "/getLinkedInProfile", method = RequestMethod.POST)
	public Resource<LinkedInProfile> getLinkedInProfile(@RequestBody RequestDTO input) throws Exception {
		LinkedInProfile linkedIn = new LinkedInProfile();
		try {
			log.info("Get LinkedIn Profile from API");
			log.info(input.toString());
			LinkedInDTO linkedInDTO = socialService.getLinkedin(input.getId());
			RestTemplate restTemplate = new RestTemplate();
			if (linkedInDTO != null && linkedInDTO.getAccess_token() != null) {
				log.info(linkedInDTO.toString());
				String urlParameters = ":(id,email-address,headline,summary,first-name,last-name,formatted-name,num-connections,picture-url,public-profile-url,location)";
				String url = "https://api.linkedin.com/v1/people/~"+urlParameters+"?oauth2_access_token="+linkedInDTO.getAccess_token()+"&x-li-src=msdk&format=json";
				log.info("LinkedIn API call: "+ url);
				linkedIn =  restTemplate.getForObject(url, LinkedInProfile.class);
				log.info("Result from LinkedIn: " + linkedIn);
				linkedIn.setLoc(linkedIn.getLocation().getName());
				linkedIn.setCountry(linkedIn.getLocation().getCountry().getCode());
			} else {
				log.error("LinkedInDTO is empty");
				return null;
			}
			return new Resource<>(linkedIn);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Error: Could not get LinkedIn Profile ", e.getMessage());
			return new Resource<>(linkedIn);
		}
	}

	@RequestMapping(value = "/getLinkedInProfile2", method = RequestMethod.POST)
	public Resource<LinkedInProfile> getLinkedInProfile2(@RequestBody RequestDTO input) throws Exception {
		LinkedInProfile linkedIn = new LinkedInProfile();
		try {
			log.info("Get LinkedIn Profile from API");
			log.info(input.toString());
			LinkedInDTO linkedInDTO = socialService.getLinkedin(input.getId());
			log.info(linkedInDTO.toString());
			if (linkedInDTO != null && linkedInDTO.getAccess_token() != null) {


				log.info("Linked In OAuth2 / GET request ");

				String targetURL = "https://api.linkedin.com/v1/people/~?format=json";
				StringBuilder result = new StringBuilder();

				URL url;
				HttpURLConnection connection = null;
				try {
					String urlParameters = ":(id,email-address,headline,summary,first-name,last-name,formatted-name,num-connections,picture-url,public-profile-url,location)";
					log.info(urlParameters);

					//Create connection
					url = new URL(targetURL);
					connection = (HttpURLConnection)url.openConnection();
					connection.setRequestMethod("GET");
					connection.setRequestProperty("Host", "api.linkedin.com");
					connection.setRequestProperty("Connection", "Keep-Alive");
					connection.setRequestProperty("Authorization",
							"Bearer " + linkedInDTO.getAccess_token());
					connection.setRequestProperty("x-li-src", "msdk");
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
					linkedIn = mapper.readValue(jsonObj.toString(), LinkedInProfile.class);

				} catch (IOException e) {

					System.err.println("Error LinkedIn request ");

					HttpURLConnection httpConn = connection;
					InputStream is;
					String line;

					if (httpConn != null && httpConn.getResponseCode() >= 400) {
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
				log.error("LinkedInDTO is empty");
				return null;
			}
			return new Resource<>(linkedIn);
		} catch (Exception e) {
			log.error("Error: ", e.getMessage());
			return new Resource<>(linkedIn);
		}
	}

	@RequestMapping(value = "/getInstagramProfile", method = RequestMethod.POST)
	public Resource<InstagramProfile> getInstagramProfile(@RequestBody RequestDTO input) throws Exception {
		InstagramProfile instagram = new InstagramProfile();
		try {
			log.info("Get Instagram Profile from API");
			log.info(input.toString());
			Self self;
			Recent recent;
			InstagramDTO instagramDTO = socialService.getInstagram(input.getId());
			RestTemplate restTemplate = new RestTemplate();
			if (instagramDTO != null && instagramDTO.getAccess_token() != null) {
				// Get User Info
				String url = "https://api.instagram.com/v1/users/self/?access_token=" + instagramDTO.getAccess_token();
				log.info(url);
				self = restTemplate.getForObject(url, Self.class);
				log.info(self.toString());
				instagram.setUser(self.getData());

				// Get Recent Media
				url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + instagramDTO.getAccess_token();
				log.info(url);
				recent = restTemplate.getForObject(url, Recent.class);
				log.info(recent.toString());
				instagram.setRecent(recent);
			} else {
				log.error("Instagram is empty");
				return null;
			}
		} catch (Exception e) {
			log.error("Error: ", e.getMessage());
			return new Resource<>(instagram);
		}
		return new Resource<>(instagram);
	}

	@RequestMapping(value = "/getInstagramToken", method = RequestMethod.POST)
	public Resource<InstagramDTO> getInstagramToken(@RequestBody RequestDTO input) throws Exception {
		log.info("Get Instagram Token");
		log.info(input.toString());

		InstagramDTO instagramDTO = socialService.getInstagram(input.getId());
		if (instagramDTO != null) {
			log.info(instagramDTO.toString());
		} else {
			log.error("InstagramDTO is empty");
			return null;
		}
		return new Resource<>(instagramDTO);
	}

	@RequestMapping(value = "/addToMyNetwork", method = RequestMethod.POST)
	public Resource<RequestDTO> addToMyNetwork(@RequestBody RequestDTO input) throws Exception {
		log.info("Accept Introduction");
		log.info(input.toString());

		// Add ToUser to SubjectUser Network
		UserDTO user = userService.getUserById(input.getToUserId()).get();
		NetworkDTO network = userService.getMyNetwork(user).get();
		networkService.addMembers(network, input.getUsers());
		communicationService.updateStatus(input.getCommId(), "Accepted");
		input.setCommunication(communicationService.getCommunicationsById(input.getCommId()));

		reminderService.unscheduleActionReminder(input.getCommId());
		
		return new Resource<>(input);
	}

	@RequestMapping(value = "/acceptReferral", method = RequestMethod.POST)
	public Resource<RequestDTO> acceptReferral(@RequestBody RequestDTO input) throws Exception {
		log.info("Accept Referral");
		log.info(input.toString());

		UserDTO user = userService.getUserById(input.getToUserId()).get();
		NetworkDTO network = userService.getMyNetwork(user).get();
		networkService.addMembers(network, input.getUsers());
		communicationService.updateStatus(input.getCommId(), "Accepted");
		
		reminderService.unscheduleActionReminder(input.getCommId());
		
		CommunicationDTO old = communicationService.getCommunicationsById(input.getCommId());
		input.setCommunication(old);
		
		//Add SubjectUser to ToUser Network
		UserDTO subjectUser = new UserDTO();
		Collection<UserDTO> usersToAdd  = input.getUsers();
		for (UserDTO u:usersToAdd) {
			subjectUser = u;
		}
		usersToAdd.clear();
		//Add to user to Collection
		usersToAdd.add(user);
		NetworkDTO network2 = userService.getMyNetwork(subjectUser).get();
		networkService.addMembers(network2, usersToAdd);

		// Send Notification to the referrer (fromUser)
		UserDTO toUser = this.userService.getUserById(old.getToUserId()).get();
		UserDTO fromUser = this.userService.getUserById(old.getFromUserId()).get();
		String created = new SimpleDateFormat("MM/dd/yyyy").format(new Date());
		String htmlText = "<p>Dear "+ fromUser.getFirstName() + ",</p><p><strong>" + toUser.getFirstName() + " " + toUser.getLastName() + "</strong> accepted your referral for <strong>" + subjectUser.getFirstName() + " " + subjectUser.getLastName() + "</strong>";
		if (subjectUser.getBusinessName() != null) {
			htmlText = htmlText + " of <strong>" + subjectUser.getBusinessName() + "</strong>";
		}
		htmlText = htmlText + " on " + created + ".</p><p>Sincerely,</p><p>The Latch Team.</p>";
		input.setHtmlText(htmlText);
		String text = this.html2text(htmlText);
		log.info(text);
		String subject = "Referral Accepted: "+ subjectUser.getFirstName() + " " + subjectUser.getLastName();
		CommunicationDTO newComm = this.buildMessage(old, fromUser, toUser, subjectUser.getId(), htmlText, text, subject);
		// Add a note that will be use for the Notification panel.
		newComm.setNote("Your referral of <strong>" + subjectUser.getFirstName() + " " + subjectUser.getLastName() +"</strong> to <strong>" + toUser.getFirstName() + " " + toUser.getLastName() + "</strong> was accepted.");
		newComm.setNoteSwitch(false);
		this.communicationService.sendCommunication(newComm);

		// Send Notification to the referral (subjectUser)
		htmlText = "<p>Dear "+ subjectUser.getFirstName() + ",</p><p>I referred you to my client, <strong>" + toUser.getFirstName() + " " + toUser.getLastName() + "</strong>. "+ toUser.getFirstName() + " should  be contacting you soon.</p><p>Please let me know if I can be of assistance.</p>";
		htmlText = htmlText + "<p>Sincerely,</p><p><strong>" + fromUser.getFirstName() + " " + fromUser.getLastName() + "</p>";
		input.setHtmlText(htmlText);
		text = this.html2text(htmlText);
		log.info(text);
		subject = "You Have Been Referred by " + fromUser.getFirstName() + " " + fromUser.getLastName();
		CommunicationDTO newComm2 = this.buildMessage(old, subjectUser, fromUser, toUser.getId(), htmlText, text, subject);
		// Add a note that will be use for the Notification panel.
		newComm2.setNote("You have been referred by <strong>" + fromUser.getFirstName() + " " + fromUser.getLastName() + "</strong> to <a href=\"/profile/"+ toUser.getId() + "\">" + toUser.getFirstName() + " " + toUser.getLastName() + "</a>.");
		newComm2.setNoteSwitch(false);
		this.communicationService.sendCommunication(newComm2);

		// queue reciprocation reminder
		reminderService.scheduleReciprocationReminder(old.getId());

		return new Resource<>(input);
	}

	@RequestMapping(value = "/deletePendingMessage", method = RequestMethod.POST)
	public Resource<RequestDTO> deletePendingMessage(@RequestBody RequestDTO input) throws Exception {
		log.info("Delete Pending Message");
		log.info(input.toString());


		CommunicationDTO comm = this.communicationService.getCommunicationsById(input.getCommId());
		if (comm != null && comm.getStatus().equals("Pending")) {
			this.communicationService.delete(comm.getId());
		} else {
			return null;
		}

		return new Resource<>(input);
	}

	@RequestMapping(value = "/savePendingMessage", method = RequestMethod.POST)
	public Resource<RequestDTO> savePendingMessage(@RequestBody RequestDTO input) throws Exception {
		log.info("Save Pending Message");
		log.info(input.toString());

		String toContactType = "Professional";
		UserDTO toUser = userService.getUserById(input.getToUserId()).get();
		if (toUser.getProfession() == null) {
			toContactType = "Consumer";
		}

		// Add communication to MyQ to resend a new referral.
		CommunicationDTO comm = new CommunicationDTO();
		comm.setStatus("Pending");
		comm.setTransactionType(input.getTransactionType());
		if (input.getTransactionType().equals("Referral")) {
			comm.setAttempts(1);
		}
		comm.setToContactType(toContactType);
		comm.setToUserId(input.getToUserId());
		comm.setFromUserId(input.getFromUserId());
		if (input.getSubjectUserId() != null) {
			comm.setSubjectUserId(input.getSubjectUserId());
		}
		if (input.getSubjectUserProfession() != null) {
			comm.setSubjectUserProfession(input.getSubjectUserProfession());
		}
		comm.setNote(input.getNote());
		comm.setNoteSwitch(true);
		this.communicationService.createCommunication(comm);

		return new Resource<>(input);
	}

	private CommunicationDTO buildMessage(CommunicationDTO input, UserDTO toUser, UserDTO fromUser, String subjectUserId, String mainText, String text, String subject) {
		CommunicationDTO commDTO = new CommunicationDTO();
		String htmlText = this.latchinline;
		if (input.getNoteSwitch()) {
			htmlText = htmlText.replaceAll("%%reason text%%", input.getNote());
		}  else {
			htmlText = htmlText.replaceAll("%%reason text%%", "");
		}
		htmlText = htmlText.replaceAll("%%includeMessage%%", mainText);
		log.info("htmlText: " + htmlText);
		commDTO.setFromContactType("Professional");
		commDTO.setToContactType("Professional");
		commDTO.setTransactionType("Notification");
		commDTO.setStatus("System");
		commDTO.setNote(input.getNote());
		commDTO.setNoteSwitch(input.getNoteSwitch());
		commDTO.setSubject(subject);
		//commDTO.setHtmlText("<p>HTML version here</p><p><img src=\"cid:"+subjectUserId.getAvatar()+"\"></p>");
		commDTO.setHtmlText(htmlText);
		commDTO.setText(text);
		commDTO.setToUserId(toUser.getId());
		commDTO.setFromUserId(fromUser.getId());
		commDTO.setSubjectUserId(subjectUserId);
		commDTO.setAttachedAssetIds(input.getAttachedAssetIds());
		commDTO.setInlineAssetIds(new String[] {"b101469c-885b-4139-bace-0b815bfc02db"});
		log.info(commDTO.toString());
		return commDTO;
	}


	@RequestMapping(value = "/rejectReferral", method = RequestMethod.POST)
	public Resource<RequestDTO> rejectReferral(@RequestBody RequestDTO input) throws Exception {
		log.info("Reject Referral");
		log.info(input.toString());

		communicationService.updateStatus(input.getCommId(), "Rejected");
		reminderService.unscheduleActionReminder(input.getCommId());
		input.setCommunication(communicationService.getCommunicationsById(input.getCommId()));

		CommunicationDTO old = this.communicationService.getCommunicationsById(input.getCommId());

		// Add communication to MyQ to resend a new referral.
		CommunicationDTO comm = new CommunicationDTO();
		comm.setStatus("Pending");
		comm.setTransactionType(old.getTransactionType());
		comm.setToContactType(old.getToContactType());
		comm.setToUserId(old.getToUserId());
		comm.setFromUserId(old.getFromUserId());
		comm.setNote(old.getNote());
		comm.setNoteSwitch(old.getNoteSwitch());
		comm.setAttempts(old.getAttempts()+1);
		comm.setTransactionid(input.getCommId());
		this.communicationService.createCommunication(comm);

		//Send Notification to the one that sent you the referral (fromUser)
		UserDTO toUser = this.userService.getUserById(old.getToUserId()).get();
		UserDTO fromUser = this.userService.getUserById(old.getFromUserId()).get();
		UserDTO subjectUser = this.userService.getUserById(old.getSubjectUserId()).get();
		String created = new SimpleDateFormat("MM/dd/yyyy").format(old.getCreated());
		String htmlText = "<p>Dear "+ fromUser.getFirstName() + ",</p><p><strong>" + toUser.getFirstName() + " " + toUser.getLastName() + "</strong> rejected the referral for <strong>" + subjectUser.getFirstName() + " " + subjectUser.getLastName() + "</strong>";
		if (subjectUser.getBusinessName() != null) {
			htmlText = htmlText + " of <strong>" + subjectUser.getBusinessName() + "</strong>";
		}
		htmlText = htmlText + " on " + created + ". <a href=\"https://www.thereferralportal.com/\">Click here</a> to send another referral.</p><p>Sincerely,</p><p>The Latch Team.</p>";
		input.setHtmlText(htmlText);
		String text = this.html2text(htmlText);
		log.info(text);
		String subject = "Referral Rejected: "+ subjectUser.getFirstName() + " " + subjectUser.getLastName();
		CommunicationDTO newComm = this.buildMessage(old, fromUser, toUser, subjectUser.getId(), htmlText, text, subject);
		// Add a note that will be use for the Notification panel.
		newComm.setNote("Your referral of <strong>" + subjectUser.getFirstName() + " " + subjectUser.getLastName() +"</strong> to <strong>" + toUser.getFirstName() + " " + toUser.getLastName() + "</strong> was rejected. A new My Q item was created.");
		newComm.setNoteSwitch(false);
		this.communicationService.sendCommunication(newComm);
		return new Resource<>(input);
	}

	private String html2text(String html) {
		return Jsoup.parse(html).text();
	}

	@RequestMapping(value = "/acceptIntroduction", method = RequestMethod.POST)
	public Resource<UserDTO> acceptIntroduction(@RequestBody RequestDTO input) throws Exception {
		RequestDTO request = new RequestDTO();
		log.info("Accept Introduction");
		log.info(input.toString());
		request.setUsers(input.getUsers());
		request.setId(input.getId());

		UserDTO user = userService.getUserById(input.getId()).get();
		NetworkDTO network = userService.getMyNetwork(user).get();
		networkService.addMembers(network, input.getUsers());

		Collection<UserDTO> users = input.getUsers();
		UserDTO introUser = null;
		if(users.size() > 0) {
			introUser = users.iterator().next();
		}

		return new Resource<>(introUser);
	}

	@RequestMapping(value = "/getContactNotes", method = RequestMethod.POST)
	public Resource<UserNoteDTO> getContactNotes(@RequestBody UserNoteDTO input) throws Exception {
		log.info("Get User's Notes");
		log.info(input.toString());
		Optional<UserNoteDTO> optional = userNoteService.getByOwnerIdAndTargetId(input.getOwnerUserId(), input.getTargetUserId());
		// TODO: set to optional to avoid error if empty
		if (optional.isPresent()) {
		//	input.setContent(optional.get().getContent());
			input = optional.get();
			log.info("User Note: " + input);
		}

		return new Resource<>(input);
	}

	@RequestMapping(value = "/saveContactNotes", method = RequestMethod.POST)
	public Resource<UserNoteDTO> saveContactNotes(@RequestBody UserNoteDTO input) throws Exception {
		log.info("Save User's Notes");
		log.info(input.toString());
		Optional<UserNoteDTO> optional = userNoteService.getByOwnerIdAndTargetId(input.getOwnerUserId(), input.getTargetUserId());
		log.info("Current Note: " + optional);
		if (optional.isPresent() && optional.get().getId() != null) {
			UserNoteDTO userNote = optional.get();
			userNote.setContent(input.getContent());
			userNoteService.update(userNote);
		} else {
			UserNoteDTO userNote = new UserNoteDTO();
			userNote.setOwnerUserId(input.getOwnerUserId());
			userNote.setTargetUserId(input.getTargetUserId());
			userNote.setContent(input.getContent());
			userNoteService.create(userNote);
		}
		return new Resource<>(input);
	}

	@RequestMapping(value = "/saveUserNotes", method = RequestMethod.POST)
	public Resource<UserNoteDTO> saveUserNotes(@RequestBody UserNoteDTO input) throws Exception {
		log.info("Save User's Notes");
		log.info(input.toString());
		Optional<UserNoteDTO> optional = userNoteService.getByOwnerIdAndTargetId(input.getOwnerUserId(), input.getTargetUserId());
		log.info("Current Note: " + optional);
		if (optional.isPresent() && optional.get().getId() != null) {
			UserNoteDTO userNote = optional.get();
			Class<UserNoteDTO> userNoteClass = UserNoteDTO.class;
			Field[] fields = userNoteClass.getDeclaredFields();
			for (Field field : fields) {
				field.setAccessible(true);
				if (!field.getName().equals("serialVersionUID") && !field.getName().equals("id") && !field.getName().equals("ownerUserId") && !field.getName().equals("targetUserId") && field.get(input) != null && field.get(input) != "") {
					log.info("0-Field Name-->" + field.getName() + "\t"
							+ "Field Type-->" + field.getType().getName() + "\t"
							+ "Field Value-->" + field.get(input));
					field.set(userNote, field.get(input));
				}
			}
			userNoteService.update(userNote);
		} else {
			UserNoteDTO userNote = new UserNoteDTO();
			userNote.setOwnerUserId(input.getOwnerUserId());
			userNote.setTargetUserId(input.getTargetUserId());
			Class<UserNoteDTO> userNoteClass = UserNoteDTO.class;
			Field[] fields = userNoteClass.getDeclaredFields();
			for (Field field : fields) {
				field.setAccessible(true);
				if (!field.getName().equals("serialVersionUID") && !field.getName().equals("id") && !field.getName().equals("ownerUserId") && !field.getName().equals("targetUserId") && field.get(input) != null && field.get(input) != "") {
					log.info("0-Field Name-->" + field.getName() + "\t"
							+ "Field Type-->" + field.getType().getName() + "\t"
							+ "Field Value-->" + field.get(input));
					field.set(userNote, field.get(input));
				}
			}
			//userNote.setContent(input.getContent());
			userNoteService.create(userNote);
		}
		return new Resource<>(input);
	}

	@RequestMapping(value = "/saveUser", method = RequestMethod.POST)
	public Resource<RequestDTO> saveUser(@RequestBody UserDTO input) throws Exception {
		log.info("Save User's Settings");
		log.info(input.toString());

		RequestDTO request = new RequestDTO();
		// get existing User from ID
		UserDTO user = userService.getUserById(input.getId()).get();
		log.info(user.toString());
		if (user != null) {
			Class<UserDTO> userClass = UserDTO.class;
			Field[] fields = userClass.getDeclaredFields();
			for (Field field : fields) {
				field.setAccessible(true);
				if (!field.getName().equals("id") && !field.getName().equals("profileName") && !field.getName().equals("description") && !field.getName().equals("password") && field.get(input) != null) {
					if (!((field.getName().equals("lat") || field.getName().equals("lng")) && (Double)field.get(input) == 0.0)) {
						log.info("0-Field Name-->" + field.getName() + "\t"
								+ "Field Type-->" + field.getType().getName() + "\t"
								+ "Field Value-->" + field.get(input));
						field.set(user, field.get(input));
					}
				} else if (field.getName().equals("profileName") && field.get(input) != null) {
					log.info("1-Field Name-->" + field.getName() + "\t"
							+ "Field Type-->" + field.getType().getName() + "\t"
							+ "Field Value-->" + field.get(input));
					if (checkIfProfileNameAlreadyExists(field.get(input).toString())) {
						request.setError("Page Name already exists");
					} else {
						field.set(user, field.get(input));
					}
				} else if (field.getName().equals("description") && field.get(input) != null) {
					log.info("2-Field Name-->" + field.getName() + "\t"
							+ "Field Type-->" + field.getType().getName() + "\t"
							+ "Field Value-->" + field.get(input));
					Whitelist wl = Whitelist.basicWithImages();
					//wl.addTags("div", "span", "p", "table", "td", "tr"); // add additional tags here as necessary
					String clean = Jsoup.clean(field.get(input).toString(), wl);
					// Remove empty tags
					Document doc = Jsoup.parse(clean);
					for (Element element : doc.select("*")) {
						if (!element.hasText() && element.isBlock()) {
							element.remove();
						}
					}
					clean = doc.body().html();
					field.set(user, clean);
				} else if (field.getName().equals("password") && field.get(input) != null) {
					log.info("3-Field Name-->" + field.getName() + "\t"
							+ "Field Type-->" + field.getType().getName() + "\t"
							+ "Field Value-->" + field.get(input));
					BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
					String encryptedPassword = encoder.encode(field.get(input).toString());
					field.set(user, encryptedPassword);
				}
			}
		}
		log.info(user.toString());
		user = userService.update(user).get();
		request.setUser(user);

		return new Resource<>(request);
	}

	private boolean checkIfProfileNameAlreadyExists(String profileName) {
		Optional<UserDTO> profileNameAlreadyExists = userService.getUserByProfileName(profileName);
		if (profileNameAlreadyExists.isPresent() && profileNameAlreadyExists.get().getId() != null) {
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/deleteAttachments", method = RequestMethod.POST)
	public Resource<RequestDTO> deleteAttachments(@RequestBody RequestDTO input) throws Exception {
		log.info("Delete Attachment  (user id): "+ input.getId());
		try {
			for (String fileId: input.getAttachedAssetIds()) {
				remoteFileService.delete(fileId);
				log.info("Deleted Attachment file ID: " + fileId);
				input.setAttachedAssetIds(ArrayUtils.removeElement(input.getAttachedAssetIds(), fileId));
			}
		} catch (Exception e) {
			log.error("Error: ", e.getMessage());
			return new Resource<>(null);
		}

		return new Resource<>(input);
	}

	@RequestMapping(value = "/uploadAttachments", method = RequestMethod.POST)
	public Resources<String> uploadAttachments(@RequestParam("input-24[]") MultipartFile[] files, @RequestParam("id") String id) throws MalformedURLException {
		log.info("Upload Attachment  (user id): "+ id);

		RequestDTO requestDTO = new RequestDTO();
		requestDTO.setId(id);
		log.info("Upload Attachments: " + files.length);
		Collection<String> attachedAssetsIds = new ArrayList<>();
		for (MultipartFile file: files) {
			log.info("File Name:" + file.getOriginalFilename());
			try {
				String newId = remoteFileService.uploadFile(file, id);
				log.info("Attachment file ID: " + newId);
				attachedAssetsIds.add(newId);
			} catch (Exception e) {
				log.error("Error: ", e);
				return new Resources<>(attachedAssetsIds);
			}
		}
		log.info("Attached assets ids: " + attachedAssetsIds);
		return new Resources<>(attachedAssetsIds);
	}

	@RequestMapping(value = "/uploadAvatar", method = RequestMethod.POST)
	public Resource<UserDTO> uploadAvatar(@RequestParam("avatar") MultipartFile avatar, @RequestParam("id") String id) throws MalformedURLException {
		log.info("Upload avatar (id): "+ id);

		UserDTO newUser = userService.getUserById(id).get();
		log.info("Upload Avatar (filename): " + avatar.getOriginalFilename());
		if (newUser != null) {
			log.info("Upload Avatar: " + newUser.getAvatar());

			try {
				// Include owners userid when uploading a file. if not provided, the default is 'system'
				String newId = remoteFileService.uploadFile(avatar, id);
				log.info("Avatar new ID: " + newId);
				// Change the avatar field in the UserDTO Entity
				newUser.setAvatar(newId);
				newUser = userService.update(newUser).get();
			} catch (Exception e) {
				log.error("Error: ", e.getMessage());
				return new Resource<>(null);
			}
		} else {
			return new Resource<>(null);
		}

		return new Resource<>(newUser);
	}

	@RequestMapping(value = "/uploadAvatarFromCroppie", method = RequestMethod.POST)
	public Resource<UserDTO> uploadAvatarFromCroppie(@RequestParam("avatar") MultipartFile avatar, @RequestParam("id") String id) throws MalformedURLException {
		log.info("Upload avatar (id): "+ id);

		UserDTO newUser = userService.getUserById(id).get();
		log.info("Upload Avatar (filename): " + avatar.getOriginalFilename());
		if (newUser != null) {
			log.info("Upload Avatar: " + newUser.getAvatar());

			try {
				// Include owners userid when uploading a file. if not provided, the default is 'system'
				String newId = remoteFileService.uploadFile(avatar, id);
				log.info("Avatar new ID: " + newId);
				// Change the avatar field in the UserDTO Entity
				newUser.setAvatar(newId);
				newUser = userService.update(newUser).get();
			} catch (Exception e) {
				log.error("Error: ", e.getMessage());
				return new Resource<>(null);
			}
		} else {
			return new Resource<>(null);
		}

		return new Resource<>(newUser);
	}

    
	@RequestMapping(value = "uploadAttachments/loginUser", method = RequestMethod.POST)
    public Resource<UserDTO> loginUser(@RequestBody UserDTO input) {
		
		UserDTO user = userService.getUserByEmail("johnstein@gmail.com").orElse(null);
		
		if (user != null) {
			log.info("Login User: " + user);
		} else {
			log.info("Login User:  User not found!");
		}
		
        return new Resource<>(user);
    }

	@RequestMapping(value = "/searchProfession", method = RequestMethod.POST)
	public Resources<ProfessionDTO> searchProfession(@RequestBody String search) {
		log.info("Profession Search - begin:  " + search.substring(7,search.length()));
		String searchTerm = search.substring(7,search.length());
		// fix for multi-word query. error caused because searchTerm is submitted with '+' in place of ' '(space)
		searchTerm = searchTerm.replace('+', ' ');
		Collection<ProfessionDTO> professions = professionService.findByTitleContainsIgnoreCase(searchTerm, 0, 999, "title").getContent();

		log.info("Profession Search:" + professions.size());
		log.info(professions.toString());
		return new Resources<>(professions);
	}

	@RequestMapping(value = "/getProfessionsList", method = RequestMethod.POST)
	public Resources<ProfessionDTO> getProfessionsList() {
		log.info("Get Professions list");
		Collection<ProfessionDTO> professions = professionService.findAll(0, 999, "title").getContent();

		log.info("Professions List:" + professions.size());
		log.info(professions.toString());
		return new Resources<>(professions);
	}

	@RequestMapping(value = "/userSearch", method = RequestMethod.POST)
    public Resources<UserDTO> userSearch(@RequestBody String search) {
        log.info("User Search - begin:  " + search.substring(7,search.length()));
        String searchTerm = search.substring(7,search.length());
		searchTerm = searchTerm.replace('+', ' ');
		Collection<UserDTO> users = userService.searchByKeyword(searchTerm, "1", 0, 999).getContent();
		
        log.info("User Search:" + users.size());
		return new Resources<>(users);
    }

    @RequestMapping(value = "/findUserByAvatar", method = RequestMethod.POST)
    public Resource<UserDTO> findUserByAvatar(@RequestBody String avatar) {
        log.info("Find User by Avatar: " + avatar.substring(7,avatar.length()));
        String searchTerm = avatar.substring(7,avatar.length());
        
        PagedResources<UserDTO> users = userService.findByAvatar(searchTerm, 0, 99, "");
        
		UserDTO user = null;
		if(users != null) {
			user = users.iterator().next();
		}
        if (user != null) {
            log.info("Find User: " + user.toString());
        }
        return new Resource<>(user);
    }

	@RequestMapping(value = "/findUserById", method = RequestMethod.POST)
	public Resource<UserDTO> findUserById(@RequestBody RequestDTO input) throws Exception {
		log.info("Find User By Id");
		log.info(input.toString());

		UserDTO user = userService.getUserById(input.getId()).get();

		if (user != null) {
			if (user.getLat() == 0 || user.getLng() == 0) {
				String address = user.getBusinessAddress1()+", "+user.getBusinessCity()+", "+user.getBusinessState()+", "+user.getBusinessZip();
				if (!address.isEmpty()) {
					GeocodingResult[] results = GeocodingApi.geocode(context, address).await();
					if (results.length > 0) {
						log.info("Geo-coding Result: " + results[0].formattedAddress);
						double latitude = results[0].geometry.location.lat;
						double longitude = results[0].geometry.location.lng;
						user.setLat(latitude);
						user.setLng(longitude);
						userService.update(user);
					}
				}

			}
		} else {
			log.info("User doesn't exist!");
			return null;
		}
		return new Resource<>(user);
	}

	@RequestMapping(value = "/getUserById", method = RequestMethod.POST)
	public Resource<UserDTO> getUserById(@RequestBody RequestDTO input) throws Exception {
		log.info("Get User By Id");
		log.info(input.toString());

		UserDTO user = userService.getUserById(input.getId()).get();

		if (user == null) {
			log.info("User doesn't exist!");
			return null;
		}

		return new Resource<>(user);
	}

	@RequestMapping(value = "/getMarker", method = RequestMethod.POST)
	public Resource<UserDTO> getMarker(@RequestBody UserDTO search) throws Exception {
		log.info("Find Marker for user: " + search.toString());

		Markers markers = new Markers();
		double x = 0;
		double y = 0;
		double z = 0;

		UserDTO user = userService.getUserById(search.getId()).get();


		if (user != null) {

			if (user.getLat() == 0.0 && user.getLng() == 0.0) {
				String address = user.getBusinessAddress1() + ", " + user.getBusinessCity() + ", " + user.getBusinessState() + ", " + user.getBusinessZip();
				GeocodingResult[] results = GeocodingApi.geocode(context, address).await();
				if (results.length > 0) {
					log.info("Geo-coding Result: " + results[0].formattedAddress);
					double latitude = results[0].geometry.location.lat;
					double longitude = results[0].geometry.location.lng;
					user.setLat(latitude);
					user.setLng(longitude);
					userService.update(user);
					latitude = latitude * Math.PI / 180;
					longitude = longitude * Math.PI / 180;

					x += Math.cos(latitude) * Math.cos(longitude);
					y += Math.cos(latitude) * Math.sin(longitude);
					z += Math.sin(latitude);
				}
			} else {
				log.info("Lng-Lat already exist: " + user.getLng() + " - " + user.getLat());
			}


		}

		return new Resource<>(user);
	}

	@RequestMapping(value = "/getMarkers", method = RequestMethod.POST)
	public Resource<Markers> getMarkers(@RequestBody SearchTerm search) throws Exception {
		log.info("Find Markers on Search: " + search.toString());

		Markers markers = new Markers();
		double x = 0;
		double y = 0;
		double z = 0;

		Collection<UserDTO> users = userService.findUsers(search.getName(), search.getProfession(), search.getCity(), search.getState(), "", 0, 99, "").getContent();

		if (users != null) {
			log.info("findUsers: " + users.toString());
			for (UserDTO user:users) {
				if (user.getLat() == 0.0 && user.getLng() == 0.0) {
					String address = user.getAddress1() + ", " + user.getCity() + ", " + user.getState() + ", " + user.getZip();
					GeocodingResult[] results = GeocodingApi.geocode(context, address).await();
					if (results.length > 0) {
						log.info("Geo-coding Result: " + results[0].formattedAddress);
						double latitude = results[0].geometry.location.lat;
						double longitude = results[0].geometry.location.lng;
						user.setLat(latitude);
						user.setLng(longitude);
						userService.update(user);
						latitude = latitude * Math.PI / 180;
						longitude = longitude * Math.PI / 180;

						x += Math.cos(latitude) * Math.cos(longitude);
						y += Math.cos(latitude) * Math.sin(longitude);
						z += Math.sin(latitude);
					}
				} else {
					log.info("Lng-Lat already exist: " + user.getLng() + " - " + user.getLat());
				}
			}

			markers.setMarkers(users);

			double total = users.size();
			x = x / total;
			y = y / total;
			z = z / total;

			double centralSquareRoot = Math.sqrt(x * x + y * y);
			double centralLongitude = Math.atan2(y, x);
			double centralLatitude = Math.atan2(z, centralSquareRoot);

			markers.setLat(centralLatitude * 180 / Math.PI);
			markers.setLng(centralLongitude * 180 /Math.PI);

		}

		return new Resource<>(markers);
	}

	@RequestMapping(value = "/redirectToForgotPassword", method = RequestMethod.POST)
	public Resource<RequestDTO> redirectToForgotPassword(@RequestBody UserDTO input)  throws Exception {
		RequestDTO request = new RequestDTO();
		UserDTO toUser = userService.getUserById(input.getId()).orElse(null);
		if (toUser == null) {
			request.setError("User not found");
			log.info("Change Password User not found! ");
		} else {
			log.info("Change Password User found: " + toUser);
			String jwtToken = tokenHandler.createTokenForUser(toUser.getEmail());
			request.setRedirectUrl("https://thereferralportal.com/forgotPassword/"+jwtToken);
			request.setToUser(toUser);
		}
		return new Resource<>(request);
	}

	@RequestMapping(value = "/passwordHelp", method = RequestMethod.POST)
	public Resource<RequestDTO> passwordHelp(@RequestBody UserDTO input)  throws Exception {
		RequestDTO request = new RequestDTO();
		UserDTO toUser =  userService.getUserByEmail(input.getEmail()).orElse(null);
		if (toUser == null) {
			request.setError("User not found");
			log.info("Forgot Password User not found! ");
		} else {
			log.info("Forgot Password User found: " + toUser);
			UserDTO fromUser = toUser;
			String jwtToken = tokenHandler.createTokenForUser(toUser.getEmail());
			String reason = "Forgot Password";
			String htmlText = "";
			if (!toUser.getFirstName().equals("")) {
				htmlText = 	"<p>Dear "+ toUser.getFirstName() + ",</p>";
			}
			htmlText = htmlText + "<p>A request was submitted to reset your Latch Inc. password associated with this email address. If you submitted this request and would like to reset your password, please click the link below. If you did not submit the reset request, you may ignore this email, and your password will not be changed.</p>";
			htmlText = htmlText + "<p> ";
			htmlText = htmlText + " <a href=\"https://thereferralportal.com/forgotPassword/"+jwtToken+"\">Click here</a> to reset your password.</p><p>Sincerely,</p><p>The Latch Team.</p>";
			String text = this.html2text(htmlText);
			String subject = "Latch Forgot Password";
			CommunicationDTO newComm = this.buildNotification(reason, fromUser, toUser, htmlText, text, subject);
			this.communicationService.sendCommunication(newComm);
			request.setToUser(toUser);
		}
		return new Resource<>(request);
	}

	@RequestMapping(value = "/verifyHelpEmailSend", method = RequestMethod.POST)
	public Resource<RequestDTO> verifyHelpEmailSend(@RequestBody UserDTO input)  throws Exception {
		RequestDTO request = new RequestDTO();
		UserDTO toUser =  userService.getUserByEmail(input.getEmail()).orElse(null);
		if (toUser == null) {
			request.setError("User not found");
			log.info("Verify Help User not found! ");
		} else {
			log.info("Verify Help User found: " + toUser);
			UserDTO fromUser = toUser;
			String jwtToken = tokenHandler.createTokenForUser(toUser.getEmail());
			String reason = "Verify Latch Account";
			String htmlText = "";
			if (!toUser.getFirstName().equals("")) {
				htmlText = 	"<p>Dear "+ toUser.getFirstName() + ",</p>";
			}
			htmlText = htmlText + "<p>A request was submitted to resend the verifycation email associated with this email address. If you submitted this request and would like to verify your account, please click the link below. If you did not submit the request, you may ignore this email, and your account will not be changed.</p>";
			htmlText = htmlText + "<p> ";
			htmlText = htmlText + " <a href=\"https://thereferralportal.com/authenticate/"+jwtToken+"\">Click here</a> to authenticate your account.</p><p>Sincerely,</p><p>The Latch Team.</p>";
			String text = this.html2text(htmlText);
			String subject = "Verify Latch Account";
			CommunicationDTO newComm = this.buildNotification(reason, fromUser, toUser, htmlText, text, subject);
			this.communicationService.sendCommunication(newComm);
			request.setToUser(toUser);
		}
		return new Resource<>(request);
	}

	@RequestMapping(value = "/checkUserExists", method = RequestMethod.POST)
	public Resource<RequestDTO>   checkUserExists(@RequestBody UserDTO input)  throws Exception {
		RequestDTO request = new RequestDTO();
		UserDTO toUser =  userService.getUserByEmail(input.getEmail()).orElse(null);
		if (toUser == null) {
			request.setError("User not found");
			log.info("User not found: " + toUser);
		} else {
			log.info("User found: " + toUser);
			request.setToUser(toUser);
		}
		return new Resource<>(request);
	}

	@RequestMapping(value = "/changePassword", method = RequestMethod.POST)
	public Resource<UserDTO>   changePassword(@RequestBody UserDTO input)  throws Exception {
		log.info("Reset password for User: " + input.toString());
		UserDTO user =  userService.getUserById(input.getId()).orElse(null);
		if (user == null) {
			log.info("User not found: " + user);
		} else {
			user.setPassword(UserService.PASSWORD_ENCODER.encode(input.getPassword()));
			user = userService.update(user).get();
		}
		return new Resource<>(user);
	}

}