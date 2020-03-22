<template>
    <article class="context contextInitial">
        <h1>{{ getTitle }}</h1>
        <section class="abstract">
            <h2>// Wissenschaft veranschaulichen</h2>
            <p v-html="getContent"></p>
        </section>
        
    </article>
</template>

<script>
export default {
    name: 'ContextInitial',
    computed: {
        getTitle() {
            return this.$store.getters.getTitle
        },
        getContent() {
            return this.$store.getters.getContent
        }
    },
}
</script>

<style scoped>
    .context {
        overflow-y: scroll;
    }
    h1 {
    font-size: 1.2rem;
    padding-bottom: .2rem
}
    
    h1, section {
        margin: .75rem;
    }
    aside {
        display: flex;
        justify-content: space-between;
    }
    h2 {
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: .2rem;
    }
    p {
        line-height: 1.3;
        hyphens: auto;
        padding-bottom: .2em;
    }
</style>