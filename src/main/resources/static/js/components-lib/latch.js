'use strict';

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
    componentDidMount: function componentDidMount() {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 100
                    }, 1000);
                    return false;
                }
            }
        });
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll <= 180) {
                $("#main-nav").removeClass("active");
            } else {
                $("#main-nav").addClass("active");
            }
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'mobile-bg-fix-img-wrap' },
                React.createElement('div', { className: 'mobile-bg-fix-img' })
            ),
            React.createElement(
                'div',
                { className: 'mobile-bg-fix-whole-site' },
                React.createElement(
                    'header',
                    { id: 'home', className: 'header menu-align-center' },
                    React.createElement(
                        'div',
                        { id: 'main-nav', className: 'navbar navbar-inverse bs-docs-nav', role: 'banner' },
                        React.createElement(
                            'div',
                            { className: 'container' },
                            React.createElement(
                                'div',
                                { className: 'navbar-header responsive-logo' },
                                React.createElement(
                                    'button',
                                    { className: 'navbar-toggle collapsed', type: 'button', 'data-toggle': 'collapse', 'data-target': '.bs-navbar-collapse' },
                                    React.createElement(
                                        'span',
                                        { className: 'sr-only' },
                                        'Toggle navigation'
                                    ),
                                    React.createElement('span', { className: 'icon-bar' }),
                                    React.createElement('span', { className: 'icon-bar' }),
                                    React.createElement('span', { className: 'icon-bar' })
                                ),
                                React.createElement(
                                    'a',
                                    { href: 'https://thereferralportal.com/', className: 'navbar-brand' },
                                    React.createElement('img', { src: '/images/latch/LatchWhiteLogoNoTaglineLargeTransparent.png', alt: 'Latch' })
                                )
                            ),
                            React.createElement(
                                'nav',
                                { className: 'navbar-collapse bs-navbar-collapse collapse', role: 'navigation', id: 'site-navigation' },
                                React.createElement(
                                    'a',
                                    { className: 'screen-reader-text skip-link', href: '#focus' },
                                    'Skip to content'
                                ),
                                React.createElement(
                                    'ul',
                                    { className: 'nav navbar-nav navbar-right responsive-nav main-nav-list' },
                                    React.createElement(
                                        'li',
                                        { className: 'page_item page-item-2' },
                                        React.createElement(
                                            'a',
                                            { href: '#comingsoon' },
                                            'Coming Soon'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: 'page_item page-item-2' },
                                        React.createElement(
                                            'a',
                                            { href: '#team' },
                                            'Our Team'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: 'page_item page-item-2' },
                                        React.createElement(
                                            'a',
                                            { href: '#footer' },
                                            'Contact Us'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { className: 'page_item page-item-2' },
                                        React.createElement(
                                            'a',
                                            { href: '/login' },
                                            'Log in'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'home-header-wrap' },
                        React.createElement(
                            'div',
                            { className: 'header-content-wrap' },
                            React.createElement(
                                'div',
                                { className: 'container' },
                                React.createElement(
                                    'h1',
                                    { className: 'intro-text' },
                                    'Introduce and Refer Service Professionals With Confidence.'
                                ),
                                React.createElement('div', { className: 'big-title-separator' }),
                                React.createElement(
                                    'div',
                                    { className: 'buttons' },
                                    React.createElement(
                                        'a',
                                        { href: '#focus', className: 'btn-child btn btn-primary custom-button yellow-btn goto-focus' },
                                        'Features'
                                    ),
                                    React.createElement(
                                        'a',
                                        { href: '#aboutus', className: 'btn-child btn btn-primary custom-button red-btn goto-focus' },
                                        'What\'s inside'
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { className: 'clear' })
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'main-content', className: 'site-content' },
                    React.createElement(
                        'section',
                        { className: 'focus', id: 'focus' },
                        React.createElement(
                            'div',
                            { className: 'container' },
                            React.createElement(
                                'div',
                                { className: 'section-header' },
                                React.createElement(
                                    'h2',
                                    { className: 'dark-text' },
                                    'THE LATCH SOLUTION'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'section-legend' },
                                    'The LATCH platform enables professional introductions, connections and data analytics to mitigate risk and maximize opportunity.'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-3 col-sm-3 focus-box', 'data-scrollreveal': 'enter left after 0.15s over 1s' },
                                    React.createElement(
                                        'div',
                                        { className: 'service-icon' },
                                        React.createElement(
                                            'div',
                                            { className: 'symbol green pointer' },
                                            React.createElement('i', { className: 'fa fa-share-alt' })
                                        )
                                    ),
                                    React.createElement(
                                        'h3',
                                        { className: 'red-border-bottom' },
                                        'Introduction Engine'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Connect professionals and consumers within your network.'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-3 col-sm-3 focus-box', 'data-scrollreveal': 'enter left after 0.15s over 1s' },
                                    React.createElement(
                                        'div',
                                        { className: 'service-icon' },
                                        React.createElement(
                                            'div',
                                            { className: 'symbol yellow pointer' },
                                            React.createElement('i', { className: 'fa fa-thumbs-up' })
                                        )
                                    ),
                                    React.createElement(
                                        'h3',
                                        { className: 'red-border-bottom' },
                                        'Ratings & Reviews'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Peer & Consumer Review Gathering'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-3 col-sm-3 focus-box', 'data-scrollreveal': 'enter left after 0.15s over 1s' },
                                    React.createElement(
                                        'div',
                                        { className: 'service-icon' },
                                        React.createElement(
                                            'div',
                                            { className: 'symbol light-gray pointer' },
                                            React.createElement('i', { className: 'fa fa-bar-chart' })
                                        )
                                    ),
                                    React.createElement(
                                        'h3',
                                        { className: 'red-border-bottom' },
                                        'Vetting & Scoring'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Proprietary scoring algorithm that will identify the best professionals.'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-3 col-sm-3 focus-box', 'data-scrollreveal': 'enter left after 0.15s over 1s' },
                                    React.createElement(
                                        'div',
                                        { className: 'service-icon' },
                                        React.createElement(
                                            'div',
                                            { className: 'symbol blue pointer' },
                                            React.createElement('i', { className: 'fa fa-search' })
                                        )
                                    ),
                                    React.createElement(
                                        'h3',
                                        { className: 'red-border-bottom' },
                                        'Professional Search'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        'Professionals perform advanced searches to find, connect, and communicate with other professionals.'
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'section',
                        { className: 'about-us', id: 'aboutus' },
                        React.createElement(
                            'div',
                            { className: 'container' },
                            React.createElement(
                                'div',
                                { className: 'section-header' },
                                React.createElement(
                                    'h2',
                                    { className: 'white-text' },
                                    'Platform'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-6 col-md-6 column zerif-rtl-big-title' },
                                    React.createElement(
                                        'div',
                                        { className: 'big-intro', 'data-scrollreveal': 'enter left after 0s over 1s' },
                                        'At home on Desktop or Mobile'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-6 col-md-6 column zerif_about_us_center', 'data-scrollreveal': 'enter bottom after 0s over 1s' },
                                    React.createElement(
                                        'p',
                                        null,
                                        'Our SaaS based tool and Mobil application manages the complex process of finding and vetting service professionals. Our interface and backend logic connects all the dots saving a person, time and money and ultimately making marketing irrelevant for the best service professionals.'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-6 col-md-6 column zerif-rtl-skills ' },
                                    React.createElement(
                                        'ul',
                                        { className: 'skills', 'data-scrollreveal': 'enter right after 0s over 1s' },
                                        React.createElement('li', { className: 'skill' }),
                                        React.createElement('li', { className: 'skill' }),
                                        React.createElement('li', { className: 'skill' }),
                                        React.createElement('li', { className: 'skill' })
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'section',
                        { className: 'coming-soon', id: 'comingsoon' },
                        React.createElement(
                            'div',
                            { className: 'container' },
                            React.createElement(
                                'div',
                                { className: 'section-header' },
                                React.createElement(
                                    'h2',
                                    { className: 'white-text' },
                                    'Coming Soon'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'splash-image' },
                                    React.createElement('img', { src: '/images/latch-2-coming-soon.png', alt: 'Latch 2.0 Coming Soon!' })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'section',
                        { className: 'our-team', id: 'team' },
                        React.createElement(
                            'div',
                            { className: 'container' },
                            React.createElement(
                                'div',
                                { className: 'section-header' },
                                React.createElement(
                                    'h2',
                                    { className: 'dark-text' },
                                    'OUR TEAM'
                                ),
                                React.createElement('div', { className: 'section-legend' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'row', 'data-scrollreveal': 'enter left after 0s over 0.1s' },
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-4 col-sm-4 team-box' },
                                    React.createElement(
                                        'div',
                                        { className: 'team-member' },
                                        React.createElement(
                                            'figure',
                                            { className: 'profile-pic' },
                                            React.createElement('img', { src: '/images/latch/steve-liscinsky.jpg', alt: 'Uploaded image' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'member-details' },
                                            React.createElement(
                                                'h3',
                                                { className: 'dark-text red-border-bottom' },
                                                'Steve Liscinsky'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'position' },
                                                'CTO/COO & Co-Founder/Board Member'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'social-icons' },
                                            React.createElement(
                                                'ul',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    React.createElement(
                                                        'a',
                                                        { href: 'https://www.facebook.com/steve.liscinsky', target: '_blank' },
                                                        React.createElement('i', {
                                                            className: 'fa fa-facebook' })
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    React.createElement(
                                                        'a',
                                                        { href: 'https://twitter.com/steveliscinsky', target: '_blank' },
                                                        React.createElement('i', {
                                                            className: 'fa fa-twitter' })
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    React.createElement(
                                                        'a',
                                                        { href: 'https://www.linkedin.com/in/stephenliscinskyii', target: '_blank' },
                                                        React.createElement('i', {
                                                            className: 'fa fa-linkedin' })
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'details' },
                                            'Senior level Executive with 15+ years as Information Technology Executive with a broad range of proven skills and talents, a standout contributor at every stage of his career.'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-4 col-sm-4 team-box' },
                                    React.createElement(
                                        'div',
                                        { className: 'team-member' },
                                        React.createElement(
                                            'figure',
                                            { className: 'profile-pic' },
                                            React.createElement('img', { src: '/images/latch/bret.jpg', alt: 'Uploaded image' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'member-details' },
                                            React.createElement(
                                                'h3',
                                                { className: 'dark-text red-border-bottom' },
                                                'Bret Engelkemier'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'position' },
                                                'CFO/Board Member'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'social-icons' },
                                            React.createElement(
                                                'ul',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    React.createElement(
                                                        'a',
                                                        { href: 'https://www.linkedin.com/in/bret-engelkemier-43172a9', target: '_blank' },
                                                        React.createElement('i', {
                                                            className: 'fa fa-linkedin' })
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'details' },
                                            'Senior level Executive with 15+ years of experience in global financial markets operating $1B revenue businesses. Proven track record of growing and restructuring trading and capital market businesses around the world both organically and through acquisition. Trading and risk management background with strong quantitative skills, understanding of operations, and control procedures.'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-4 col-sm-4 team-box' },
                                    React.createElement(
                                        'div',
                                        { className: 'team-member' },
                                        React.createElement(
                                            'figure',
                                            { className: 'profile-pic' },
                                            React.createElement('img', { src: '/images/latch/hector.jpg', alt: 'Uploaded image' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'member-details' },
                                            React.createElement(
                                                'h3',
                                                { className: 'dark-text red-border-bottom' },
                                                'Hector Sanchez'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'position' },
                                                'Sr. Software Engineer / UI Expert'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'social-icons' },
                                            React.createElement(
                                                'ul',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    React.createElement(
                                                        'a',
                                                        { href: 'https://www.linkedin.com/in/hectorsanchez1', target: '_blank' },
                                                        React.createElement('i', {
                                                            className: 'fa fa-linkedin' })
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'details' },
                                            'Lead Software Engineer and Full Stack web developer with more than 20 years of experience specializing in front-end architecture and design. Extensive background in full life cycle of software development process including requirements gathering, analysis and design. I love the challenges of the middle and back-end, but enjoy mostly the front-end and UI/UX experience.'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-4 col-sm-4 team-box' },
                                    React.createElement(
                                        'div',
                                        { className: 'team-member' },
                                        React.createElement(
                                            'figure',
                                            { className: 'profile-pic' },
                                            React.createElement('img', { src: '/images/latch/brett.jpg', alt: 'Uploaded image' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'member-details' },
                                            React.createElement(
                                                'h3',
                                                { className: 'dark-text red-border-bottom' },
                                                'Brett Fieber'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'position' },
                                                'Sr. Application Developer, Architect, & DBA'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'social-icons' },
                                            React.createElement(
                                                'ul',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    React.createElement(
                                                        'a',
                                                        { href: 'https://www.linkedin.com/in/brettfieber', target: '_blank' },
                                                        React.createElement('i', {
                                                            className: 'fa fa-linkedin' })
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'details' },
                                            'Senior Software Engineer, MYSQL certified DBA and Full-Stack web developer with more than 20 years of experience building products from the ground up. Has worked in numerous verticals and for companies such as CustomerLink Systems, Franchise Tax Board, and  Communications Systems International.'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-4 col-sm-4 team-box' },
                                    React.createElement(
                                        'div',
                                        { className: 'team-member' },
                                        React.createElement(
                                            'figure',
                                            { className: 'profile-pic' },
                                            React.createElement('img', { src: '/images/latch/troy.jpg', alt: 'Uploaded image' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'member-details' },
                                            React.createElement(
                                                'h3',
                                                { className: 'dark-text red-border-bottom' },
                                                'Troy McFall'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'position' },
                                                'Sr. Cloud Transformation Engineer '
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'social-icons' },
                                            React.createElement(
                                                'ul',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    React.createElement(
                                                        'a',
                                                        { href: 'https://www.linkedin.com/in/troy-mcfall-665b0a1', target: '_blank' },
                                                        React.createElement('i', {
                                                            className: 'fa fa-linkedin' })
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'details' },
                                            'Cloud and Data Center Automation Transformation Engineer with more than 20 years experience in building enterprise infrastructures in and outside of the cloud, using several different enterprise automation technologies for Fortune 500 companies.'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-lg-4 col-sm-4 team-box' },
                                    React.createElement(
                                        'div',
                                        { className: 'team-member' },
                                        React.createElement(
                                            'figure',
                                            { className: 'profile-pic' },
                                            React.createElement('img', { src: '/images/latch/dave.jpg', alt: 'Uploaded image' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'member-details' },
                                            React.createElement(
                                                'h3',
                                                { className: 'dark-text red-border-bottom' },
                                                'Dave Wong'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'position' },
                                                'Sr. Application Developer'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'social-icons' },
                                            React.createElement(
                                                'ul',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    React.createElement(
                                                        'a',
                                                        { href: 'https://www.linkedin.com/in/dave-wong-792420', target: '_blank' },
                                                        React.createElement('i', { className: 'fa fa-linkedin' })
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'details' },
                                            'Highly experienced Web Developer/Designer and UI Architect with more than 16 years experience with the technical expertise and artistic vision to build compelling products and services, and Business Analyst experience to execute on multiple projects and initiatives.'
                                        )
                                    )
                                )
                            ),
                            ' '
                        )
                    )
                ),
                React.createElement(
                    'footer',
                    { id: 'footer', role: 'contentinfo' },
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'div',
                            { className: 'col-md-3 company-details' },
                            React.createElement(
                                'div',
                                { className: 'icon-top red-text' },
                                React.createElement('img', { src: '/images/latch/map25-redish.png', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'zerif-footer-address' },
                                '2998 Douglas Blvd',
                                React.createElement('br', null),
                                'Roseville, CA 95661',
                                React.createElement('br', null),
                                React.createElement('br', null),
                                'Mailing Address:',
                                React.createElement('br', null),
                                '1420 E Roseville Pkwy, Ste 140',
                                React.createElement('br', null),
                                'PO Box 326',
                                React.createElement('br', null),
                                'Roseville, CA 95661'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-3 company-details' },
                            React.createElement(
                                'div',
                                { className: 'icon-top green-text' },
                                React.createElement('img', { src: '/images/latch/envelope4-green.png', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'zerif-footer-email' },
                                React.createElement(
                                    'a',
                                    { href: 'mailto:info@thereferralportal.com' },
                                    'info@thereferralportal.com'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-3 company-details' },
                            React.createElement(
                                'div',
                                { className: 'icon-top blue-text' },
                                React.createElement('img', { src: '/images/latch/telephone65-blue.png', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'zerif-footer-phone' },
                                '(916) 672-2302'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-3 copyright' },
                            React.createElement(
                                'ul',
                                { className: 'social' },
                                React.createElement(
                                    'li',
                                    null,
                                    React.createElement(
                                        'a',
                                        { target: '_blank', href: 'https://www.facebook.com/LatchInc' },
                                        React.createElement('i', { className: 'fa fa-facebook' })
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    null,
                                    React.createElement(
                                        'a',
                                        { target: '_blank', href: 'https://twitter.com/latchinc' },
                                        React.createElement('i', { className: 'fa fa-twitter' })
                                    )
                                )
                            ),
                            React.createElement(
                                'p',
                                { id: 'zerif-copyright' },
                                '© Latch'
                            )
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(ContentForm, null), document.getElementById('content'));