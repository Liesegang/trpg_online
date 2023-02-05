<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { Character } from "@/types";
import { defineProps, defineEmits, PropType, Ref, ref } from "vue";
// import { defineProps, defineEmits, PropType, Ref, ref, watch, toRefs, inject } from "vue";
// import { MoveableInstance } from "vue3-moveable";


// const moveable = inject('_moveable') as MoveableInstance

const props = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});
// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{(event: string, data: unknown): void;}>()

const target: Ref<HTMLElement | undefined> = ref(undefined);

// watch(toRefs(props).character, () => {
//   moveable.updateRect();
// }, {
//   deep: true
// });
</script>

<template>
  <div class="container">
    <div
      class="image-wrapper"
      ref="target"
      :style="{ transform: props.character.transform }"
      @click="emits('selected', target)"
      :data-id="character.id"
    >
      <img src="@/assets/logo.png" />
    </div>
  </div>
</template>

<style scoped>
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
