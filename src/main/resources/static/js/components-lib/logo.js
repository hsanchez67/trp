'use strict';

var Logo = React.createClass({ displayName: 'Logo',
    render: function render() {
        return React.createElement('img', { src: '/images/LATCH-Logo-White.png', className: 'image-responsive Header-brandImg' });
    }
});