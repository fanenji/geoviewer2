<template>
    <div id="gv-geocoder" class="geocoder gv-color-scheme">
        <el-select
            v-model="address"
            filterable
            clearable
            remote
            size="mini"
            placeholder="Ricerca Indirizzo..."
            :remote-method="remoteMethod"
            @change="onChange"
            :loading="loading"
            loading-text="Caricamento... "
            no-match-text="Nessun indirizzo trovato"
            no-data-text="Nessun indirizzo trovato"
        >
            <el-option
                v-for="item in results"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import L from 'leaflet'
    import GV from '../GV'
    import getGoogleGeocode from '../services/getGoogleGeocode'

    import Vue from 'vue'
    import { Select,Option } from 'element-ui'
    Vue.use(Select)
    Vue.use(Option)

    export default {
        data() {
            return {
                results: [],
                address: [],
                loading: false,
                marker: null
            }
        },
        methods: {
            remoteMethod(query) {
                if (query.length < 4) {
                    this.results = []
                    return
                }
                this.loading = true
                getGoogleGeocode(query).then(results => {
                    this.loading = false
                    if (results && results.length > 0) {
                        this.results = results.map(result => ({
                            label: result.formatted_address,
                            value: result.place_id,
                            location: result.geometry.location
                        }))
                    } else {
                        this.results = []
                    }
                }).catch(error => {
                    this.loading = false
                    console.error(error)
                })
            },
            onChange(value) {
                const result = this.results.find(item => item.value === value )
                if (result) {
                    var icon = L.icon({
                        iconUrl: 'http://srvcarto.regione.liguria.it/geoviewer2/static/img/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [0, -41]
                    })
                    const opts = {
                        opacity: .8,
                        icon: icon,
                        title: result.label
                    }
                    this.marker = L.marker(result.location, opts);
                    this.marker.addTo(GV.map);
                    GV.map.setView(result.location, 14);
                } else {
                    if (this.marker) {
                        GV.map.removeLayer(this.marker)
                    }
                }
            }
        }
    }
</script>
<style scoped >
    .geocoder {
        height: 26px;
        width: 180px;
        position: absolute;
        left: 0;
        top: 0;
        margin-left: 50px;
        margin-top: 20px;
        z-index: 800;
    }
    .el-select {
        position: relative;
        padding: 2px;
    }
</style>