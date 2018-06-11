<template>
  <div id="app">
    <Nav></Nav>
    <One></One>
    <Two></Two>
    <h2>demo</h2>
    <h3>index page</h3>
    <IndexNav></IndexNav>
    <img src="../assets/1.jpg" alt="">
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import One from "@/components/One";
import Two from "@/components/Two";

import IndexNav from "../components/Nav";

export default {
  name: "Index",
  components: {
    Nav,
    One,
    Two,
    IndexNav
  }
};
</script>

<style>
</style>