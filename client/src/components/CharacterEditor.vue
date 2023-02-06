<script setup lang="ts">
import { defineProps } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>

<template>
  <v-row justify="center">
    <v-dialog
      :modelValue="modelValue"
      @update:modelValue="(value) => $emit('update:modelValue', value)"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Character Edit</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('update:modelValue', false)"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('update:modelValue', false)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
