<script setup>
    import Card from '@/components/Card.vue';
    import { RouterLink } from 'vue-router';
    import { defineProps } from 'vue';

  defineProps({
    title1: String,
    subtitle1: String,
    link1Path: String,
    link1Text: String,
    title2: String,
    subtitle2: String,
    link2Path: String,
    link2Text: String,
  })
</script>

<template>
    <section class="py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 class="text-2xl font-bold">{{ title1 }}</h2>
          <p class="mt-2 mb-4">
            {{ subtitle1 }}
          </p>
          <RouterLink
            :to="link1Path"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
          >
            {{ link1Text }}
          </RouterLink>
        </Card>
        <Card bg="bg-green-100">
          <h2 class="text-2xl font-bold">{{ title2 }}</h2>
          <p class="mt-2 mb-4">
            {{ subtitle2 }}
          </p>
          <RouterLink
            :to="link2Path"
            class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            {{ link2Text }}
          </RouterLink>
        </Card>
      </div>
    </section>
</template>