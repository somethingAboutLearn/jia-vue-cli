<template>
    <ul>
        <li v-for="(n, i) in nav" :key="i">
            <a :href="n.path">{{n.title}}</a>
        </li>
    </ul>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      nav: [
        {
          title: "index",
          path: "/"
        },
        {
          title: "user",
          path: "#/user"
        }
      ]
    };
  }
};
</script>
