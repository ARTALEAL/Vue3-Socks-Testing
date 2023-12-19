app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
    cart: {
      type: Number,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
        <div class="product-image">
            <img :src="image" :class="inStock ? '' : 'out-of-stock-img'" :alt="product">
        </div>
        <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="inStock > 10">In Stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out</p>
            <p v-else="inStock === 0">Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div class="product-variant color-circle" :style="{backgroundColor: variant.color}"
                v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)">
            </div>
            <button class="button" :class="{disabledButton: !inStock}" @click="addToCart"
                :disabled="!inStock">Add to Cart</button>
                <button class="button delete-btn" @click="removeFromCart" :class="{disabledButton: !cart}" :disabled="!cart">Remove from Cart</button>
        </div>
    </div>
    <review-list :reviews='reviews'></review-list>
    <review-form @review-submitted="addReview"></review-form>
</div>`,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        {
          id: 2234,
          color: 'green',
          image: './assets/images/socks-green.jpg',
          quantity: 50,
        },
        {
          id: 2235,
          color: 'blue',
          image: './assets/images/socks-blue.jpg',
          quantity: 11,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
      this.variants[this.selectedVariant].quantity--;
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
      this.variants[this.selectedVariant].quantity++;
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
      console.log(this.reviews);
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return 'free';
      }
      return 2.99;
    },
  },
});
