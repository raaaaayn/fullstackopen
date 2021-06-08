const initialBlogs = [
  {
    title: "blog1",
    author: "Butt Nuster",
    url: "blogs.buttnuster",
    likes: 5,
    id: "60bb9e3d6811ab847c0c5f52",
  },
  {
    title: "blog2",
    author: "Nutt Buster",
    url: "blogs.nuttbuster",
    likes: 4,
    id: "60bb9e3d6811ab847c0c5f52",
  },
];

const validBlog = {
  title: "blog3",
  author: "Ray",
  url: "blogs.Ray",
  likes: 4,
  id: "60bf881c2379ea1a0cfa21b3",
};

const invalidBlog = {
  author: "Ray",
  likes: 4,
  id: "60bf881c2379ea1a0cfa21b3",
};
const invalidBlog2 = {
  title: "blog4",
  author: "Ray",
  url: "blogs.me",
  id: "60bf881c2379ea1a0cfa21b3",
};

module.exports = { initialBlogs, validBlog, invalidBlog, invalidBlog2 };
