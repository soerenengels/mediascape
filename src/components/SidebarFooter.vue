<template>
    <div class="sidebarFooter">
        <h2>Suche und Filter</h2>
        <SidebarFooterFilter />
        <SidebarFooterSearch />
        <SidebarFooterLinks />
    </div>
</template>

<script>
import SidebarFooterFilter from '../components/SidebarFooterFilter.vue'
import SidebarFooterSearch from '../components/SidebarFooterSearch.vue'
import SidebarFooterLinks from '../components/SidebarFooterLinks.vue'

export default {
    name: 'SidebarFooter',
    components: { SidebarFooterFilter, SidebarFooterSearch, SidebarFooterLinks }
}
</script>

<style scoped>
    .sidebarFooter {
        padding: .75rem;
        width: calc(25vw - 2 * .75rem);
        background-color: #f9f9f9;
    }
    @media (max-width: 799px) {
        .sidebarFooter { 
            width: 50vw !important;
        }
        
    }
</style>