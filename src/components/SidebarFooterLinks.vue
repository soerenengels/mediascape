<template>
    <div class="about">
        <a href="https://mma.soerenengels.de/mediascape/projekt">Über das Projekt</a>
        <a href="https://soerenengels.de/datenschutz">Datenschutz</a>
        <a href="https://soerenengels.de/#impressum">Impressum</a>
    </div>
</template>

<script>
export default {
    name: 'SidebarFooterLinks',
}
</script>

<style scoped>
    .about {
        font-size: 60%;
        display: flex;
        justify-content: space-between;
        margin-top: .75rem;
    }
    a:link, .about a:active, .about a:visited {
        color: #3d3d3d;
        text-decoration: none;
    }
    a:hover {
        color: lightgrey;
        transition: color .3s;
    }
</style>