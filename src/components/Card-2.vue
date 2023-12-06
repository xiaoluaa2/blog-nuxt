<!--  -->
<template>
  <div class="card">
    <div class="first-content">

      <slot name="front"></slot>
    </div>
    <div class="second-content">
      <slot name="back"></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
let randomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  do {
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (color === '#FFFFFF' || color === '#000000');

  return color;
}

let color = ref()
color.value = randomColor()
</script>
<style lang='less' scoped>
.card {
  width: 100%;
  height: 100%;
  border: 1px solid v-bind(color);
  transition: all 0.4s;
  border-radius: 10px;
  font-weight: 900;
  overflow: hidden;
}

.card:hover {
  border-radius: 15px;
  cursor: pointer;
  transform: scale(1.1);
  border: 1px solid v-bind(color);
}

.first-content {
  height: 100%;
  width: 100%;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  border-radius: 15px;
}

.card:hover .first-content {
  height: 0px;
  opacity: 0;
}

.second-content {
  height: 0%;
  width: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  transition: all 0.4s;
  font-size: 0px;
  transform: rotate(90deg) scale(-1);
}

.card:hover .second-content {
  opacity: 1;
  height: 100%;
  font-size: 1.8rem;
  transform: rotate(0deg);
}
</style>