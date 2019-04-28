<template>
    <div id="app">
        <Pull v-bind:pull="docsList" v-bind:onPress="onDocsPress" v-bind:onAddNew="onAddNew"/>
        <Markup v-bind:currentDocs="currentDocs" v-bind:onSave="onUpdate" v-bind:onDelete="onDelete"/>
    </div>
</template>

<script>
    import Pull from "./components/Pull.vue";
    import Markup from "./components/Markup.vue";
    import axios from "axios";
    export default {
        name: "app",
        components: {
            Pull,
            Markup
        },
        data: function() {
            return {
                docsList: [],
                currentDocs: []
            };
        },
        created: async function() {
            try {
                const response = await fetch("http://127.0.0.1:27017/docs");
                this.docsList = (await response.clone().json()).docs;
                this.currentDocs = this.docsList[0];
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            onDocsPress: function(docs) {
                this.currentDocs = docs;
            },
            onAddNew: async function() {
                const { data } = await axios.post("http://127.0.0.1:27017/docs", {
                    title: "Untitled",
                    markup: "# Write your markup here"
                });
                this.docsList.push(data.docs);
            },
            onUpdate: async function(docs) {
                const id = docs._id;
                const { data } = await axios.put("http://127.0.0.1:27017/docs" + id, {
                    title: docs.title,
                    markup: docs.markup
                });
                let index;
                for (let i = 0; i < this.docsList.length; i++) {
                    if (this.docsList[i]._id === docs._id) {
                        index = i;
                        break;
                    }
                }
                this.docsList[index] = data.docs;
                this.docsList = [...this.docsList];
                this.currentDocs = data.docs;
            },
            onDelete: async function(docs) {
                const id = docs._id;
                console.log("delete");
                console.log(docs);
                const { data } = await axios.delete("http://127.0.0.1:27017/docs" + id);
                let index;
                for (let i = 0; i < this.docsList.length; i++) {
                    if (this.docsList[i]._id === docs._id) {
                        index = i;
                        break;
                    }
                }
                this.docsList.splice(index, 1);
                this.docsList = [...this.docsList];
                this.currentDocs = this.docsList[0];
                console.log(data);
            }
        }
    };
</script>

<style>
    html {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        padding: 0px;
        margin: 0px;
    }
    body {
        padding: 0px;
        margin: 0px;
        display: flex;
        flex: 1;
    }
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        flex: 1;
    }
</style>
