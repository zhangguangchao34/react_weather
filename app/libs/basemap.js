
function baseLayers() {
    var that = this;
    this.gagomap = function (option) {
        that.map = L.map(option.id, {
            contextmenu: true,
            maxZoom: option.maxZoom,
            minZoom: option.minZoom,
            center: option.center,
            zoom: option.zoom
        });
        return that.map;
    }
    this.addbasemap = function () {
        var GOOGLE = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: "佳格天地",
            minZoom: 12
        });

        var imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
            maxZoom: 20,
            minZoom: 12,
            zIndex: 16
        });
        var googleimg = L.layerGroup([GOOGLE, imga]);
        var baseLayers = {
            "高清影像": googleimg.addTo(that.map),
            "电子底图": L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
                subdomains: "1234"
            })
        };
        var controlLayer = L.control.layers(baseLayers, {}, {
            position: 'topleft',
            collapsed: true
        }).addTo(that.map);
        return controlLayer;
    }
    //option{url:url,getID:codeid,style:function(feature){return style},onClick:function(){}}
    this.addtillLayer = function (option) {
        var config = {
            url: option.url,
            debug: false,
            mutexToggle: true,
            zIndex: 99999999,
            getIDForLayerFeature: function (feature) {
                return feature.properties[option.getID];
            },
            style: option.style,
            onClick: option.onClick
        };

        var mvtSource = new L.TileLayer.MVTSource(config);
        that.map.addLayer(mvtSource);
        return mvtSource;
    }
};
module.exports.basemap = baseLayers;

L.TileLayer.ChinaProvider = L.TileLayer.extend({

    initialize: function (type, options) { // (type, Object)
        var providers = L.TileLayer.ChinaProvider.providers;

        var parts = type.split('.');

        var providerName = parts[0];
        var mapName = parts[1];
        var mapType = parts[2];

        var url = providers[providerName][mapName][mapType];
        options.subdomains = providers[providerName].Subdomains;

        L.TileLayer.prototype.initialize.call(this, url, options);
    }
});

L.TileLayer.ChinaProvider.providers = {
    TianDiTu: {
        Normal: {
            Map: "http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}",
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}",
        },
        Satellite: {
            Map: "http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}",
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}",
        },
        Terrain: {
            Map: "http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}",
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}",
        },
        Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    },

    MapABC: {
        Normal: {
            Map: 'http://emap{s}.mapabc.com/mapabc/maptile?&x={x}&y={y}&z={z}'
        },
        Subdomains: ["0", "1", "2", "3"]
    },

    GaoDe: {
        Normal: {
            Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        },
        Satellite: {
            Map: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
        },
        Subdomains: ["1", "2", "3"]
    }
};

L.tileLayer.chinaProvider = function (type, options) {
    return new L.TileLayer.ChinaProvider(type, options);
};
/*baseLayers = {
    "高德地图": L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: "1234"
    }),
    '高德影像': L.layerGroup([L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
        subdomains: "1234"
    }), L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}', {
        subdomains: "1234"
    })]),
    'GeoQ午夜蓝': L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}').addTo(map)
};
var layerControl = L.control.layers(baseLayers, {}, { position: 'topleft', collapsed: true }).addTo(map);*/
