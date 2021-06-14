describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      name: "poopuinu",
      username: "poopuinu",
      password: "123",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user1);
    const user2 = {
      name: "buttnuster",
      username: "buttnuster",
      password: "123",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("login", function () {
    it("user can login", function () {
      cy.get("#username").type("poopuinu");
      cy.get("#password").type("123");
      cy.get("#login-button").click();
      cy.contains("poopuinu logged in");
    });

    it("user with invalid credentials cant login", function () {
      cy.get("#username").type("poopuinu");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();
      cy.get(".alert").should("have.css", "color", "rgb(255, 0, 0)");
      cy.contains("Invalid Credentials");
    });
  });

  describe("when loggend in", function () {
    beforeEach(function () {
      cy.login({ username: "poopuinu", password: "123" });
      // cy.get("#username").type("poopuinu");
      // cy.get("#password").type("123");
      // cy.get("#login-button").click();
      // cy.contains("poopuinu logged in");
    });

    it("a new blog can be created", function () {
      cy.get("#create-blog-expand").click();
      cy.get("#title").type("tests");
      cy.get("#author").type("test");
      cy.get("#url").type("test");
      cy.get("#create-blog").click();

      cy.contains("successfully added tests");
    });

    it("can like a blog", function () {
      cy.createBlog({ title: "tests", author: "test", url: "test" });
      // cy.get("#create-blog-expand").click();
      // cy.get("#title").type("tests");
      // cy.get("#author").type("test");
      // cy.get("#url").type("test");
      // cy.get("#create-blog").click();

      cy.expandView();
      cy.get(".likes-button").click();
    });
  });
  describe("deleting blogs", function () {
    it("can delete a blog", function () {
      cy.login({ username: "poopuinu", password: "123" });
      cy.createBlog({ title: "tests", author: "test", url: "test" });
      cy.expandView();
      cy.contains("remove").click();
      cy.contains("successfully deleted tests");
    });

    it("cannot delete a blog that was not created by the user", function () {
      cy.login({ username: "poopuinu", password: "123" });
      cy.createBlog({ title: "poopuinu", author: "test", url: "test" });
      cy.login({ username: "buttnuster", password: "123" });
      cy.createBlog({ title: "buttnuster", author: "test", url: "test" });
      cy.contains("poopuinu").parent().contains("view").click();
      cy.contains("remove").click();
      cy.contains("Couldnt delete blog");
    });
  });
  describe("blogs", function () {
    it("blogs sorted according to no. of likes", function () {
      cy.login({ username: "poopuinu", password: "123" });
      cy.createBlog({
        title: "poopuinu",
        author: "test",
        url: "test",
      });
      cy.createBlog({
        title: "buttnuster",
        author: "test",
        url: "test",
      });
      cy.get(".blog").each((blog) => {
        cy.wrap(blog).contains("view").click().parent();
        cy.wrap(blog).contains("Like").click();
        cy.get("#likes").should("contain", "1");
        // blogs.parent().contains("view").click();
        // blogs.map((blog) => blog.parent().contains("view").click);
      });
    });
  });
});
