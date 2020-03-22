<template>
    <article class="context contextNode">
        <picture v-if="picture">
            <img :src="getImageURL" alt="">
        </picture>
        <h1>{{ getTitle }}</h1>
        <section class="abstract">
            <!--<h2>Abstract</h2>-->
            <p v-html="getContent"></p>
        </section>
        <section class="citation" v-if="!this.$route.path == '/'">
            <h2>Zitation</h2>
            {{ getCitation }}
        </section>
        
    </article>
</template>

<script>
export default {
    name: 'ContextNode',
    data: function() {
        return {
            picture: false,
        }
    },
    computed: {
        getTitle() {
            return this.$store.getters.getTitle
        },
        getImageURL() {
            return this.$store.getters.getImageURL
        },
        getContent() {
            return this.$store.getters.getContent
        },
        getCitation() {
            return this.$store.getters.getCitation
        }
    },
    watch: {
        $route() {
            // react to route changes...

            // Wenn die selbe Route nochmal aufgerufen wird
            // zurück zur Startseite (?)

            // Wenn die Route sich ändert, ändere den
            // default-State
            
        }
    },
}
</script>

<style scoped>
    .context {
        overflow-y: scroll;
        /*height: 100vh;*/
    }
    picture {
        float: right;
    }
    picture::after {
        clear: both;
    }
    
    h1, picture, aside, section {
        margin: .75rem;
    }
    aside {
        display: flex;
        justify-content: space-between;
    }
    h1 {
    font-size: 1.2rem;
    padding-bottom: .2rem
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