<template>
    <Autocomplete :search="search" :get-result-value="getResultValue" @submit="handleSubmit" aria-label="Search"></autocomplete>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
    name: 'SidebarFooterSearch',
    components: { Autocomplete },
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

</style>