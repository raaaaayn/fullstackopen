const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let arr = blogs.map((blog) => blog.likes);
  return arr.reduce((a, b) => a + b, 0);
};

const favoriteBlog = (blogs) => {
  let max = { likes: 0 };
  blogs.map((blog) => {
    if (blog.likes > max.likes) {
      max = blog;
    }
  });
  return max;
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
