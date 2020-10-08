<template>
    <div id = "app">
        <Beer />
    </div>
</template>

<script>
    import Beer from '../components/Beer';
    export default {
        components: {
            Beer
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang = 'scss'>
    * {
        box-sizing: border-box;
        margin: 0; 
        padding: 0;
    }

    html,
    body {
        height: 100%;
        font-family: sans-serif;
    }
</style>