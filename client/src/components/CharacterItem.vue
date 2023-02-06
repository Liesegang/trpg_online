<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { Character } from "@/types";
import { defineProps, defineEmits, PropType, Ref, ref } from "vue";
import ContextMenu from "@imengyu/vue3-context-menu";
import CharacterEditor from "@/components/CharacterEditor.vue";

const props = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "selected", elem: HTMLElement | undefined): void
  // eslint-disable-next-line no-unused-vars
  (e: "delete", id: string): void
}>()

const target: Ref<HTMLElement | undefined> = ref(undefined);
const isEditing: Ref<boolean> = ref(false);

function onContextMenu(e: MouseEvent) {
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      {
        label: "Delete",
        icon: "mid-delete",
        onClick: () => {
          emits("delete", props.character.id);
        },
      },
      {
        label: "Edit",
        icon: "icon-reload-1",
        onClick: () => {
          isEditing.value = true;
        },
      },
    ],
  });
}
</script>

<template>
  <CharacterEditor v-model="isEditing"/>
  <div class="container" @click.right.prevent="onContextMenu">
    <div
      class="image-wrapper"
      ref="target"
      :style="{ transform: character.transform }"
      @click="emits('selected', target)"
      :data-id="character.id"
    >
      <img src="@/assets/logo.png" />
    </div>
  </div>
</template>

<style scoped>
.container {
  user-select: none;
}

.image-wrapper {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
}

img {
  display: block;
}
</style>
