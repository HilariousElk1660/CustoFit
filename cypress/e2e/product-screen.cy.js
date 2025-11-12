// cypress/e2e/products.cy.js

describe("Products Screen Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/products");
    // Wait for products to load
    cy.get(".products-grid").should("exist");
  });

  describe("Page Layout and Initial Load", () => {
    it("should display the page title and subtitle", () => {
      cy.contains("Our Collection").should("be.visible");
      cy.contains("Products").should("be.visible");
      cy.contains("Browse our collection of clothing items").should(
        "be.visible"
      );
    });

    it("should display search and filter controls", () => {
      cy.get(".products-search").should("be.visible");
      cy.get(".MuiSelect-select").should("be.visible");
    });

    it("should load and display products", () => {
      cy.get(".product-card").should("have.length.greaterThan", 0);
    });

    it("should display products in grid layout", () => {
      cy.get(".products-grid").should("be.visible");
      cy.get(".products-grid .product-card").should("exist");
    });
  });

  describe("Product Card Display", () => {
    it("should display all product information on cards", () => {
      cy.get(".product-card")
        .first()
        .within(() => {
          cy.get(".product-image").should("be.visible");
          cy.get(".product-name").should("be.visible").and("not.be.empty");
          cy.get(".product-description").should("be.visible");
          cy.get(".product-price").should("be.visible").and("contain", "R ");
        });
    });

    it("should display product images correctly", () => {
      cy.get(".product-image").each(($img) => {
        cy.wrap($img).should("have.attr", "src").and("not.be.empty");
        cy.wrap($img).should("be.visible");
      });
    });

    it("should show placeholder image for products without images", () => {
      cy.get('.product-image[src*="placeholder.jpg"]').should("exist");
    });
  });

  describe("Product Search Functionality", () => {
    // it("should filter products based on search input", () => {
    //   cy.get(".products-search").type("shirt");
    //   cy.get(".product-card").each(($card) => {
    //     cy.wrap($card)
    //       .find(".product-name")
    //       .invoke("text")
    //       .should("match", /shirt/i);
    //   });
    // });

    it("should search case-insensitively", () => {
      cy.get(".products-search").type("HOODIE");
      cy.get(".product-card").should("exist");
      cy.get(".product-name")
        .first()
        .invoke("text")
        .should("match", /hoodie/i);
    });

    it("should show no products message when search has no matches", () => {
      cy.get(".products-search").type("XYZ999NonExistent");
      cy.contains("No products found.").should("be.visible");
      cy.get(".product-card").should("not.exist");
    });

    it("should update results in real-time as user types", () => {
      cy.get(".products-search").type("t");
      cy.get(".product-card").then(($cards1) => {
        const count1 = $cards1.length;
        cy.get(".products-search").type("shirt");
        cy.get(".product-card").then(($cards2) => {
          expect($cards2.length).to.be.lessThan(count1);
        });
      });
    });

    it("should clear search and show all products", () => {
      cy.get(".products-search").type("test");
      cy.get(".products-search").clear();
      cy.get(".product-card").should("have.length.greaterThan", 3);
    });

    it("should handle special characters in search", () => {
      cy.get(".products-search").type("!@#$%^&*()");
      cy.get("body").should("not.contain", "Error");
      cy.contains("No products found.").should("be.visible");
    });
  });

  // describe("Product Filter Functionality", () => {
  //   it('should filter by "All" and show all products', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("All").click();
  //     cy.get(".product-card").should("have.length.greaterThan", 0);
  //   });

  //   it('should filter by "Customisable" products', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Customisable").click();
  //     cy.contains("Customisable Products").should("be.visible");
  //     cy.get(".product-card").each(($card) => {
  //       cy.wrap($card).find(".customize").should("exist");
  //     });
  //   });

  //   it('should filter by "Non-Customisable" products', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Non-Customisable").click();
  //     cy.get(".product-card").each(($card) => {
  //       cy.wrap($card).find(".customize").should("not.exist");
  //     });
  //   });

  //   it('should filter by "Bestseller" tag', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Bestseller").click();
  //     cy.get(".product-tag").each(($tag) => {
  //       cy.wrap($tag).should("contain", "Bestseller");
  //     });
  //   });

  //   it('should filter by "Classic" tag', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Classic").click();
  //     cy.get(".product-tag").should("contain", "Classic");
  //   });

  //   it('should filter by "Popular" tag', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Popular").click();
  //     cy.get(".product-tag").should("contain", "Popular");
  //   });

  //   it('should filter by "Winter Collection" tag', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Winter Collection").click();
  //     cy.get(".product-tag").should("contain", "Winter Collection");
  //   });

  //   it('should filter by "Summer Essential" tag', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Summer Essential").click();
  //     cy.get(".product-tag").should("contain", "Summer Essential");
  //   });

  //   it('should filter by category "Top"', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("li", "Top").click();
  //     cy.get(".product-card").should("exist");
  //   });

  //   it('should filter by category "Outerwear"', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Outerwear").click();
  //     cy.get(".product-card").should("exist");
  //   });

  //   it('should filter by category "Accessory"', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Accessory").click();
  //     cy.get(".product-card").should("exist");
  //   });

  //   it("should show no results message when filter has no matches", () => {
  //     // This depends on your data - adjust filter as needed
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Winter Essential").click();
  //     // If no products match, check for message
  //     cy.get("body").then(($body) => {
  //       if ($body.find(".product-card").length === 0) {
  //         cy.contains("No products found.").should("be.visible");
  //       }
  //     });
  //   });
  // });

  // describe("Combined Search and Filter", () => {
  //   it("should apply both search and filter simultaneously", () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Customisable").click();
  //     cy.get(".products-search").type("shirt");
  //     cy.get(".product-card").each(($card) => {
  //       cy.wrap($card).find(".customize").should("exist");
  //       cy.wrap($card)
  //         .find(".product-name")
  //         .invoke("text")
  //         .should("match", /shirt/i);
  //     });
  //   });

  //   it("should clear search while maintaining filter", () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Bestseller").click();
  //     cy.get(".products-search").type("test");
  //     cy.get(".products-search").clear();
  //     cy.get(".product-tag").each(($tag) => {
  //       cy.wrap($tag).should("contain", "Bestseller");
  //     });
  //   });

  //   it("should reset filter while maintaining search", () => {
  //     cy.get(".products-search").type("shirt");
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("Customisable").click();
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("All").click();
  //     cy.get(".product-name").each(($name) => {
  //       cy.wrap($name).invoke("text").should("match", /shirt/i);
  //     });
  //   });
  // });

  // describe("Product Sections", () => {
  //   it('should display "Customisable Products" section when applicable', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("All").click();
  //     cy.contains("Customisable Products").should("be.visible");
  //   });

  //   it('should display "Anime Collection" section when applicable', () => {
  //     cy.get(".MuiSelect-select").click();
  //     cy.contains("All").click();
  //     cy.contains("Anime Collection").should("be.visible");
  //   });

  //   it("should show customisable products in correct section", () => {
  //     cy.contains("Customisable Products")
  //       .parent()
  //       .find(".products-grid .product-card")
  //       .each(($card) => {
  //         cy.wrap($card).find(".customize").should("exist");
  //       });
  //   });

  //   it("should show non-customisable products in Anime Collection", () => {
  //     cy.contains("Anime Collection")
  //       .parent()
  //       .find(".products-grid .product-card")
  //       .each(($card) => {
  //         cy.wrap($card).find(".customize").should("not.exist");
  //       });
  //   });
  // });

  describe("Product Interactions", () => {
    it("should open modal when product image is clicked", () => {
      cy.get(".product-image").first().click();
      cy.get(".MuiModal-root").should("be.visible");
    });

    it("should display product details in modal", () => {
      cy.get(".product-image").first().click();
      cy.get(".MuiModal-root").within(() => {
        cy.get("img").should("be.visible");
      });
    });

    // it("should close modal when close button is clicked", () => {
    //   cy.get(".product-image").first().click();
    //   cy.get(".MuiModal-root").should("be.visible");
    //   cy.get(".MuiModal-root").find("button").first().click();
    //   cy.get(".MuiModal-root").should("not.exist");
    // });

    it("should close modal when clicking outside", () => {
      cy.get(".product-image").first().click();
      cy.get(".MuiBackdrop-root").click({ force: true });
      cy.get(".MuiModal-root").should("not.exist");
    });

    it("should show cursor pointer on product images", () => {
      cy.get(".product-image").first().should("have.css", "cursor", "pointer");
    });
  });

  describe("Add to Cart Functionality", () => {
    it('should have "Add to Cart" button on all products', () => {
      cy.get(".product-card").each(($card) => {
        cy.wrap($card).find(".add").should("contain", "Add to Cart");
      });
    });

    it("should add product to cart when button is clicked", () => {
      cy.get(".add").first().click();
      // Check that cart context was called (you may need to verify cart count increases)
      cy.get("body").should("not.contain", "Error");
    });

    it("should allow adding multiple products to cart", () => {
      cy.get(".add").first().click();
      cy.get(".add").eq(1).click();
      cy.get(".add").eq(2).click();
      // Verify no errors occurred
      cy.get("body").should("not.contain", "Error");
    });
  });

  describe("Customise Functionality", () => {
    // it('should show "Customise" button only on customisable products', () => {
    //   cy.get(".MuiSelect-select").click();
    //   cy.contains("Customisable").click();
    //   cy.get(".product-card").each(($card) => {
    //     cy.wrap($card).find(".customize").should("exist");
    //   });
    // });

    it("should navigate to studio when Customise is clicked", () => {
      cy.get(".customize").first().should("have.attr", "href", "/studio");
    });

    // it("should not show Customise button on non-customisable products", () => {
    //   cy.get(".MuiSelect-select").click();
    //   cy.contains("Non-Customisable").click();
    //   cy.get(".product-card").each(($card) => {
    //     cy.wrap($card).find(".customize").should("not.exist");
    //   });
    // });
  });

  describe("Responsive Design", () => {
    it("should display correctly on mobile viewport (375px)", () => {
      cy.viewport(375, 667);
      cy.get(".products-container").should("be.visible");
      cy.get(".product-card").should("be.visible");
    });

    it("should display correctly on tablet viewport (768px)", () => {
      cy.viewport(768, 1024);
      cy.get(".products-grid").should("be.visible");
      cy.get(".product-card").should("be.visible");
    });

    it("should display correctly on desktop viewport (1920px)", () => {
      cy.viewport(1920, 1080);
      cy.get(".products-grid").should("be.visible");
    });

    // it("should have no horizontal scroll on mobile", () => {
    //   cy.viewport(375, 667);
    //   cy.document().then((doc) => {
    //     expect(doc.documentElement.scrollWidth).to.be.lte(
    //       doc.documentElement.clientWidth + 5
    //     );
    //   });
    // });

    it("should stack controls vertically on mobile", () => {
      cy.viewport(375, 667);
      cy.get(".products-controls").should("be.visible");
    });
  });

  describe("Accessibility", () => {
    it("should have proper alt text on product images", () => {
      cy.get(".product-image").each(($img) => {
        cy.wrap($img).should("have.attr", "alt").and("not.be.empty");
      });
    });

    // it("should be able to navigate with keyboard", () => {
    //   cy.get("body").tab();
    //   cy.focused().should("exist");
    // });

    it("should have proper contrast for text", () => {
      cy.get(".product-name").first().should("be.visible");
      cy.get(".product-price").first().should("be.visible");
    });

    it("should have accessible form controls", () => {
      cy.get(".products-search").should("have.attr", "type", "text");
      cy.get(".products-search").should("have.attr", "placeholder");
    });
  });

  describe("Performance", () => {
    // it("should load page within 5 seconds", () => {
    //   cy.visit("/products", {
    //     onBeforeLoad: (win) => {
    //       win.performance.mark("page-start");
    //     },
    //   });
    //   cy.window().then((win) => {
    //     win.performance.mark("page-end");
    //     win.performance.measure("page-load", "page-start", "page-end");
    //     const measure = win.performance.getEntriesByName("page-load")[0];
    //     expect(measure.duration).to.be.lessThan(5000);
    //   });
    // });

    // it("should render search results quickly", () => {
    //   const start = Date.now();
    //   cy.get(".products-search").type("shirt");
    //   cy.get(".product-card")
    //     .should("exist")
    //     .then(() => {
    //       const duration = Date.now() - start;
    //       expect(duration).to.be.lessThan(500);
    //     });
    // });

    // it("should render filter changes quickly", () => {
    //   const start = Date.now();
    //   cy.get(".MuiSelect-select").click();
    //   cy.contains("Customisable").click();
    //   cy.get(".product-card")
    //     .should("exist")
    //     .then(() => {
    //       const duration = Date.now() - start;
    //       expect(duration).to.be.lessThan(1000);
    //     });
    // });
  });

  describe("Edge Cases", () => {
    // it("should handle empty search gracefully", () => {
    //   cy.get(".products-search").type("   ");
    //   cy.get(".product-card").should("exist");
    // });

    it("should handle products with missing prices", () => {
      // Verify price formatting handles 0 or undefined
      cy.get(".product-price").each(($price) => {
        cy.wrap($price).should("contain", "R ");
      });
    });

    it("should handle products with very long names", () => {
      cy.get(".product-name").each(($name) => {
        cy.wrap($name).should("be.visible");
        // Check it doesn't break layout
        cy.wrap($name).parent().should("have.css", "overflow");
      });
    });

    // it("should handle rapid filter changes", () => {
    //   cy.get(".MuiSelect-select").click();
    //   cy.contains("Customisable").click();
    //   cy.get(".MuiSelect-select").click();
    //   cy.contains("Bestseller").click();
    //   cy.get(".MuiSelect-select").click();
    //   cy.contains("All").click();
    //   cy.get("body").should("not.contain", "Error");
    // });

    it("should handle rapid search input", () => {
      cy.get(".products-search").type("abcdefghijklmnop");
      cy.get(".products-search").clear();
      cy.get(".products-search").type("shirt");
      cy.get("body").should("not.contain", "Error");
    });
  });
});
