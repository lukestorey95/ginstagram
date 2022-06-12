describe("Timeline", () => {
  it("can submit a post with an image and see the it displayed", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("test image");

    cy.fixture("gin.jpeg").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "gin.jpeg",
        mimeType: "image/jpeg",
      });
    });

    cy.get("#new-post-form").submit();

    cy.get('div[class="image"]').find("img").should("be.visible");
  });
});
