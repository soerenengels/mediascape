<template>
    <main class="contextBar">
        <router-view></router-view>
        <div class="filter">
            <h2>Suche und Filter</h2>
            <div class="togglers">
                <ToggleFilter toggleTitle="Gender" />
                <ToggleFilter toggleTitle="Race" />
            </div>
            <Autocomplete :search="search" :get-result-value="getResultValue" @submit="handleSubmit" ></autocomplete>
            <SidebarFooterLinks />
        </div>
    </main>
</template>

<script>
import ToggleFilter from '../components/ToggleFilter.vue'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'


export default {
    name: 'ContextBar',
    components: { ToggleFilter, Autocomplete },
    computed: {
        getNodes() {
            return this.$store.getters.getNodes;
        }
    },
    methods: {
        search(input) {
            if (input.length < 1) { return [] }
            let nodes = this.$store.getters.getNodes;
            return nodes.filter(node => {
                return node.title.toLowerCase()
                .startsWith(input.toLowerCase())
            })
        },
        getResultValue(result) {
            return result.title
        },
        handleSubmit(result) {
            this.$router.push({ path: '/node/' + result.id });
        }
    }
}
</script>

<style scoped>
    .contextBar {
        background-color: #f9f9f9;
        height: 100vh;
        width: 25vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .context {
        overflow-y: scroll;
    }
    .togglers {
        padding: .5rem 0;
    }
    .togglers > * {
        margin-right: 1rem;
    }
    .filter {
        /*position: fixed;
        bottom: 0;*/
        padding: .75rem;
        width: calc(25vw - 2 * .75rem);
        background-color: #f9f9f9;
    }
    
</style>