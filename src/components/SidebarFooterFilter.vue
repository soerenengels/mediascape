<template>
    <form class="togglers">
        <ToggleFilter toggleTitle="Gender" />
        <ToggleFilter toggleTitle="Race" />
    </form>
</template>

<script>
    import ToggleFilter from '../components/ToggleFilter.vue'
    
    export default {
        name: 'SidebarFooterFilter',
        components: { ToggleFilter }
    }
</script>

<style scoped>
    .togglers {
        padding: .5rem 0;
    }
    .togglers > * {
        margin-right: 1rem;
    }
</style>