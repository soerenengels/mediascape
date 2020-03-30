<template>
    <div>
        <label class="switch">
            <input type="checkbox" v-on:click="toggleSwitch" :checked="toggleState" v-bind:aria-labelledby="toggleTitle">
            <span class="slider round"></span>
        </label>
        <span class="toggleLabel" v-bind:id="toggleTitle">{{ toggleTitle }}</span>
    </div>
</template>

<script>
export default {
    name: 'ToggleFilter',
    props: {
        toggleTitle: String
    },
    data: function() {
        return {
            toggleState: false,
        }
    },
    methods: {
        toggleSwitch() {
            this.$store.commit('toggleSwitch', this.toggleTitle);
        }
    }
}
</script>

<style scoped>
    div {
        display: inline;
    }
    /* Switch via https://www.w3schools.com/howto/howto_css_switch.asp */
    /* The switch - the box around the slider */
    .switch {
    position: relative;
    display: inline-block;
    /*width: 60px;
    height: 34px;*/
    width: 3rem;
    height: 1.6rem;
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    }

    .slider:before {
    position: absolute;
    content: "";
    /*height: 26px;
    width: 26px;*/
    height: 1.1rem;
    width: 1.1rem;
    /*left: 4px;
    bottom: 4px;*/
    left: .25rem;
    bottom: .25rem;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }

    input:checked + .slider {
    background-color: #2196F3;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(1.3rem);
    -ms-transform: translateX(1.3rem);
    transform: translateX(1.3rem);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }

    .toggleLabel {
        padding: .7rem;
    }
</style>