const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let arr = blogs.map((blog) => blog.likes);
  return arr.reduce((a, b) => a + b, 0);
};

module.exports = {
  totalLikes,
};
