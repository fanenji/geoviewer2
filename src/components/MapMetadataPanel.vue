<template>
    <div v-draggable class="gv-map-metadata-panel" id="gv-map-metadata-panel">
        <gv-title :title="title"></gv-title>
        <gv-iframe-panel visible="true" :src="src" height=600 width=860></gv-iframe-panel>
        <el-row type="flex" class="row-bg gv-metadata-row" justify="left">
            <el-col :span="4">
                <el-button @click="openXml" type="primary" class="gv-button-metadata fa fa-external-link" size="mini"><span> Scheda XML</span></el-button>
            </el-col>
            <el-col v-show="type!=='DATA'">
                <el-button @click="openCapabilities" type="primary" class="gv-button-metadata fa fa-external-link" size="mini"><span> Capabilities Servizio</span></el-button>
            </el-col>
        </el-row>
    </div>
</template>


<script>
    import * as config from '../config'
    import Vue from 'vue'

    import * as Title from './Title.vue'
    Vue.component('gv-title', Title)

    import { Button, ButtonGroup, Row, Col } from 'element-ui'
    Vue.use(Button)
    Vue.use(ButtonGroup)
    Vue.use(Row)
    Vue.use(Col)

    export default {
        name: 'gv-map-metadata-panel',
        props: ['src','title','type','linkWms','linkWfs','xmlUrl'],
        data() {
            return {}
        },
        mounted() {
//            console.log(this.linkWms)
        },
        methods: {
            openXml() {
                window.open(this.xmlUrl)
            },
            openCapabilities() {
                const url = (this.type === 'VS') ? this.linkWms : this.linkWfs
                window.open(url)
            }
        }
    }

</script>

<style scoped>

    .gv-map-metadata-panel {
      position: absolute;
      left: 0;
      top: 0;
      margin-left: 10px;
      margin-top: 100px;
      background-color: #fff;
      z-index: 800;
      width: 860px;
    }

    .gv-metadata-row span{
        font-size: 12px;
        font-family: "Raleway",Arial,sans-serif !important;
        font-weight: bold;
    }

    .gv-button-metadata {
        font-size: 12px;
    }
</style>