<template>
    <div class="sidebar">
        <router-view></router-view>
        <SidebarFooter />
    </div>
</template>

<script>
import SidebarFooter from '../components/SidebarFooter.vue'

export default {
    name: 'Sidebar',
    components: { SidebarFooter }
}
</script>

<style scoped>
    .sidebar {
        background-color: #f9f9f9;
        height: 100vh;
        width: 25vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    @media (max-width: 799px) {
        .sidebar { 
            width: 100vw !important;
            height: auto !important;
        }
        
    }
    @media (min-width: 500px) and (max-width: 799px) {
        .sidebar { 
            flex-direction: row;
        }
    }
</style>