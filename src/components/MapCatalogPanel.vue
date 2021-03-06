<template>
    <div v-show="visible" class="gv-map-catalog-panel gv-inverted-color-scheme" id="gv-map-catalog-panel">
        <gv-title :title="title" :hide="true"></gv-title>
        <div class="gv-map-catalog-panel-body">
            <el-tabs type="border-card">
                <el-tab-pane v-if="panels.repertorio" :label="panels.repertorio.label" name="repertorio">
                    <form @submit.prevent.stop @keyup.enter="submit">
                        <el-row class="gv-map-catalog-panel-form" type="flex" justify="left">
                            <el-col :span="8">
                                <el-input
                                        placeholder="Ricerca..."
                                        v-model="formData.query"
                                        icon="circle-close"
                                        :on-icon-click="handleIconClick"
                                        size="mini">
                                </el-input>
                            </el-col>
                            <el-col :span="16">
                                <span class="gv-map-catalog-label">nelle cartografie di </span>
                                <el-select
                                        v-model="formData.ente"
                                        size="mini"
                                        filterable
                                        clearable
                                        placeholder="tutti gli enti"
                                        @change="onChangeEnte"
                                >
                                    <el-option
                                            v-for="item in enti"
                                            :key="item.value"
                                            :label="item.value"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col  :span="1">
                                <el-button type="primary" @click="submit" class="gv-button-ricerca" size="mini">
                                    <span> Ricerca</span>
                                </el-button>
                            </el-col>
                        </el-row>
                    </form>
                    <div class="gv-map-catalog-tree">
                        <el-tree :data="panels.repertorio.tree" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
                    </div>
                </el-tab-pane>
                <el-tab-pane v-if="panels.canali" :label="panels.canali.label" name="canali">
                    <div class="gv-map-catalog-tree">
                        <el-tree :data="panels.canali.tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>


<script>
    import * as config from '../config'
    import Vue from 'vue'
    import mountComponent from '../util/mountComponent'
    import getCatalog from '../services/getCatalog'
    import getScheda from '../services/getScheda'
    import getCanali from '../services/getCanali'

    import MapInfoPanel from './MapInfoPanel.vue'
    Vue.component('gv-map-info-panel', MapInfoPanel)

    import {Button, ButtonGroup, Row, Col, Tabs, TabPane, Tree, Input, Form, FormItem, Select, Option} from 'element-ui'
    Vue.use(Button)
    Vue.use(ButtonGroup)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Tree)
    Vue.use(Input)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Select)
    Vue.use(Option)


    import lang from 'element-ui/lib/locale/lang/it'
    import locale from 'element-ui/lib/locale'
    locale.use(lang)

    export default {
        name: 'gv-map-catalog-panel',
        props: ['visible'],
        data() {
            const enti = config.enti.filter(ente => ente !== 'REGIONE LIGURIA').map(ente => {
                return {
                    value: ente.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).replace('Di','di')
                }
            })
            enti.unshift({
                value: 'Regione Liguria'
            })

            let panels = config.getButtonOption('legend', 'addMapConfig').panels

            return {
                title: "CATALOGHI CARTOGRAFIE",
                panels: panels,
                defaultProps: {
                    children: 'children',
                    label: 'text'
                },
                catalogoCompleto: true,
                formData: {
                    query: '',
                    ente: '',
                    download: false
                },
                enti: enti
            }
        },
        mounted() {
            // Carico i tree per i pannelli di tipo tree
            Object.keys(this.panels).forEach(panelName => {
                const panel = this.panels[panelName]
                if (panel.type === 'tree') {
                    this.loadTree(panel)
                }
            })
        },
        methods: {
            onChangeEnte(value) {
                this.submit()
            },
            submit() {
                const panel = this.panels['repertorio']
                const filtriImpostati = (this.formData.query !== '' || this.formData.ente !== '')

                if (filtriImpostati) {
                    const params = {
                        q: this.formData.query,
                        ente: this.formData.ente.toUpperCase()
                    }
                    getCatalog(params).then(data => {
                        panel.tree = config.catalog = data.children
                    })
                    this.catalogoCompleto = false
                } else {
                    if (this.catalogoCompleto) {
                        return
                    }
                    panel.tree = config.catalog = config.catalogFull
                    this.catalogoCompleto = true
                }
            },
            handleIconClick() {
                this.formData.query = ''
                this.submit()
            },
            handleNodeClick (data) {
                const idMap = data.idMap
                if (!idMap) {
                    return
                }
                getScheda(idMap).then(data => {
                    if (!data) {
                        console.error('Scheda non trovata')
                        return
                    }
                    config.schedaInfoCartografia = data
                    mountComponent({
                        elId: 'gv-map-info-panel',
                        clear: true,
                        vm: new Vue({
                            template: `<gv-map-info-panel v-draggable visible="true" idMap="${idMap}" addToMapButton="true"></gv-map-info-panel>`
                        })
                    })
                })
            },
            loadTree (panel) {
                switch (panel.name) {
                    case 'repertorio':
                        // Se repertorio è in cache lo recupero
                        if (config.catalog) {
                            panel.tree = config.catalog
                            return
                        } else {
                            getCatalog().then(data => {
                                panel.tree = config.catalog = config.catalogFull = data.children
                            })
                        }
                        break
                    case 'canali':
                        getCanali(panel.options).then(data => {
                            panel.tree = data.children
                        })
                        break
                }
            }
        }
    }

</script>

<style scoped>

    .gv-map-catalog-tree {
        max-height: 400px;
        height: 400px;
        width: 570px;
        overflow: auto;
    }

    .gv-map-catalog-panel {
        position: absolute;
        left: 0;
        top: 0;
        margin-left: 10px;
        margin-top: 60px;
        background-color: #fff;
        z-index: 800;
    }


    .gv-map-catalog-panel table {
      border: 1px solid #ddd ;
      width: 100%;
      padding: 10px;
    }


    .gv-map-catalog-panel-th {
      white-space: nowrap;
      width: auto;
      padding: 5px 5px;
      text-align: left;
      font-weight: 400;
      font-size: 12px;
      border: 1px solid #e5e5e5;
    }

    .gv-map-catalog-panel table tr td {
      padding: 5px;
      font-size: 12px;
      border: 1px solid #e5e5e5;
    }

    .gv-button-download {
        font-size: 12px;
    }

    .gv-map-catalog-panel-form {
        padding: 0px;
        padding-bottom: 5px;
        width: 500px;
    }
    .gv-button-ricerca {
        font-size: 12px;
        margin-left: 35px;
    }

    .gv-button-ricerca span {
        font-family: "Raleway",Arial,sans-serif;
        font-weight: bold;
    }

    .gv-map-catalog-label {
        font-size: 12px;
        padding-left: 5px;
        font-family: "Raleway",Arial,sans-serif;
    }


</style>

<style>
    .el-tree-node__label {
        font-size: 12px !important;
    }
    .el-tabs__item.is-active {
        color: #24386c !important;
    }

</style>