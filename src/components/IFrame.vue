<template>
    <div>
        <div>
            <div class="gv-html-panel-body">
                <iframe id="iframe" :src="src" :height="height" :width="width" style="border: none;"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
/*
  import Title from './Title.vue'
  Vue.use(Title)
*/
    export default {
        name: 'gv-iframe-panel',
        props: ['html', 'src', 'width', 'height'],
        mounted: function () {
            var vm = this;
            if (vm.html) {
                // firefox non aggiorna innerHTML - devo aspettare 1ms
                setTimeout(function () {
                    vm.$el.querySelector('#iframe').contentDocument.body.innerHTML = vm.html
                }, 1);
            }
        }
    }
</script>

