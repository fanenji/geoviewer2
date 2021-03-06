<template>
    <div id="gv-legend" class="gv-inverted-color-scheme">
        <div class="gv-legend-title gv-color-scheme">
            <b>LEGENDA</b>
            <button class="gv-legend-close" type="button" @click="hideLegend">×</button>
            <el-button v-show="showAddMap" type="primary" @click="addMap" class="gv-inverted-color-scheme gv-legend-add ms ms-layers-add" size="mini">
                <span> CATALOGHI </span>
            </el-button>
        </div>
        <div id="gv-legend-body">
            <ul v-for="map in maps" class="gv-list-group">
                <div class="gv-list-legend-map-item gv-inverted-color-scheme">
                <li>
                    {{map.name}}
                </li>
                <div v-if="checkAddMap(map)" class="gv-legend-map-info gv-inverted-color-scheme">
                    <el-button title="Visualizza scheda" type="primary" @click="showMapInfoPanel(map)" class="gv-legend-map-info-button fa fa-file-text-o" size="mini">
                        <!--<span> SCHEDA</span>-->
                    </el-button>
                    <el-button title="Cancella" type="primary" @click="remove(map)" class="gv-legend-map-info-button fa fa-trash" size="mini">
                    </el-button>
                </div>
                </div>
                <ul class="gv-list-group">
                    <li v-for="layer in map.layers" :layer="layer" :class="getClass(layer)">
                        <img class="gv-legend-layer-icon" :src="iconUrl(layer)" @click="showLegendPanel(layer)">
                        <span class="gv-layer-visibility-span"><input type="checkbox" class="gv-layer-visibility-cb"
                                                                      v-model="layer.visible"
                                                                      @click="setLayerVisible(layer, $event)"></span>
                        <span class="gv-layer-title-span">{{layer.legend.label}}</span>
                    </li>
                </ul>
            </ul>
            <div class="gv-legend-footer gv-inverted-color-scheme">
                <gv-base-layer-switcher v-show="showBaseLayerSwitcher" :base-layers="baseLayers"></gv-base-layer-switcher>
            </div>
        </div>
    </div>
</template>


<script>
    'use strict'
    import Vue from 'vue'
    import Map from '../leaflet/Map.js'
    import GV from '../GV'
    import * as config from '../config'
    import mountComponent from '../util/mountComponent'

    import MapInfoPanel from './MapInfoPanel.vue'
    Vue.component('gv-map-info-panel', MapInfoPanel)
    import BaseLayerSwitcher from './BaseLayerSwitcher.vue'
    Vue.component('gv-base-layer-switcher', BaseLayerSwitcher)
    import MultiLegendPanel from './MultiLegendPanel.vue'
    Vue.component(MultiLegendPanel.name, MultiLegendPanel)
    import MapCatalogPanel from './MapCatalogPanel.vue'
    Vue.component('gv-map-catalog-panel', MapCatalogPanel)

    import { Select, Option, Button } from 'element-ui'
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Button)

    export default {
        name: 'gv-legend',
        props: ['showAddMap', 'showBaseLayerSwitcher', 'showInfoMap','showBaseLayerSwitcher','baseLayers','maps'],
        data () {
            return {
            }
        },
        mounted () {
            if (GV.app.debug) console.log('gv-legend: mounted')
        },
        methods: {
            checkAddMap(map) {
                return (this.showAddMap && config.getMapConfig(map.id).metaData)
            },
            hideLegend: function (event) {
                config.setButtonOption('legend', 'show', false)
            },
            showMapInfoPanel: function (map) {

                //alert(map.id)

                config.schedaInfoCartografia = config.getMapConfig(map.id).metaData
                mountComponent({
                    elId: 'gv-map-info-panel',
                    clear: true,
                    vm: new Vue({
                        template: `<gv-map-info-panel v-draggable visible="true" idMap="${map.id}"></gv-map-info-panel>`
                    })
                })
            },
            remove: function (map) {
                config.removeMap(map.id)
            },
            addMap: function () {
                //GV.app.addRlMap(1735)
                mountComponent({
                    elId: 'gv-map-catalog-panel',
                    toggleEl: true,
                    vm: new Vue({
                        template: `<gv-map-catalog-panel visible="true"></gv-map-catalog-panel>`
                    })
                })
                //console.log(this.addMapConfig.panels)
            },
            iconUrl: function (layer) {
                return layer.legend.icon
            },
            getClass: function (layer) {
                return (layer.inRange) ? 'gv-list-legend-layer-item' : 'gv-list-legend-layer-item gv-list-legend-layer-disabled-item'
            },
            setLayerVisible: function (layer, event) {
                GV.map.setLayerVisible(layer, event.currentTarget.checked)
            },
            showLegendPanel: function (layer) {
                if (layer.inRange && (layer.multiClasse || layer.legend.popUpFlag)) {
                    //if ((layer.multiClasse || layer.legend.popUpFlag)) {
                    var url = null, html = null, width, height
                    if (layer.legend.popUpUrl && layer.legend.popUpFlag) {
                        // se impostato attributo legendPopupUrl apro una finestra con il documento
                        url = layer.legend.popUpUrl
                        width = (util.SMALL_SCREEN) ? 400 : 600
                        height = (util.SMALL_SCREEN) ? 400 : 600
                    } else if (layer.multiClasse) {
                        // se livello multiclasse apro una finestra con la legenda dei livelli multiclasse
                        if (layer.flagGeoserver) {
                            url = `${layer.wmsParams.url}LAYER=${layer.name}&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&`
                            width = 400
                            height = 350
                        } else {
                            var classes = layer.classes
                            html = '<table width=100% border=0>'
                            classes.forEach(function (cls) {
                                html += '<tr>'
                                html += '<td width=30><img src="' + cls.legendIcon + '"></td>'
                                html += '<td >' + cls.legendLabel + '</td>'
                                html += '</tr>'
                            })
                            html += '</table>'
                        }
                    }

                    mountComponent({
                        elId: 'gv-multi-legend-panel',
                        vm: new Vue({
                            template: `<gv-multi-legend-panel v-draggable visible="true" :src="src" :html="html" :height="height" :width="width" :title="title"></gv-multi-legend-panel>`,
                            data: {
                                title: `LEGENDA - ${layer.legend.label}`,
                                src: url,
                                html: html,
                                width: width,
                                height: height
                            }
                        })
                    })
                }
            }

        }
    }
