
<template>
  <div id="app">
    <Nav></Nav>
    <One></One>
    <Two></Two>
    <h2>index</h2>
    <h3>user page</h3>
    <IndexNav></IndexNav>
    <img src="../assets/logo.png" alt="">
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import One from "@/components/One";
import Two from "@/components/Two";

import IndexNav from "../components/Nav";

export default {
  name: "User",
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