<template>
    <div class="markup">
        <header class="header">
            <input :value="localTitle" @input="updateTitle">
            <div>
                <button v-on:click="onSave(docsAsObject)" style="margin-right: 10px">save</button>
                <button v-on:click="onDelete(docsAsObject)">delete</button>
            </div>
        </header>
        <div class="markup-area">
            <textarea :value="localMarkup" @input="update"></textarea>
            <div class="result" v-html="compiledMarkdown"></div>
        </div>
    </div>
</template>

<script>
    import marked from "marked";
    import _ from "lodash";
    export default {
        name: "Markup",
        props: ["currentDocs", "onSave", "onDelete"],
        data: function() {
            if (this.currentDocs) {
                return {
                    _id: this.currentDocs._id || 0,
                    localTitle: this.currentDocs.title || "Untitled",
                    localMarkup: this.currentDocs.markup || "# Hello"
                };
            }
            return {
                _id: 0,
                localTitle: "Untitled",
                localMarkup: "# Hello"
            };
        },
        computed: {
            compiledMarkdown: function() {
                return marked(this.localMarkup, { sanitize: true });
            },
            docsAsObject: function() {
                return {
                    _id: this._id,
                    title: this.localTitle,
                    markup: this.localMarkup
                };
            }
        },
        methods: {
            update: _.debounce(function(event) {
                this.localMarkup = event.target.value;
            }, 500),
            updateTitle: _.debounce(function(event) {
                this.localTitle = event.target.value;
            }, 500)
        },
        watch: {
            currentDocs: function(newDocs) {
                if (!newDocs) {
                    return;
                }
                this._id = this.currentDocs()._id;
                this.localTitle = newDocs.title;
                this.localMarkup = newDocs.markup;
            }
        }
    };
</script>

<style scoped>
    textarea {
        flex: 1;
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        font-size: 14px;
        font-family: "Monaco", courier, monospace;
        padding: 16px;
    }
    .markup {
        flex: 1;
        background-color: #cccccc;
        display: flex;
        flex-direction: column;
    }
    .markup-area {
        flex: 1;
        background-color: #f5f5f5;
        display: flex;
    }
    .header {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-height: 40px;
        background-color: white;
        padding: 16px;
        border-bottom: 1px solid #ccc;
    }
    .result {
        flex: 1;
        background-color: white;
        padding: 16px;
    }
</style>
