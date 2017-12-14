L.Control.SlideMenu = L.Control.extend({
    options: {
        position: 'topleft',
        width: '300px',
        height: '100%',
        delay: '10'
    },

    initialize: function (innerHTML, options) {
        L.Util.setOptions(this, options);
        // console.log(this);
        this._innerHTML = innerHTML;
        this._startPosition = -(parseInt(this.options.width, 10));
        this._isLeftPosition = this.options.position == 'topleft' ||
        this.options.position == 'buttomleft' ? true : false;
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-slidemenu leaflet-bar leaflet-control');
        var link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single gagolink', this._container);
        var heightbutton=document.body.clientHeight/2-60+'px';
        link.style.top=heightbutton;
        link.title = 'Menu';
        L.DomUtil.create('span', 'fa fa-bars', link);
        /*关闭按钮*/
        var closeButton = L.DomUtil.create('div', 'leaflet-menu-close-button fa gagoclose', this._container);
        closeButton.style.display = 'none';
        closeButton.style.top=heightbutton;
        /*关闭按钮随侧边栏宽度自动调整*/
        var closeButtonss=parseInt(this.options.width.substring(0,this.options.width.length-2))-10;

        this._menu = L.DomUtil.create('div', 'leaflet-menu',
            document.getElementsByClassName('leaflet-container')[0]);
        this._menu.style.width = this.options.width;
        this._menu.style.height = this.options.height;
        if (this._isLeftPosition) {
            closeButton.style.left=closeButtonss+'px';
            this._menu.style.left = '-' + this.options.width;
            closeButton.style.float = 'right';
            L.DomUtil.addClass(closeButton, 'fa-chevron-left');
        }
        else {
            closeButton.style.right=closeButtonss+'px';
            this._menu.style.right = '-' + this.options.width;
            closeButton.style.float = 'left';
            L.DomUtil.addClass(closeButton, 'fa-chevron-right');
        }

        this._contents = L.DomUtil.create('div', 'leaflet-menu-contents', this._menu);
        this._contents.innerHTML = this._innerHTML;
        this._contents.style.clear = 'both';

        L.DomEvent.disableClickPropagation(this._menu);
        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'click', function () {
                // Open
                this._animate(this._menu, this._startPosition, 0, true);

                setTimeout(function(){
                    closeButton.style.display = '';
                }, this.options.delay*30);
            }, this)
            .on(closeButton, 'click', L.DomEvent.stopPropagation)
            .on(closeButton, 'click', function () {
                // Close
                closeButton.style.display = 'none';
                this._animate(this._menu, 0, this._startPosition, false);
            }, this);

        return this._container;
    },

    setContents: function (innerHTML) {
        this._innerHTML = innerHTML;
        this._contents.innerHTML = this._innerHTML;
    },

    _animate: function (menu, from, to, isOpen) {

        if (isOpen ? from > to : from < to) {
            return;
        }

        if (this._isLeftPosition) {
            menu.style.left = from + "px";
        }
        else {
            menu.style.right = from + "px";
        }

        setTimeout(function (slideMenu) {
            var value = isOpen ? from + 10 : from - 10;
            slideMenu._animate(slideMenu._menu, value, to, isOpen);
        }, this.options.delay, this);
    }
});

L.control.slideMenu = function (innerHTML, options) {
    return new L.Control.SlideMenu(innerHTML, options);
}