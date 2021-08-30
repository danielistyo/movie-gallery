<template>
  <div class="rating">
    <template v-for="(rs, i) in classes" :key="i">
      <i :class="rs"></i>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'RatingStar',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const classes = computed<string[]>(() => {
      const arr = new Array(5);
      const rating = Math.round(props.value);

      for (let i = 1; i <= arr.length; i++) {
        const FULL = 'fas fa-star',
          HALF = 'fas fa-star-half-alt',
          EMPTY = 'far fa-star';
        let type: typeof FULL | typeof HALF | typeof EMPTY = EMPTY;

        if (rating >= i * 2) {
          type = FULL;
        }
        if (rating === i * 2 - 1) {
          type = HALF;
        }
        arr[i - 1] = type;
      }
      return arr;
    });

    return {
      classes,
    };
  },
});
</script>
