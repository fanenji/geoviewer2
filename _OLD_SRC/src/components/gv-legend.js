
Vue.component('gv-legend', {
    template:
        '<div id="gv-legend">' +
            '<div id="gv-legend-title">' +
                '<div class="gv-panel-title gv-bgcolor">' +
                '<b>LEGENDA</b>' +
                    '<button class="gv-close" type="button" @click="hideLegend">×</button>' +
                    '<button v-show="showAddMap" class="gv-legend-add ms ms-layers-add" title="Aggiungi Mappa" type="button" @click="addMap"></button>' +
                '</div>' +
            '</div>' +
            '<div id="gv-legend-body">' +
                '<ul v-for="map in maps" class="gv-list-group">' +
                    '<li class="gv-list-legend-map-item">{{map.name}}' +
                        '<span v-show="showInfoMap" class="gv-legend-map-info ms ms-information" title="Scheda metadati" @click="showMapInfoPanel(map)"></span>' +
                    '</li>' +
                    '<ul class="gv-list-group">' +
                        '<li v-for="layer in map.layers" :layer="layer" :class="getClass(layer)">' +
                            '<img class="gv-legend-layer-icon" :src="iconUrl(layer)" width="24px" height="24px" @click="showLegendPanel(layer)">' +
                            '<span class="gv-layer-visibility-span"><input type="checkbox" class="gv-layer-visibility-cb" v-model="layer.visible" @click="setLayerVisible(layer, $event)"></span>' +
                            '<span class="gv-layer-title-span">{{layer.legend.label}}</span>' +
                        '</li>' +
                    '</ul>' +
                '</ul>' +
            '</div>' +
        '</div>',
    props: ['showAddMap', 'showInfoMap'],
    data: function () {
        return {
            maps: GV.config.maps
        };
    },
    computed: {
    },
    methods: {
        hideLegend: function(event) {
            GV.config.setButtonOption("legend", "show", false);
        },
        showMapInfoPanel: function (map) {
            "use strict";
            alert(map.id);
        },
        addMap: function() {
            alert('add map');
        },
        iconUrl: function(layer) {
            return layer.legend.icon;
        },
        getClass: function(layer) {
            return (layer.inRange) ? "gv-list-legend-layer-item" : "gv-list-legend-layer-disabled-item";
        },
        setLayerVisible: function(layer,event) {
            GV.map.setLayerVisible(layer, event.currentTarget.checked);
        },
        showLegendPanel: function(layer) {
            if (layer.inRange && (layer.multiClasse || layer.legend.popUpFlag)) {
            //if ((layer.multiClasse || layer.legend.popUpFlag)) {
                var url = null, html = null, width, height;
                if (layer.legend.popUpUrl && layer.legend.popUpFlag) {
                    // se impostato attributo legendPopupUrl apro una finestra con il documento
                    url = layer.legend.popUpUrl;
                    width = (GV.util.SMALL_SCREEN) ? 400 : 600;
                    height = (GV.util.SMALL_SCREEN) ? 400 : 600;
                } else if (layer.multiClasse) {
                    // se livello multiclasse apro una finestra con la legenda dei livelli multiclasse
                    if (layer.flagGeoserver) {
                        url = layer.wmsParams.url + "LAYER=" + layer.name + "&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&";
                        width = 400;
                        height = 350;
                    } else {
                        var classes = layer.classes;
                        html = '<table width=100% border=0>';
                        _.each(classes, function (cls) {
                            html += '<tr>';
                            html += '<td width=30><img src="' + cls.legendIcon + '"></td>';
                            html += '<td >' + cls.legendLabel + '</td>';
                            html += '</tr>';
                        });
                        html += '</table>';
                    }
                }

                var vm = new Vue({
                    template:
                        '<gv-iframe-panel v-draggable visible="true" :src="src" :html="html" :height="height" :width="width" :cls="cls" :title="title"></gv-iframe-panel>' ,
                    data: {
                        title: 'LEGENDA - ' + layer.legend.label,
                        src: url,
                        html: html,
                        width: width,
                        height: height,
                        cls: "gv-legend-multi"
                    },
                    mixins: [GV.dynamicAddedComp]
                });
            }
        }

    }
});