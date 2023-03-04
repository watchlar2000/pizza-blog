<template>
  <div class="content text">
    <h2 class="title">About this project</h2>
    <p class="greeting">Hello!</p>
    <p>
      Thank you for visiting this web app. What you are looking at is my
      pet-project which I have been creating to enhance my coding skills. I use
      VueJS with Vue-router and Pinia to build a front-end. The backend part is
      based off on Firebase.
    </p>
    <p>
      This project is called "Pizza Blog". Even though there is a "pizza" called
      out in the title, it is not going to be about the pizza related stuff
      only. I like to cook and bake, so I'm going to post some of my favourite
      recipes in here.
    </p>
    <p>Stay stuned.</p>
    <p>In case you'd like to reach out, here is my contacts:</p>
    <p>
      <a href="https://github.com/watchlar2000" class="link" target="_blank"
        >https://github.com/watchlar2000</a
      >
    </p>
    <p>
      <a
        href="https://www.linkedin.com/in/sergii-koch/"
        class="link"
        target="_blank"
        >https://www.linkedin.com/in/sergii-koch/</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style lang="scss" scoped>
.title:hover {
  color: inherit !important;
}

.content {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.greeting {
  text-transform: uppercase;
}

.link {
  text-decoration: underline;
}
</style>
