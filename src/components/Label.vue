<template>
    <div>
        <p v-for="author in value" v-bind:key="author">
            <router-link to="author.id">{{ author.text }}</router-link>
        </p>
    </div>
</template>

<script>
export default {
  name: 'Label',
  props: {
    value: Array
  }
}
</script>

<style scoped>
    div {
        margin: .75rem;
    }
    p, span {
        margin: .75rem;
    }
</style>