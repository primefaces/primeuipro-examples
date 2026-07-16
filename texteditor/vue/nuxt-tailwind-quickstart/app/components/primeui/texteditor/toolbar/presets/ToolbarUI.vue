<script setup lang="ts">
import Blockquote from '../commands/BlockquoteUI.vue';
import Bold from '../commands/BoldUI.vue';
import BulletList from '../commands/BulletListUI.vue';
import CheckList from '../commands/CheckListUI.vue';
import Heading from '../commands/HeadingUI.vue';
import Italic from '../commands/ItalicUI.vue';
import OrderedList from '../commands/OrderedListUI.vue';
import Redo from '../commands/RedoUI.vue';
import Separator from '../commands/SeparatorUI.vue';
import Strikethrough from '../commands/StrikethroughUI.vue';
import Underline from '../commands/UnderlineUI.vue';
import Undo from '../commands/UndoUI.vue';
</script>

<template>
    <div class="flex flex-wrap items-center gap-1.5 px-2 py-1.5">
        <Heading />
        <Separator />
        <Bold />
        <Italic />
        <Underline />
        <Strikethrough />
        <Separator />
        <Blockquote />
        <BulletList />
        <OrderedList />
        <CheckList />
        <Separator />
        <Undo />
        <Redo />
    </div>
</template>
