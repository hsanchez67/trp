<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head><style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>
    <meta charset="utf-8">
    <title>Plugin for Contact importer, Friends Inviter, Social login</title>
    
    <meta name="description" content="Social inviter helps user to import contacts and promote your website with marketing content by sending message or invitation to people from all mail servers and social networks.">
    <meta name="keywords" content="Message google friends,friends inviter,contact importer,facebook friends inviter,social network inviter script,contact importer script,contact importer yahoo">
    <meta name="language" content="en">
    <meta name="robots" content="All">
    
    <meta name="copyright" content="socialinviter.com">
    <link rel="image_src" href="http://socialinviter.com/assets/img/icons/brandlogo.jpg">
    <meta name="fragment" content="!">
   
    <script type="text/javascript" src="https://app.customericare.com/api?key=b8c37e33defde51cf91e1e03e51657da"></script><script type="text/javascript" src="https://app.customericare.com/rest/en.js"></script><script type="text/javascript" src="https://app.customericare.com/js/api_package.js"></script>
    <script type="text/javascript" src="https://app.customericare.com/rest/api.js?key=b8c37e33defde51cf91e1e03e51657da&amp;bust=1428740198723"></script><script type="text/javascript" src="https://app.customericare.com/rest/en.js"></script><script type="text/javascript" src="https://app.customericare.com/js/api_package.js"></script>
    <script type="text/javascript" src="https://app.customericare.com/rest/en.js"></script>
    <script type="text/javascript" src="https://app.customericare.com/js/api_package.js"></script>
    <link href="https://app.customericare.com/assets/new_layout/style-plugin/style.css?v=1050" type="text/css">
    <!-- CSS styles -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <link href="assets/css/global.css?bust=009" rel="stylesheet">
    <link href="assets/css/customizer.css?bust=009" rel="stylesheet">
    <link href="./assets/js/plugins/contactimporter.css?bust=009" rel="stylesheet">
    <link href="./assets/js/plugins/socialconnect.css?bust=009" rel="stylesheet">
    <link href="./assets/js/plugins/friendsinviter.css?bust=009" rel="stylesheet">
    <link href="./assets/css/shCoreDefault.css?bust=009" rel="stylesheet">
    <link href="./assets/css/doc.css?bust=009" rel="stylesheet">
    
  
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="assets/js/html5shiv.js"></script>
    <![endif]-->

    <!-- Fav and touch icons -->
    <link rel="shortcut icon" href="assets/ico/favicon.png">

  <script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="configs" src="assets/js/src/configs.js"></script><meta id="viewport" name="viewport" content="width=auto, height=auto, initial-scale=0, minimum-scale=auto"><link rel="stylesheet" type="text/css" href="https://app.customericare.com/assets/new_layout/style-plugin/plugin-font.css?v=1081"><div id="operatorsAvailableFormClose"></div><link rel="stylesheet" type="text/css" href="https://app.customericare.com/assets/new_layout/style-plugin/style.css?v=1081"><link rel="stylesheet" type="text/css" href="https://app.customericare.com/assets/new_layout/style-plugin/plugin-font.css?v=1081"><div id="operatorsAvailableFormClose"></div><link rel="stylesheet" type="text/css" href="https://app.customericare.com/assets/new_layout/style-plugin/style.css?v=1081"><link rel="stylesheet" type="text/css" href="./assets/css/modaloverride.css"><script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="pagenotfound" src="assets/js/src/../app/controller/pagenotfoundcontroller.js?bust=009"></script><script type="text/javascript" src="https://app.customericare.com/rest/en.js"></script><script type="text/javascript" src="https://app.customericare.com/rest/en.js"></script><script type="text/javascript" src="chrome-extension://aadgmnobpdmgmigaicncghmmoeflnamj/ng-inspector.js"></script><link rel="stylesheet" type="text/css" href="./assets/css/modaloverride.css"></head>

  <body ng-app="socialinviter" class="ng-scope bodybg">
    <section ng-controller="SocialController" id="SocialControllerDiv" class="ng-scope">

        <!-- ngInclude:  --><div class="message-holder ng-scope" ng-include="" src="'templates/messaging.html?bust=009'"><div class="alert alert-success ng-scope">
	<a class="close">×</a>
	<span class="alert-message">
	  <strong>Success!</strong> Your message has been sent successfully.
	</span>
</div>
<div class="alert alert-error ng-scope">
    <a class="close">×</a>
    <span class="alert-message">
    	<strong>Error!</strong> A problem has been occurred while submitting your data.
    </span>
</div>
<div class="alert alert-warning ng-scope">
    <a class="close">×</a>
    <span class="alert-message">
    	<strong>Warning!</strong> There was a problem with your network connection.
    </span>
