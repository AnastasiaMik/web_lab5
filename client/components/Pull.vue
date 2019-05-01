<template>
    <div class="pull">
        <h3>Markup docs</h3>
        <ul>
            <li v-for="docs in pull" v-bind:key="docs._id">
                <a href="#" v-on:click="onPress(docs)">{{docs.title}}</a>
            </li>
            <button style="margin-top: 20px" v-on:click="onAddNew()">Add new</button>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Pull",
        props: {
            pull: Array,
            onPress: Function,
            onAddNew: Function
        }
    };
</script>

<style scoped>
    ul {
        padding: 0;
    }
    .pull {
        flex: 1;
        max-width: 220px;
        border-right: 1px solid black;
        padding: 16px;
    }
    button{
        font-size: 20px;
        background-color: lightgreen;
    }
</style>
