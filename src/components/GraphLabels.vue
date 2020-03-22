<template>
    <div class="labels">
        <p v-html="getDate" class="labelDate"></p>
        <p class="labelAuthorship">
            <router-link class="linkAuthor" v-for="author in getAuthors"  v-bind:key="author.ID" :to="'/author/' + author.ID">{{author.post_title}}</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'GraphLabels',
    computed: {
        getDate() {
            return this.$store.getters.getDate
        },
        getAuthors() {
            console.log(this.$store.getters.getAuthors);
            return this.$store.getters.getAuthors
        }
    },
}
</script>

<style scoped>
.labels {
        width: 75vw;
        position: absolute;
        display: flex;
        justify-content: space-between;
        /*z-index: -10;*/
    }
    .labels p {
        margin: .75rem;
    }
    .labelDate {
        position: relative;
        left: calc(32px);
    }
    .labelAuthorship {
        text-align: right;
    }
    .linkAuthor { display: block; text-decoration: none; color: black; }
</style>