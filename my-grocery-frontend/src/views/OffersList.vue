<template>
  <el-carousel
    :interval="4000"
    type="card"
    height="370px"
    style="overflow-x: auto; margin-bottom: 20px"
  >
    <el-carousel-item class="offer-page" v-for="item in items" :key="item.id">
      <div class="offer-item">
        <img :src="item.image" class="offer-item-image" />
        <div class="offer-item-content">
          <h3 class="offer-item-title">{{ item.title }}</h3>
          <p class="offer-item-description">{{ item.description }}</p>
          <div class="offer-item-details">
            <h4 class="offer-item-price">{{ item.price }}</h4>
            <h5 class="offer-item-offer">{{ item.offer }}</h5>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          title: "Item 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: "$50",
          offer: "50% Sale",
        },
        {
          id: 2,
          title: "Item 2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: "$100",
          offer: "Buy One Get One Free",
        },
        {
          id: 3,
          title: "Item 3",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: "$150",
          offer: "30% Off",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
