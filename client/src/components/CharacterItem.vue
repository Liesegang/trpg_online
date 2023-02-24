<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { Character } from "@/types";
import { defineProps, defineEmits, PropType, Ref, ref, inject } from "vue";
import ContextMenu from "@imengyu/vue3-context-menu";
import CharacterEditor from "@/components/CharacterEditor.vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { store } from "@/store";
import { VueKeycloakInstance } from "@dsb-norge/vue-keycloak-js/dist/types";
import KeyCloak from "@dsb-norge/vue-keycloak-js";

const props = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "selected", elem: HTMLElement | undefined): void;
  // eslint-disable-next-line no-unused-vars
  (e: "delete", id: string): void;
}>();

const target: Ref<HTMLElement | undefined> = ref(undefined);
const isEditing: Ref<boolean> = ref(false);

const keycloak: VueKeycloakInstance = inject(KeyCloak.KeycloakSymbol)!;

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

async function dropFile(event: DragEvent) {
  if (!event.dataTransfer)
    return;

  if (event.dataTransfer.files.length === 0)
    return

  let fileData = new FormData();
  fileData.append('file', event.dataTransfer.files[0]);
  const res = await axios.post<string>('http://localhost:3000/images', fileData, {
    headers: {
      'content-type': 'multipart/form-data',
      'Authorization': `Bearer ${keycloak.token}`
    }
  });

  const id: string = uuidv4();
  store.characters[id] = { name: "hoge", id, transform: "", url: `http://localhost:9000/trpg/${res.data}` };
}
</script>

<template>
  <CharacterEditor v-model="isEditing" />
  <div
    class="container"
    @click.right.prevent="onContextMenu"
  >
    <div
      class="image-wrapper"
      ref="target"
      :style="{ transform: character.transform }"
      @click="emits('selected', target)"
      @drop.prevent="dropFile"
      @dragover.prevent
      @dragenter.prevent
      :data-id="character.id"
    >
      <img :src="character.url || '/logo.png'" />
      <div>{{ character.name }}</div>
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