</div>
<div class="alert alert-info ng-scope">
    <a class="close">×</a>
    <span class="alert-message">
    	<strong>Note!</strong> Please read the comments carefully.
    </span>
</div></div>
        <!-- HEADER  ================================================== -->
        <header>
            <!-- ngInclude:  --><div class="navbar-wrapper ng-scope" ng-include="" src="'templates/header.html?bust=009'">
      <div class="container ng-scope">
        <div class="navbar navbar-inverse">
          <div class="navbar-inner">
            <!-- Responsive Navbar Part 1: Button for triggering responsive navbar (not covered in tutorial). Include responsive CSS to utilize. -->
            <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="brand logofnt" ui-sref="root" ng-click="homePage()" href="http://socialinviter.com/#!/">SocialInviter</a>
            <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->
            <div class="nav-collapse collapse">
              <ul class="nav">
                <li class="dropdown">
                  <a class="dropdown-toggle" href="http://socialinviter.com/#!/products" data-toggle="dropdown"><span ui-sref="products" ng-click="otherPage()" class="hand productmenuheader">Products</span> <b class="caret"></b></a>
                 
                </li>
                
                <li><a ui-sref="pricing" ng-click="otherPage()" href="http://socialinviter.com/#!/pricing">Pricing</a></li>
                <li><a ui-sref="trial" ng-click="otherPage()" href="http://socialinviter.com/#!/trial">Free trial</a></li>
                <li><a ui-sref="contactus" ng-click="otherPage()" href="http://socialinviter.com/#!/contactus">Contact us</a></li>
                <li class="dropdown">
                  
                  <ul class="dropdown-menu">
                    <li><a ui-sref="doc" ng-click="otherPage()" href="http://socialinviter.com/#!/doc">Documentation</a></li>
                    <li><a ui-sref="console" ng-click="otherPage()" href="http://socialinviter.com/#!/console">Interactive console</a></li>
                    <li><a ui-sref="feedback" ng-click="otherPage()" href="http://socialinviter.com/#!/feedback">Customer feedback</a></li>
                    <li class="divider"></li>
                    <li class="nav-header">Others</li>
                    <li><a ui-sref="terms" ng-click="otherPage()" href="http://socialinviter.com/#!/terms">Terms &amp; conditions</a></li>
                    <li><a ui-sref="privacy" ng-click="otherPage()" href="http://socialinviter.com/#!/privacy">Privacy policy</a></li>
                    <li><a ui-sref="faq" ng-click="otherPage()" href="http://socialinviter.com/#!/faq">FAQ</a></li>
                  </ul>
                </li>
              </ul>
              <ul class="nav pull-right login-menu-ul">
                <li ng-hide="loginregister!='Login/Register'"><a ng-click="otherPage()" ui-sref="login" href="http://socialinviter.com/#!/login">Login/Register</a></li>
              </ul>
            </div><!--/.nav-collapse -->
        
          </div><!-- /.navbar-inner -->
        </div><!-- /.navbar -->
      </div> <!-- /.container -->
</div>
        </header>
      
        <!-- BODY  ================================================== -->
        <section ng-controller="MainController" id="MainControllerDiv" class="ng-scope">
           
            <!-- uiView:  --><div ui-view="" ng-animate="'wave'" class="ng-scope"><div class="otherpages ng-scope" ng-show="home == false"></div>
<div class="container bodycontainer ng-scope containerbg">
	<div class="trial-panel">
        <!-- Form Name -->
	    <legend>Page not found</legend>
        <table align="center" cellpadding="0" cellspacing="0" width="90%">
        <tbody><tr><td align="center">
        <a class="btn btn-primary" ui-sref="root" href="http://socialinviter.com/#!/">Take Me Home</a>
        <a class="btn btn-secondary marLeft10" ui-sref="contactus" href="http://socialinviter.com/#!/contactus">Contact Support</a>
        </td></tr>
        <tr>
            <td class="filenotfound" align="center">
                <img ng-src="./assets/img/404.jpg" src="./assets/img/404.jpg"></td>
        </tr>
        </tbody></table>
    </div>
