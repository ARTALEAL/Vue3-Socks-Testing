app.component('review-form', {
  template:
    /*html*/
    `  <form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model='name' required>
        <label for="review">Review:</label>
        <textarea type="text" id="review" v-model='review'></textarea>
        <label for="rating">Rating:</label>
        <select name="rating" id="rating" v-model.number='rating' required>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
        </select>
        <input type="submit" class="button" value="submit">
    </form>`,
  data() {
    return {
      name: '',
      review: '',
      rating: null,
    };
  },
  methods: {
    onSubmit() {
      const productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      this.$emit('review-submitted', productReview);
      this.name = '';
      this.review = '';
      this.rating = null;
    },
  },
});
