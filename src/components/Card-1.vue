<!--  -->
<template>
  <div class="card">
    <div class="card-inner">
      <div class="card-front">
        <slot name="front"></slot>
      </div>
      <div class="card-back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>
<style lang='less' scoped>
.card {
  border-radius: .5rem;
  overflow: hidden;
  width: 9rem;
  height: 13.5rem;
  cursor: pointer;
  margin-top: .5rem;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.999s;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-front {
  // background-color: #6A2C70;
  color: #fff;
  display: flex;
  align-items: center;
  // border: 10px solid #6A2C70;
  border-radius: 10px;
  justify-content: center;
  font-size: 24px;
  transform: rotateY(0deg);
}

.card-back {
  // background-color: #F08A5D;
  color: #fff;
  display: flex;
  align-items: center;
  // border: 10px solid #F08A5D;
  border-radius: 10px;
  justify-content: center;
  font-size: 24px;
  transform: rotateY(180deg);
}
</style>