</script>

<style scoped>

    .gv-legend-title {
        position: relative;
        display: block;
        padding: 0.3rem 0.5rem;
        margin-bottom: -1px;
        color: #ccc;
        cursor: default;
        font-weight: bold;
    }

    .gv-legend-title span {
        font-size: 14px;
        font-weight: bold;
    }

    .gv-legend-close {
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        float: right;
        font-size: 1rem;
        line-height: 1;
        font-weight: bold;
        color: #ffffff;
        margin-left: 5px;
        margin-right: 3px;
        margin-top: 3px;
        opacity: .5;
    }
    .gv-legend-add {
        cursor: pointer;
        margin-right: 10px;
        border: 0;
        -webkit-appearance: none;
        float: right;
        line-height: 1;
        font-size: 12px;
    }

    .gv-legend-add span {
        font-family: "Raleway",Arial,sans-serif !important;
        font-size: 14px;
        font-weight: bold;
    }

    .gv-list-group {
        padding-left: 0;
        margin-top: 0;
        margin-bottom: 0;
        background-color: #fff;
        width: 260px;
    }

    .gv-list-legend-layer-item {
        position: relative;
        display: block;
        /* padding: 0.1rem 0.5rem; */
        padding-left: 0.3rem;
        margin-bottom: -2px;
        margin-top: -2px;
        background-color: #fff;
        border: 1px solid #ddd;
    }

    .gv-list-legend-layer-disabled-item {
        opacity: 0.3;
        filter: alpha(opacity=30);
    }

    .gv-legend-layer-icon {
        /* padding: 2px 2px 2px 2px; */
        padding-top: 3px;
    }

    .gv-legend-layer-icon img {
        width: 24px;
        height: 24px;
    }


    .gv-legend-map-info {
        position: relative;
/* ALlineato a destra
        padding: 0rem 13.5rem;
*/
        width: 260px;
    }

    .gv-list-legend-map-item {
        position: relative;
        display: block;
        padding: 0.1rem 0.5rem;
        margin-bottom: -1px;
        border: 1px solid #ddd;
        font-size: 13px;
        font-weight: bold;
    }

    .gv-legend-map-info-button {
        position: relative;
        right: 0;
        bottom: 0;
        margin-bottom: 5px;
        font-size: 14px;
    }

    .gv-legend-map-info span {
        font-family: "Raleway",Arial,sans-serif !important;
        font-size: 12px;
        font-weight: bold;
    }

    .gv-layer-visibility-span {
        position: absolute;
        top: 16%;
        left: 29px;
    }

    .gv-layer-title-span {
        position: absolute;
        top: 50%;
        left: 55px;
        margin-top: -7px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        max-width: 180px;
    }

    .gv-legend-footer {
        position: relative;
        display: block;
        padding: 0.3rem 0.5rem;
        margin-bottom: -1px;
        width: 260px;
        cursor: default;
    }

    #gv-legend {
        position: absolute;
        right: 0;
        top: 0;
        margin-right: 10px;
        margin-top: 10px;
        width: 260px;
        z-index: 800;
        max-height: 430px;
    }

    #gv-legend-title {
        height: 30px;
    }

    /*

    #gv-legend-body {
        position: absolute;
        width: 260px;
        max-height: 400px;
        cursor: default;
        overflow-y: auto;
        overflow-x: hidden;
    }

    */

    #gv-legend-body {
        position: absolute;
        width: 260px;
        max-height: 400px;
        cursor: default;
        overflow: hidden;
    }

    #gv-legend-body:hover {
        overflow-y: scroll;
    }

</style>