</div></div><!-- /.container -->
        </section>

        <!-- FOOTER  ================================================== -->
        <footer>
            <div class="container footer">
                <hr class="bottomline">
                <p class="pull-right"><a ng-click="backToTop()" href="javascript:;">Back to top</a></p>
                <p>© SocialInviter.com · <a ui-sref="privacy" ng-click="otherPage()" href="http://socialinviter.com/#!/privacy">Privacy</a> · <a ui-sref="terms" ng-click="otherPage()" href="http://socialinviter.com/#!/terms">Terms</a> · <a ui-sref="faq" ng-click="otherPage()" href="http://socialinviter.com/#!/faq">FAQ</a> · <a ui-sref="sitemap" ng-click="otherPage()" href="http://socialinviter.com/#!/sitemap">Sitemap</a></p>
            </div>
        </footer>
    </section>
    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    
    <script>
        //require([".../libraries/jquery"]);
    
    </script>

    
    <script type="text/javascript">
        var chatcounter = 0,chatwindowcounter=0;
        var workAroundChat = function () {
            chatcounter = window.setInterval(function () {
                var csstgt = $("link[href*='https://app.customericare']");
                if (csstgt.length > 0) {
                    window.clearInterval(chatcounter);
                    $("head").append('<link rel="stylesheet" type="text/css" href="./assets/css/modaloverride.css">');
                    window.setTimeout(function () {
                        $("head").append('<link rel="stylesheet" type="text/css" href="./assets/css/modaloverride.css">');
                    }, 400);
                }
            }, 100);

        }
        workAroundChat();
    </script>
    

    <!-- Start of StatCounter Code for Default Guide -->
    <script type="text/javascript">
        var sc_project = 10033341;
        var sc_invisible = 1;
        var sc_security = "a26e60d6";
        var scJsHost = (("https:" == document.location.protocol) ?
    "https://secure." : "http://www.");
        document.write("<sc" + "ript type='text/javascript' src='" +
    scJsHost +
    "statcounter.com/counter/counter.js'></" + "script>");
    </script><script type="text/javascript" src="http://www.statcounter.com/counter/counter.js"></script>
    <noscript>&lt;div class="statcounter"&gt;&lt;a title="web analytics"
    href="http://statcounter.com/" target="_blank"&gt;&lt;img
    class="statcounter"
    src="http://c.statcounter.com/10033341/0/a26e60d6/1/"
    alt="web analytics"&gt;&lt;/a&gt;&lt;/div&gt;</noscript>
    <!-- End of StatCounter Code for Default Guide -->
    
  

<style>.ao_plugin {right : 50px; left : auto; } .ao_plugin .ao-2014.ao-plugin-modern-2014 {float: right}.ao-2014.ao-plugin-modern-2014 {background-color: #137ff8;}.ao-2014 .top-2014 span {color: #ffffff}.ao-2014 .ao-btn-orange-2014 {background-color: #f7a023;}.ao-2014 .top-blue-2014 {background-color: #137ff8;}.ao-2014 .ao-btn-2014-talk{color: #ffffff;}.ao-2014 .ao-btn-2014{color:#ffffff;}._ao_plugin .ao-plugin-btn, ._ao_plugin .ao button {color:#ffffff;}.ao-2014-border {background-color: #137ff8;}.ao-plugin-modern-2014 > p {color: #ffffff;font-size: 14px;}.ao-thumbs-wrap i {color: #ffffff;}#ao-cc .ao-cc-top {color: #ffffff; background-color: #137ff8; }#ao-cc .ao-cc-chat-container {background-color: #137ff8;}.loader_1 > div {background-color: #137ff8;}</style><style>.ao_plugin {right : 50px; left : auto; } .ao_plugin .ao-2014.ao-plugin-modern-2014 {float: right}.ao-2014.ao-plugin-modern-2014 {background-color: #137ff8;}.ao-2014 .top-2014 span {color: #ffffff}.ao-2014 .ao-btn-orange-2014 {background-color: #f7a023;}.ao-2014 .top-blue-2014 {background-color: #137ff8;}.ao-2014 .ao-btn-2014-talk{color: #ffffff;}.ao-2014 .ao-btn-2014{color:#ffffff;}._ao_plugin .ao-plugin-btn, ._ao_plugin .ao button {color:#ffffff;}.ao-2014-border {background-color: #137ff8;}.ao-plugin-modern-2014 > p {color: #ffffff;font-size: 14px;}.ao-thumbs-wrap i {color: #ffffff;}#ao-cc .ao-cc-top {color: #ffffff; background-color: #137ff8; }#ao-cc .ao-cc-chat-container {background-color: #137ff8;}.loader_1 > div {background-color: #137ff8;}</style><div class="modal-SI-SC-BG"></div><div class="modal-SI-SC"><div class="modal-SI-holder"><div class="modal-SI-header"><div class="modal-SI-title"><div class="fl"><img class="modal-SI-title-icon" src="//socialinviter.com/assets/img/icons/alert-icon.png"></div><div class="title-modal-text"></div></div><div class="modal-SI-close"><img src="//socialinviter.com/assets/img/icons/close-small.png"></div></div><div class="modal-SI-body"></div></div></div></body>
</html>