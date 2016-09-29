var pStyle = {
    color: '#fff',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '300',
    fontSize: '20px',
    letterSpacing: '1px'
};

var divStyle = {
    width: '300px',
    margin: '0 auto'
};

var tableWidth = {
    width: '300px'
};

var tdWidth = {
    width: '100px'
};

var aDims = {
    width: '61px',
    height: '61px'
};

var ContentForm = React.createClass({
    displayName: 'ContentForm',
    componentDidMount: function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 100
                    }, 1000);
                    return false;
                }
            }
        });
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll <= 180) {
                $("#main-nav").removeClass("active");
            } else {
                $("#main-nav").addClass("active");
            }
        });
    },
    render: function () {
        return (
            <div>
                    <div className="mobile-bg-fix-img-wrap">
                        <div className="mobile-bg-fix-img"></div>
                    </div>
                    <div className="mobile-bg-fix-whole-site">
                        <header id="home" className="header menu-align-center">
                            <div id="main-nav" className="navbar navbar-inverse bs-docs-nav" role="banner">
                                <div className="container">
                                    <div className="navbar-header responsive-logo">
                                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
                                            <span className="sr-only">Toggle navigation</span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                        <a href="https://thereferralportal.com/" className="navbar-brand"><img src="/images/latch/LatchWhiteLogoNoTaglineLargeTransparent.png" alt="Latch" /></a>
                                        </div>
                                        <nav className="navbar-collapse bs-navbar-collapse collapse" role="navigation" id="site-navigation">
                                            <a className="screen-reader-text skip-link" href="#focus">Skip to content</a>
                                            <ul className="nav navbar-nav navbar-right responsive-nav main-nav-list">
                                                <li className="page_item page-item-2"><a href="#comingsoon">Coming Soon</a></li>
                                                <li className="page_item page-item-2"><a href="#team">Our Team</a></li>
                                                <li className="page_item page-item-2"><a href="#footer">Contact Us</a></li>
                                                <li className="page_item page-item-2"><a href="/login">Log in</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="home-header-wrap">
                                <div className="header-content-wrap"><div className="container"><h1 className="intro-text">Introduce and Refer Service Professionals With Confidence.</h1><div className="big-title-separator"></div><div className="buttons"><a href="#focus"  className="btn-child btn btn-primary custom-button yellow-btn goto-focus">Features</a><a href="#aboutus"  className="btn-child btn btn-primary custom-button red-btn goto-focus">What&#039;s inside</a></div></div></div><div className="clear"></div></div>
                            </header>
                            <div id="main-content" className="site-content">
                                <section className="focus" id="focus">
                                    <div className="container">
                                        <div className="section-header">
                                            <h2 className="dark-text">THE LATCH SOLUTION</h2><div className="section-legend">The LATCH platform enables professional introductions, connections and data analytics to mitigate risk and maximize opportunity.</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3 col-sm-3 focus-box" data-scrollreveal="enter left after 0.15s over 1s">
                                                <div className="service-icon">
                                                    <div className="symbol green pointer" >
                                                        <i className="fa fa-share-alt"></i>
                                                    </div>
                                                </div>
                                                <h3 className="red-border-bottom">Introduction Engine</h3>
                                                <p>Connect professionals and consumers within your network.</p>
                                            </div>
                                            <div className="col-lg-3 col-sm-3 focus-box" data-scrollreveal="enter left after 0.15s over 1s">
                                                <div className="service-icon">
                                                    <div className="symbol yellow pointer" >
                                                        <i className="fa fa-thumbs-up"></i>
                                                    </div>
                                                </div>
                                                <h3 className="red-border-bottom">Ratings &#038; Reviews</h3>
                                                <p>Peer &amp; Consumer Review Gathering</p>
                                            </div>
                                            <div className="col-lg-3 col-sm-3 focus-box" data-scrollreveal="enter left after 0.15s over 1s">
                                                <div className="service-icon">
                                                    <div className="symbol light-gray pointer" >
                                                        <i className="fa fa-bar-chart"></i>
                                                    </div>
                                                </div>
                                                <h3 className="red-border-bottom">Vetting &#038; Scoring</h3>
                                                <p>Proprietary scoring algorithm that will identify the best professionals.</p>
                                            </div>
                                            <div className="col-lg-3 col-sm-3 focus-box" data-scrollreveal="enter left after 0.15s over 1s">
                                                <div className="service-icon">
                                                    <div className="symbol blue pointer" >
                                                        <i className="fa fa-search"></i>
                                                    </div>
                                                </div>
                                                <h3 className="red-border-bottom">Professional Search</h3>
                                                <p>Professionals perform advanced searches to find, connect, and communicate with other professionals.</p>
                                            </div>
                                        </div>
                                    </div>

                                </section>
                                <section className="about-us" id="aboutus">
                                    <div className="container">
                                        <div className="section-header">
                                            <h2 className="white-text">Platform</h2>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 column zerif-rtl-big-title"><div className="big-intro" data-scrollreveal="enter left after 0s over 1s">At home on Desktop or Mobile</div></div><div className="col-lg-6 col-md-6 column zerif_about_us_center" data-scrollreveal="enter bottom after 0s over 1s"><p>Our SaaS based tool and Mobil application manages the complex process of finding and vetting service professionals. Our interface and backend logic connects all the dots saving a person, time and money and ultimately making marketing irrelevant for the best service professionals.</p></div>
                                            <div className="col-lg-6 col-md-6 column zerif-rtl-skills ">
                                                <ul className="skills" data-scrollreveal="enter right after 0s over 1s">
                                                    <li className="skill">
                                                    </li>
                                                    <li className="skill">
                                                    </li>
                                                    <li className="skill">
                                                    </li>
                                                    <li className="skill">
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="coming-soon" id="comingsoon">
                                    <div className="container">
                                        <div className="section-header">
                                            <h2 className="white-text">Coming Soon</h2>
                                        </div>
                                        <div className="row">
                                            <div className="splash-image">
                                                <img src="/images/latch-2-coming-soon.png" alt="Latch 2.0 Coming Soon!" />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="our-team" id="team"><div className="container"><div className="section-header"><h2 className="dark-text">OUR TEAM</h2><div className="section-legend"></div></div><div className="row" data-scrollreveal="enter left after 0s over 0.1s">
                                <div className="col-lg-4 col-sm-4 team-box">
                                    <div className="team-member">
                                        <figure className="profile-pic">
                                            <img src="/images/latch/steve-liscinsky.jpg" alt="Uploaded image" />
                                        </figure>
                                        <div className="member-details">
                                            <h3 className="dark-text red-border-bottom">Steve Liscinsky</h3>
                                            <div className="position">CTO/COO &amp; Co-Founder/Board Member</div>
                                        </div>
                                        <div className="social-icons">
                                            <ul>
                                                <li><a href="https://www.facebook.com/steve.liscinsky" target="_blank"><i
                                                    className="fa fa-facebook"></i></a></li>
                                                <li><a href="https://twitter.com/steveliscinsky" target="_blank"><i
                                                    className="fa fa-twitter"></i></a></li>
                                                <li><a href="https://www.linkedin.com/in/stephenliscinskyii" target="_blank"><i
                                                    className="fa fa-linkedin"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="details">
                                            Senior level Executive with 15+ years as Information Technology Executive with a broad range of proven skills and talents, a standout contributor at every stage of his career.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-4 team-box">
                                    <div className="team-member">
                                        <figure className="profile-pic">
                                            <img src="/images/latch/bret.jpg" alt="Uploaded image" />
                                        </figure>
                                        <div className="member-details">
                                            <h3 className="dark-text red-border-bottom">Bret Engelkemier</h3>
                                            <div className="position">CFO/Board Member</div>
                                        </div>
                                        <div className="social-icons">
                                            <ul>
                                                <li><a href="https://www.linkedin.com/in/bret-engelkemier-43172a9" target="_blank"><i
                                                    className="fa fa-linkedin"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="details">
                                            Senior level Executive with 15+ years of experience in global financial markets operating $1B revenue businesses. Proven track record of growing and restructuring trading and capital market businesses around the world both organically and through acquisition. Trading and risk management background with strong quantitative skills, understanding of operations, and control procedures.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-4 team-box">
                                    <div className="team-member">
                                        <figure className="profile-pic">
                                            <img src="/images/latch/hector.jpg" alt="Uploaded image" />
                                        </figure>
                                        <div className="member-details">
                                            <h3 className="dark-text red-border-bottom">Hector Sanchez</h3>
                                            <div className="position">Sr. Software Engineer / UI Expert</div>
                                        </div>
                                        <div className="social-icons">
                                            <ul>
                                                <li><a href="https://www.linkedin.com/in/hectorsanchez1" target="_blank"><i
                                                    className="fa fa-linkedin"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="details">
                                            Lead Software Engineer and Full Stack web developer with more than 20 years of experience specializing in front-end architecture and design. Extensive background in full life cycle of software development process including requirements gathering, analysis and design. I love the challenges of the middle and back-end, but enjoy mostly the front-end and UI/UX experience.
                                        </div>
                                    </div>
                                </div>
                                    <div className="col-lg-4 col-sm-4 team-box">
                                        <div className="team-member">
                                            <figure className="profile-pic">
                                                <img src="/images/latch/brett.jpg" alt="Uploaded image" />
                                            </figure>
                                            <div className="member-details">
                                                <h3 className="dark-text red-border-bottom">Brett Fieber</h3>
                                                <div className="position">Sr. Application Developer, Architect, &amp; DBA</div>
                                            </div>
                                            <div className="social-icons">
                                                <ul>
                                                    <li><a href="https://www.linkedin.com/in/brettfieber" target="_blank"><i
                                                        className="fa fa-linkedin"></i></a></li>
                                                </ul>
                                            </div>
                                            <div className="details">
                                                Senior Software Engineer, MYSQL certified DBA and Full-Stack web developer with more than 20 years of experience building products from the ground up. Has worked in numerous verticals and for companies such as CustomerLink Systems, Franchise Tax Board, and  Communications Systems International.
                                            </div>
                                        </div>
                                    </div>
                                <div className="col-lg-4 col-sm-4 team-box">
                                    <div className="team-member">
                                        <figure className="profile-pic">
                                            <img src="/images/latch/troy.jpg" alt="Uploaded image" />
                                        </figure>
                                        <div className="member-details">
                                            <h3 className="dark-text red-border-bottom">Troy McFall</h3>
                                            <div className="position">Sr. Cloud Transformation Engineer </div>
                                        </div>
                                        <div className="social-icons">
                                            <ul>
                                                <li><a href="https://www.linkedin.com/in/troy-mcfall-665b0a1" target="_blank"><i
                                                    className="fa fa-linkedin"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="details">
                                            Cloud and Data Center Automation Transformation Engineer with more than 20 years experience in building enterprise infrastructures in and outside of the cloud, using several different enterprise automation technologies for Fortune 500 companies.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-4 team-box">
                                    <div className="team-member">
                                        <figure className="profile-pic">
                                            <img src="/images/latch/dave.jpg" alt="Uploaded image" />
                                        </figure>
                                        <div className="member-details">
                                            <h3 className="dark-text red-border-bottom">Dave Wong</h3>
                                            <div className="position">Sr. Application Developer</div>
                                        </div>
                                        <div className="social-icons">
                                            <ul>
                                                <li><a href="https://www.linkedin.com/in/dave-wong-792420" target="_blank">
                                                    <i className="fa fa-linkedin"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="details">
                                            Highly experienced Web Developer/Designer and UI Architect with more than 16 years experience with the technical expertise and artistic vision to build compelling products and services, and Business Analyst experience to execute on multiple projects and initiatives.
                                        </div>
                                    </div>
                                </div>
                            </div> </div></section>
                            </div>
                            <footer id="footer" role="contentinfo">
                                <div className="container">
                                    <div className="col-md-3 company-details"><div className="icon-top red-text"><img src="/images/latch/map25-redish.png" alt="" /></div><div className="zerif-footer-address">2998 Douglas Blvd<br />
                                        Roseville, CA 95661<br />
                                        <br />
                                        Mailing Address:<br />
                                        1420 E Roseville Pkwy, Ste 140<br />
                                        PO Box 326<br />
                                        Roseville, CA 95661</div></div><div className="col-md-3 company-details"><div className="icon-top green-text"><img src="/images/latch/envelope4-green.png" alt="" /></div><div className="zerif-footer-email"><a href="mailto:info@thereferralportal.com">info@thereferralportal.com</a></div></div><div className="col-md-3 company-details"><div className="icon-top blue-text"><img src="/images/latch/telephone65-blue.png" alt="" /></div><div className="zerif-footer-phone">(916) 672-2302</div></div><div className="col-md-3 copyright"><ul className="social"><li><a target="_blank" href="https://www.facebook.com/LatchInc"><i className="fa fa-facebook"></i></a></li><li><a target="_blank" href="https://twitter.com/latchinc"><i className="fa fa-twitter"></i></a></li></ul><p id="zerif-copyright">© Latch</p></div>
                                </div>
                            </footer>
                        </div>
                    </div>
        );
    },
});

ReactDOM.render(
    <ContentForm />,
    document.getElementById('content')
);


