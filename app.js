const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      const index = this.cart.findIndex((el) => el === id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
      return;
    },
  },
});
