<template>

    <div class="awesome-editor mt-3">
        <div v-if="editor" class="btn-container">
            <!-- This button contains a bunch of methods from the Tiptap library connected to its Editor object. When clicked, the highlighted font inside the Tiptap editor is bolded. -->
            <p @click="editor.chain().focus().toggleBold().run()" 
                :class="{'is-active': editor.isActive('bold')}">Bold</p>

            <!-- This button makes the font italic. -->
            <p @click="editor.chain().focus().toggleItalic().run()" 
                :class="{'is-active': editor.isActive('italic')}">Italic</p>
            
            <!-- This button makes the font into a level 1 heading. -->
            <p @click="editor.chain().focus().toggleHeading({level: 1}).run()" 
                :class="{'is-active': editor.isActive('heading', {level: 1})}">H 1</p>
            
            <!-- This button makes the font into a level 2 heading. -->
            <p @click="editor.chain().focus().toggleHeading({level: 2}).run()" 
                :class="{'is-active': editor.isActive('heading', {level: 2})}">H 2</p>

            <!-- This button makes the text into a bullet list. -->
            <p @click="editor.chain().focus().toggleBulletList().run()" 
                :class="{'is-active': editor.isActive('bulletList')}">Bullet</p>
        </div>
        <editor-content :editor="editor"></editor-content>
    </div>

</template>




<script>
    import {Editor, EditorContent} from '@tiptap/vue-3';
    import StarterKit from '@tiptap/starter-kit';

    export default {
        data() {
            return {
                editor: null
            }
        },
        components: {
            EditorContent
        },
        mounted() {
            this.editor = new Editor({
                content: ``,
                extensions: [StarterKit],
                onUpdate: () => {
                    console.log(this.editor.getHTML());
                }
            });
        }
    }

</script>