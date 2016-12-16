
GV.layerFactory = (function () {
    'use strict';
    var esriLink = '<a href="http://www.esri.com/">Esri</a>';

    return {

        createPane: function (name, zIndex, map) {
            var tilePane = map.getPane('tilePane');
            var pane = map.createPane(name, tilePane);
            pane.style.zIndex = zIndex;
            return pane;
        },

        create: function (layerConfig, map) {
            if (this[layerConfig.type]) {
                var layer = this[layerConfig.type](layerConfig, map);
                layer.legend = layerConfig.legend;
                layer.config = layerConfig;
                return layer;
            } else {
                GV.util.log('Layer di tipo ' + layerConfig.type + ' non gestito',2);
                return null;
            }

        },

        BLANK: function (layerConfig) {
            layerConfig.legend = {
                label: 'Sfondo Bianco'
            };
            return L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{opacity: 0.0});
        },

        OSM: function (layerConfig) {
            layerConfig.legend = {
                label: 'OpenStreetMap'
            };
            return L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            });
        },

        STAMEN_TERRAIN: function (layerConfig) {
            layerConfig.legend = {
                label: 'Stamen Terrain'
            };
            return L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 18,
                ext: 'png'
            });
        },

        STAMEN_TONER_LIGHT: function (layerConfig) {
            layerConfig.legend = {
                label: 'Stamen Toner Light'
            };
            return  L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 20,
                ext: 'png'
            });
        },

        CARTODB_POSITRON: function (layerConfig) {
            layerConfig.legend = {
                label: 'CartoDb Positron'
            };
            return  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                subdomains: 'abcd',
                maxZoom: 19
            });
        },

        CARTODB_DARKMATTER: function (layerConfig) {
            layerConfig.legend = {
                label: 'CartoDb DarkMatter'
            };
            return  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                subdomains: 'abcd',
                maxZoom: 19
            });
        },

        OPENMAPSURFER_ROADS: function (layerConfig) {
            layerConfig.legend = {
                label: 'OpenMapSurfer Roads'
            };
            return L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
                maxZoom: 20,
                attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });
        },

        MAPBOX_STREETS: function (layerConfig) {
            layerConfig.legend = {
                label: 'Mapbox Streets'
            };
            return L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlZmFub3Bhcm9kaSIsImEiOiJjaXRma2VzeWgwMGVmMnh0bzJzMmVjcGVtIn0.2lTBdEwBI6_2QBzboizE5g', {
                attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: 'abcd',
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1Ijoic3RlZmFub3Bhcm9kaSIsImEiOiJjaXRma2VzeWgwMGVmMnh0bzJzMmVjcGVtIn0.2lTBdEwBI6_2QBzboizE5g'
            });
        },

        MAPBOX_SATELLITE: function (layerConfig) {
            layerConfig.legend = {
                label: 'Mapbox Satellite'
            };
            return L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlZmFub3Bhcm9kaSIsImEiOiJjaXRma2VzeWgwMGVmMnh0bzJzMmVjcGVtIn0.2lTBdEwBI6_2QBzboizE5g', {
                attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: 'abcd',
                id: 'mapbox.satellite',
                accessToken: 'pk.eyJ1Ijoic3RlZmFub3Bhcm9kaSIsImEiOiJjaXRma2VzeWgwMGVmMnh0bzJzMmVjcGVtIn0.2lTBdEwBI6_2QBzboizE5g'
            });
        },

        MAPBOX_OUTDOOR: function (layerConfig) {
            layerConfig.legend = {
                label: 'Mapox Outdoor'
            };
            return L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlZmFub3Bhcm9kaSIsImEiOiJjaXRma2VzeWgwMGVmMnh0bzJzMmVjcGVtIn0.2lTBdEwBI6_2QBzboizE5g', {
                attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: 'abcd',
                id: 'mapbox.outdoors',
                accessToken: 'pk.eyJ1Ijoic3RlZmFub3Bhcm9kaSIsImEiOiJjaXRma2VzeWgwMGVmMnh0bzJzMmVjcGVtIn0.2lTBdEwBI6_2QBzboizE5g'
            });
        },

        MAPBOX_LIGHT: function (layerConfig) {
            layerConfig.legend = {
                label: 'Mapox Light'
            };
            return L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlZmFub3Bhcm9kaSIsImEiOiJjaXRma2VzeWgwMGVmMnh0bzJzMmVjcGVtIn0.2lTBdEwBI6_2QBzboizE5g', {
                attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: 'abcd',
                id: 'mapbox.light',
                accessToken: 'pk.eyJ1Ijoic3RlZmFub3Bhcm9kaSIsImEiOiJjaXRma2VzeWgwMGVmMnh0bzJzMmVjcGVtIn0.2lTBdEwBI6_2QBzboizE5g'
            });
        },

        HYDDA: function (layerConfig) {
            layerConfig.legend = {
                label: 'Hydda'
            };
            return L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
                attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });
        },

        ESRI_IMAGERY: function (layerConfig) {
            layerConfig.legend = {label: 'ESRI Imagery'};
            layerConfig.name = layerConfig.type;
            //this.createPane(layerConfig.name, 1, map);
            var attr = 'DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community';
            return L.tileLayer(
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution: '&copy; ' + esriLink + ', ' + attr,
                    maxZoom: 19 //,pane: layerConfig.name
                }
            );
        },

        ESRI_STREETS: function (layerConfig) {
            layerConfig.legend = {label: 'ESRI Streets'};
            layerConfig.name = layerConfig.type;
            //this.createPane(layerConfig.name, 1, map);
            var attr = 'USGS, NOAA';
            return L.tileLayer(
                'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution: '&copy; ' + esriLink + ', ' + attr,
                    maxZoom: 19 //,pane: layerConfig.name
                }
            );
        },

        ESRI_TOPOGRAPHIC: function (layerConfig) {
            layerConfig.legend = {label: 'ESRI Topographic'};
            layerConfig.name = layerConfig.type;
            //this.createPane(layerConfig.name, 1, map);
            var attr = 'USGS, NOAA';
            return L.tileLayer(
                'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution: '&copy; ' + esriLink + ', ' + attr,
                    maxZoom: 19 //,pane: layerConfig.name
                }
            );
        },

        ESRI_GRAY: function (layerConfig) {
            layerConfig.legend = {label: 'ESRI Gray'};
            layerConfig.name = layerConfig.type;
            //this.createPane(layerConfig.name, 1, map);
            var attr = 'HERE, DeLorme, MapmyIndia, OpenStreetMap contributors';
            return L.tileLayer(
                'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution: '&copy; ' + esriLink + ', ' + attr,
                    maxZoom: 16 //,pane: layerConfig.name
                }
            );
        },

        ESRI_DARKGRAY: function (layerConfig) {
            layerConfig.legend = {label: 'ESRI Dark Gray'};
            layerConfig.name = layerConfig.type;
            //this.createPane(layerConfig.name, 1, map);
            var attr = 'HERE, DeLorme, MapmyIndia, OpenStreetMap contributors';
            return L.tileLayer(
                'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution: '&copy; ' + esriLink + ', ' + attr,
                    maxZoom: 16 //,pane: layerConfig.name
                }
            );
        },

        WMS: function (layerConfig) {
            GV.util.log('GV.layerFactory - Creazione Layer WMS: ' + layerConfig.name);

            //this.createPane(layerConfig.name, layerConfig.zIndex, map);

            var format = (layerConfig.geomType === 'VECTOR') ? 'image/png8' : (layerConfig.cacheMinZoomLevel) ? 'image/jpeg' : 'image/png',
                minZoom = (layerConfig.minScale) ? GV.util.getZoomFromScaleDenom(layerConfig.minScale) : 8,
                maxZoom = (layerConfig.maxScale) ? GV.util.getZoomFromScaleDenom(layerConfig.maxScale) : 20,
                url = layerConfig.wmsParams.url,
                name = layerConfig.name,
                opacity = layerConfig.opacity || 1;

            //var tileSize = (layerConfig.cacheMinZoomLevel) ? 256 : 1024;
            if (!layerConfig.flagGeoserver) {
                layerConfig.cacheMinZoomLevel = null;
                format = (layerConfig.geomType === 'VECTOR') ? 'image/png' : 'image/jpeg';
            }

            var options = {
                'transparent': true,
                'FORMAT_OPTIONS': 'antialias:text',
                'layers': name,
                'format': format,
                'opacity': opacity,
                'minZoom': minZoom,
                'maxZoom': maxZoom,
                'bounds': GV.globals.MAX_BOUNDS
                //,'pane': layerConfig.name
            };

            var layer;
            if (layerConfig.cacheMinZoomLevel) {
                _.extend(options, {
                    'tiled': true,
                    'TILESORIGIN': '-20037508,-20037508',
                    'tileSize': 256
                });
                layer = L.tileLayer.wms(url, options);
            } else {
                _.extend(options, {
                    'tiled': false,
                    'pane': 'tilePane'
                });
                layer = L.nonTiledLayer.wms(url, options);
            }

            layer.setZIndex(layerConfig.zIndex);
            layer.type = 'WMS';
            layer.name = name;

            return layer;
        },

        JSON: function (layerConfig) {
            var data = layerConfig.data,
                url = layerConfig.url,
                name = layerConfig.name,
                wfsParams = layerConfig.wfsParams,
                esParams = layerConfig.esParams,
                classes = layerConfig.classes,
                style = layerConfig.style,
                pointToLayer = layerConfig.pointToLayer,
                tooltip = layerConfig.tooltip,
                popup = layerConfig.popup,
                dataType = layerConfig.dataType || 'jsonp',
                cluster = layerConfig.cluster,
                clusterLayer = null;

            var options = {};

            if (classes && classes.length > 0) {
                if (layerConfig.geomSubType === 'POINT') {
                    options.pointToLayer = function (feature, latlng) {
                        var style;
                        _.each(classes, function (cls) {
                            if (cls.filter && cls.filter.key && cls.filter.value) {
                                if (feature.properties[cls.filter.key] === cls.filter.value) {
                                    style = cls.style;
                                }
                            } else {
                                style = cls.style;
                            }
                        });
                        if (style.iconUrl) {
                            var icon;
                            switch (style.iconUrl) {
                                case 'default':
                                    icon = L.icon({
                                        iconUrl: 'http://geoportale.regione.liguria.it/geoviewer2/images/legend/marker-icon.png',
                                        iconSize: [25, 41],
                                        iconAnchor: [12, 41],
                                        popupAnchor: [0, -41]
                                    });
                                    break;
                                case 'default-small':
                                    icon = L.icon({
                                        iconUrl: 'http://geoportale.regione.liguria.it/geoviewer2/images/legend/marker-icon.png',
                                        iconSize: [12, 20],
                                        iconAnchor: [6, 10],
                                        popupAnchor: [0, -20]
                                    });
                                    break;
                                default:
                                    icon = L.icon({
                                        iconUrl: style.iconUrl,
                                        iconSize: style.iconSize,
                                        iconAnchor: style.iconAnchor,
                                        popupAnchor: style.popupAnchor
                                    });
                            }
                            return L.marker(latlng, {icon: icon});
                        } else {
                            return L.circleMarker(latlng, style);
                        }
                    };
                } else {
                    options.style = function (feature) {
                        var style;
                        _.each(classes, function (cls) {
                            if (cls.filter && cls.filter.key && cls.filter.value) {
                                if (feature.properties[cls.filter.key] === cls.filter.value) {
                                    style = cls.style;
                                }
                            } else {
                                style = cls.style;
                            }
                        });
                        return style;
                    };
                }
                options.filter = function(feature) {
                    var visible = false;
                    _.each(classes, function (cls) {
                        if (!cls.filter) {
                            visible = true;
                        } else {
                            if (cls.filter.key && cls.filter.value) {
                                if (feature.properties[cls.filter.key] === cls.filter.value) {
                                    visible = true;
                                }
                            }
                        }
                    });
                    return visible;
                };
            }

            if (style) {
                options.style = style;
            }
            if (pointToLayer) {
                options.pointToLayer = pointToLayer;
            }

            if (tooltip || popup) {
                options.onEachFeature = function (feature, layer) {
                    if (tooltip) {
                        layer.options.title = GV.util.template(tooltip, feature.properties);
                    }
                    if (popup) {
                        layer.bindPopup(GV.util.template(popup, feature.properties));
                    }
                };
            }

            var layer = L.geoJson(data, options);
            layer.name = name;

            layer.setFilter = function(filters) {
                layer.filter = filters;
                if (filters) {
                    layer.eachLayer(function (marker) {
                        var opacity = 0;
                        _.each(filters, function (filter) {
                            if (marker.feature.properties[filter.key] === filter.value) {
                                opacity = layer.config.opacity || 1;
                            }
                        });
                        marker.setOpacity(opacity);
                    });
                } else {
                    layer.eachLayer(function (marker) {
                        var opacity = layer.config.opacity || 1;
                        marker.setOpacity(opacity);
                    });
                }
            };

            var parameters;

            if (wfsParams && wfsParams.typeName && wfsParams.url) {
                parameters = {
                    service: 'WFS',
                    version: '2.0.0',
                    request: 'GetFeature',
                    srsName: 'EPSG:4326',
                    outputFormat: 'text/javascript',
                    format_options: 'callback: getJson',
                    typeName: wfsParams.typeName
                };
                url = wfsParams.url + GV.util.getParamString(parameters);
                dataType = 'jsonp';
            }

            // Gestione livelli puntuali su ElasticSearch
            if (esParams) {
                parameters = {};
                if (esParams.field) {
                    parameters.q = esParams.field + ':';
                    if (esParams.query) {
                        parameters.q +=  esParams.query;
                    } else {
                        parameters.q += '*';
                    }
                } else {
                    if (esParams.query) {
                        parameters.q =  esParams.query;
                    }
                }
                parameters.pretty = 'true';
                parameters.size = 100000;
                //TODO parametro bbox. https://www.elastic.co/guide/en/elasticsearch/reference/1.4/query-dsl-geo-bounding-box-filter.html

                url = GV.config.application.proxy + esParams.url + GV.util.getParamString(parameters);
                dataType = 'json';
            }

            if (url) {
                //TODO gestione jsonp https://github.com/pagekit/vue-resource/issues/35
                Vue.http.get(url).then(function (response) {
                    var data = response.data;
                    var geoJson = data;
                    if (esParams) {
                        var geomField = esParams.geomField || 'location';
                        var features = data.hits.hits;
                        geoJson = {
                            'type': 'FeatureCollection',
                            'totalFeatures': data.hits.total,
                            'features': [],
                            'crs': {
                                'type': 'name',
                                'properties': {
                                    'name': 'urn:ogc:def:crs:EPSG::4326'
                                }
                            }
                        };
                        _.each(features, function (feature) {
                            var coords = feature._source[geomField];
                            geoJson.features.push({
                                'type': 'Feature',
                                'id': feature._id,
                                'geometry': {'type': 'Point', 'coordinates': coords},
                                'geometry_name': 'GEOMETRY',
                                'properties': feature._source
                            });
                        });

                    }
                    layer.addData(geoJson);
                    if (cluster) {
                        clusterLayer.addLayer(layer);
                    }
                }, function (error) {
                    GV.util.log(error,2);
                });

            }

            if (cluster) {
                var clusterOptions = { showCoverageOnHover: false };
                if (cluster.options) {
                    _.extend(clusterOptions, cluster.options);
                }
                clusterLayer = L.markerClusterGroup(clusterOptions);
                return clusterLayer;
            }

            return layer;

        }

    };

}());
