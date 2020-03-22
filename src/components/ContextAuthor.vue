<template>
    <article class="context contextAuthor">
        <picture>
            <img :src="getImageUrl" alt="">
        </picture>
        <h1>{{ getFullName }}</h1>
        
        <aside>
            <span>{{ getDateOfBirth }}</span>
            <span v-html="getDateOfDeath"></span>
        </aside>
        <section class="biografie">
            <h2>Biografie</h2>
            <p v-html="getBiography"></p>
        </section>
    </article>
</template>

<script>
export default {
    name: 'ContextAuthor',
    computed: {
        getFullName() {
            return this.$store.getters.getTitle // Title != FullName
        },
        getImageUrl() {
            return 'https://pbs.twimg.com/profile_images/1098358426751647744/41fBbCkt_bigger.jpg' // Change to state
        },
        getDateOfBirth() {
            return '* Geburtsdatum' // + this.$store.getters.getAuthorBirth; // Change to state
        },
        getDateOfDeath() {
            return '&#10013; Todesdatum'; // Change to state
        },
        getBiography() {
            return this.$store.getters.getContent; // Change to state
        }
    },
}
</script>

<style scoped>
    .context {
        overflow-y: scroll;
    }
    picture {
        float: right;
    }
    picture img {
        border-radius: 50%;
        border: 5px solid blue;
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