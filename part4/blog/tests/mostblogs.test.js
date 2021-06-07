const listHelper = require("../utils/list_helper");

describe("most blogs test", () => {
  test("retuns most liked author out many blogs", () => {
    const blogs = [
      {
        title: "new blog!",
        author: "BUttNuster",
        url: "localhost",
        likes: 4,
        id: "60bb9e3d6811ab847c0c5f52",
      },
      {
        title: "new blog!",
        author: "ButtNuster",
        url: "localhost",
        likes: 3,
        id: "60bb9e6a6811ab847c0c5f56",
      },
      {
        title: "new blog!",
        author: "BUttNuster",
        url: "localhost",
        likes: 2,
        id: "60bb9e6d6811ab847c0c5f57",
      },
      {
        title: "new blog!",
        author: "BUttNuster",
        url: "localhost",
        likes: 2,
        id: "60bba4a7bf22bf93d21ed2d6",
      },
    ];
    const result = listHelper.mostLikes(blogs);
    expect(result.sort()).toEqual([{ author: "BUttNuster", likes: 8 }].sort());
  });

  test("retuns most liked author out of one blog", () => {
    const blogs = [
      {
        title: "new blog!",
        author: "BUttNuster",
        url: "localhost",
        likes: 2,
        id: "60bba4a7bf22bf93d21ed2d6",
      },
    ];
    const result = listHelper.mostLikes(blogs);
    expect(result.sort()).toEqual([{ author: "BUttNuster", likes: 2 }].sort());
  });
});
