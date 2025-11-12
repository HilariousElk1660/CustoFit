// cypress/e2e/cart.cy.js

describe("Cart Screen Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/cart");
  });

  describe("Empty Cart State", () => {
    it("should display empty cart message when cart is empty", () => {
      cy.get(".empty-cart").should("be.visible");
      cy.get(".empty-cart-icon").should("be.visible");
      cy.contains("Your cart is empty").should("be.visible");
      cy.contains("Add some items to get started!").should("be.visible");
    });

    it("should have continue shopping button in empty state", () => {
      cy.get(".continue-shopping-btn").should("be.visible");
      cy.get(".continue-shopping-btn a").should("have.attr", "href", "/products");
    });

    it("should not display cart items or summary when empty", () => {
      cy.get(".cart-items").should("not.exist");
      cy.get(".order-summary").should("not.exist");
    });
  });

  describe("Cart with Items - Layout and Display", () => {
    beforeEach(() => {
      // Add items to cart before testing
      cy.visit("http://localhost:5173/products");
      cy.get(".add").first().click();
      cy.get(".add").eq(1).click();
      cy.visit("http://localhost:5173/cart");
    });

    it("should display cart header with title and item count", () => {
      cy.get(".cart-header").should("be.visible");
      cy.get(".cart-title").should("contain", "Shopping Cart");
      cy.get(".cart-title").should("contain", "items");
    });

    it("should display back to products button", () => {
      cy.get(".back-btn").should("be.visible");
      cy.get(".back-btn a").should("have.attr", "href", "/products");
    });

    it("should display cart layout with items and summary", () => {
      cy.get(".cart-layout").should("be.visible");
      cy.get(".cart-items").should("be.visible");
      cy.get(".order-summary").should("be.visible");
    });

    it("should display all cart items", () => {
      cy.get(".cart-item").should("have.length.greaterThan", 0);
    });
  });

  describe("Cart Item Display", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products");
      cy.get(".add").first().click();
      cy.visit("http://localhost:5173/cart");
    });

    it("should display all item information", () => {
      cy.get(".cart-item").first().within(() => {
        cy.get(".item-image img").should("be.visible");
        cy.get(".item-name").should("be.visible").and("not.be.empty");
        cy.get(".item-price").should("contain", "R ");
        cy.get(".item-total").should("contain", "R ");
      });
    });

    it("should display item specifications (color and size)", () => {
      cy.get(".cart-item").first().within(() => {
        cy.get(".item-specs").should("be.visible");
        cy.get(".item-specs").should("contain", "Color:");
        cy.get(".item-specs").should("contain", "Size:");
      });
    });

    it("should display item image correctly", () => {
      cy.get(".item-image img").should("have.attr", "src").and("not.be.empty");
      cy.get(".item-image img").should("have.attr", "alt");
    });

    // it("should display quantity controls", () => {
    //   cy.get(".quantity-controls").should("be.visible");
    //   cy.get(".quantity-btn").should("have.length.greaterThan", 1);
    //   cy.get(".quantity").should("be.visible");
    // });

    // it("should display remove button", () => {
    //   cy.get(".remove-btn").should("be.visible");
    // });
  });

  describe("Quantity Controls", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products");
      cy.get(".add").first().click();
      cy.visit("http://localhost:5173/cart");
    });

    it("should increase quantity when plus button is clicked", () => {
      cy.get(".quantity").first().invoke("text").then((initialQty) => {
        const initial = parseInt(initialQty);
        cy.get(".quantity-btn").last().click();
        cy.get(".quantity").first().should("contain", initial + 1);
      });
    });

    it("should decrease quantity when minus button is clicked", () => {
      // First increase quantity
      cy.get(".quantity-btn").last().click();
      cy.get(".quantity").first().invoke("text").then((currentQty) => {
        const current = parseInt(currentQty);
        cy.get(".quantity-btn").first().click();
        cy.get(".quantity").first().should("contain", current - 1);
      });
    });

    // it("should update item total when quantity changes", () => {
    //   cy.get(".item-price").first().invoke("text").then((priceText) => {
    //     const price = parseFloat(priceText.replace("R ", ""));
    //     cy.get(".quantity-btn").last().click();
    //     cy.get(".item-total").first().invoke("text").then((totalText) => {
    //       const total = parseFloat(totalText.replace("R ", ""));
    //       expect(total).to.be.greaterThan(price);
    //     });
    //   });
    // });

    it("should update order summary when quantity changes", () => {
      cy.get(".summary-line").contains("Subtotal").parent().find("span").last()
        .invoke("text").then((initialSubtotal) => {
          cy.get(".quantity-btn").last().click();
          cy.get(".summary-line").contains("Subtotal").parent().find("span").last()
            .invoke("text").should("not.equal", initialSubtotal);
        });
    });
  });

  describe("Remove Item Functionality", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products");
      cy.get(".add").first().click();
      cy.get(".add").eq(1).click();
      cy.visit("http://localhost:5173/cart");
    });

    it("should remove item from cart when remove button is clicked", () => {
      cy.get(".cart-item").then(($items) => {
        const initialCount = $items.length;
        cy.get(".remove-btn").first().click();
        cy.get(".cart-item").should("have.length", initialCount - 1);
      });
    });

    it("should show empty cart when last item is removed", () => {
      cy.get(".cart-item").then(($items) => {
        const itemCount = $items.length;
        for (let i = 0; i < itemCount; i++) {
          cy.get(".remove-btn").first().click();
        }
      });
      cy.get(".empty-cart").should("be.visible");
    });

    it("should update cart count in header when item is removed", () => {
      cy.get(".cart-title").invoke("text").then((text) => {
        const match = text.match(/\((\d+) items\)/);
        const initialCount = parseInt(match[1]);
        cy.get(".remove-btn").first().click();
        cy.get(".cart-title").should("contain", `(${initialCount - 1} items)`);
      });
    });
  });

  describe("Order Summary Display", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products");
      cy.get(".add").first().click();
      cy.visit("http://localhost:5173/cart");
    });

    it("should display order summary title", () => {
      cy.get(".order-summary h3").should("contain", "Order Summary");
    });

    it("should display subtotal", () => {
      cy.get(".summary-line").contains("Subtotal").should("be.visible");
      cy.get(".summary-line").contains("Subtotal").parent()
        .find("span").last().should("contain", "R ");
    });

    it("should display shipping cost", () => {
      cy.get(".summary-line").contains("Shipping").should("be.visible");
      cy.get(".summary-line").contains("Shipping").parent()
        .find("span").last().should("exist");
    });

    it("should display tax", () => {
      cy.get(".summary-line").contains("Tax").should("be.visible");
      cy.get(".summary-line").contains("Tax").parent()
        .find("span").last().should("contain", "R ");
    });

    it("should display total", () => {
      cy.get(".summary-line.total").should("be.visible");
      cy.get(".summary-line.total").contains("Total");
      cy.get(".summary-line.total span").last().should("contain", "R ");
    });

    it("should show FREE shipping when subtotal is over R50", () => {
      // Add multiple items to exceed R50
      cy.visit("http://localhost:5173/products");
      for (let i = 0; i < 3; i++) {
        cy.get(".add").eq(i).click();
      }
      cy.visit("http://localhost:5173/cart");
      
      cy.get(".summary-line").contains("Subtotal").parent().find("span").last()
        .invoke("text").then((subtotalText) => {
          const subtotal = parseFloat(subtotalText.replace("R ", ""));
          if (subtotal > 50) {
            cy.get(".summary-line").contains("Shipping").parent()
              .should("contain", "FREE");
          }
        });
    });

    it("should show shipping cost when subtotal is under R50", () => {
      cy.get(".summary-line").contains("Subtotal").parent().find("span").last()
        .invoke("text").then((subtotalText) => {
          const subtotal = parseFloat(subtotalText.replace("R ", ""));
          if (subtotal <= 50) {
            cy.get(".summary-line").contains("Shipping").parent()
              .should("contain", "R 9.99");
          }
        });
    });

    it("should display free shipping notice when applicable", () => {
      cy.get("body").then(($body) => {
        if ($body.find(".shipping-notice").length > 0) {
          cy.get(".shipping-notice").should("contain", "Add R");
          cy.get(".shipping-notice").should("contain", "more for free shipping!");
        }
      });
    });
  });

  // describe("Coupon Functionality", () => {
  //   beforeEach(() => {
  //     cy.visit("http://localhost:5173/products");
  //     cy.get(".add").first().click();
  //     cy.visit("http://localhost:5173/cart");
  //   });

  //   it("should display coupon input section", () => {
  //     cy.get(".coupon-section").should("be.visible");
  //     cy.get(".coupon-input").should("be.visible");
  //     cy.get(".apply-coupon-btn").should("be.visible");
  //   });

  //   it("should display coupon suggestions", () => {
  //     cy.get(".coupon-suggestions").should("be.visible");
  //     cy.get(".coupon-suggestions").should("contain", "Try:");
  //     cy.get(".coupon-suggestions").should("contain", "SAVE10");
  //   });

  //   it("should apply valid coupon code SAVE10", () => {
  //     cy.get(".coupon-input").type("SAVE10");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".coupon-applied").should("be.visible");
  //     cy.get(".coupon-applied").should("contain", "SAVE10");
  //   });

  //   it("should apply valid coupon code WELCOME20", () => {
  //     cy.get(".coupon-input").type("WELCOME20");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".coupon-applied").should("contain", "WELCOME20");
  //   });

  //   it("should apply FREESHIP coupon and remove shipping cost", () => {
  //     cy.get(".coupon-input").type("FREESHIP");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".summary-line").contains("Shipping").parent()
  //       .should("contain", "FREE");
  //   });

  //   it("should show error for invalid coupon code", () => {
  //     cy.get(".coupon-input").type("INVALID123");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".coupon-error").should("be.visible");
  //     cy.get(".coupon-error").should("contain", "Invalid coupon code");
  //   });

  //   it("should clear coupon input after successful application", () => {
  //     cy.get(".coupon-input").type("SAVE10");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".coupon-input").should("have.value", "");
  //   });

  //   it("should allow applying coupon by pressing Enter", () => {
  //     cy.get(".coupon-input").type("SAVE5{enter}");
  //     cy.get(".coupon-applied").should("be.visible");
  //   });

  //   it("should handle case-insensitive coupon codes", () => {
  //     cy.get(".coupon-input").type("save10");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".coupon-applied").should("contain", "SAVE10");
  //   });

  //   it("should remove applied coupon when X button is clicked", () => {
  //     cy.get(".coupon-input").type("SAVE10");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".remove-coupon-btn").click();
  //     cy.get(".coupon-applied").should("not.exist");
  //   });

  //   it("should update total when coupon is applied", () => {
  //     cy.get(".summary-line.total span").last().invoke("text").then((initialTotal) => {
  //       cy.get(".coupon-input").type("SAVE10");
  //       cy.get(".apply-coupon-btn").click();
  //       cy.get(".summary-line.total span").last().invoke("text")
  //         .should("not.equal", initialTotal);
  //     });
  //   });

  //   it("should display discount amount in summary", () => {
  //     cy.get(".coupon-input").type("SAVE5");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".coupon-applied").should("contain", "-R ");
  //   });

  //   it("should clear error when valid coupon is entered", () => {
  //     cy.get(".coupon-input").type("INVALID");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".coupon-error").should("be.visible");
  //     cy.get(".coupon-input").clear().type("SAVE10");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".coupon-error").should("not.exist");
  //   });
  // });

  describe("Checkout Functionality", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products");
      cy.get(".add").first().click();
      cy.visit("http://localhost:5173/cart");
    });

    it("should display checkout button", () => {
      cy.get(".checkout-btn").should("be.visible");
      cy.get(".checkout-btn").should("contain", "Proceed to Checkout");
    });

    it("should have checkout button link to checkout page", () => {
      cy.get(".checkout-btn a").should("have.attr", "href", "/checkout");
    });

    it("should display credit card icon on checkout button", () => {
      cy.get(".checkout-btn svg").should("exist");
    });
  });

  describe("Price Calculations", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products");
      cy.get(".add").first().click();
      cy.visit("http://localhost:5173/cart");
    });

    it("should calculate subtotal correctly", () => {
      cy.get(".item-price").first().invoke("text").then((priceText) => {
        const price = parseFloat(priceText.replace("R ", ""));
        cy.get(".quantity").first().invoke("text").then((qtyText) => {
          const qty = parseInt(qtyText);
          const expectedSubtotal = (price * qty).toFixed(2);
          cy.get(".summary-line").contains("Subtotal").parent().find("span").last()
            .should("contain", expectedSubtotal);
        });
      });
    });

    it("should calculate tax as 8% of subtotal", () => {
      cy.get(".summary-line").contains("Subtotal").parent().find("span").last()
        .invoke("text").then((subtotalText) => {
          const subtotal = parseFloat(subtotalText.replace("R ", ""));
          const expectedTax = (subtotal * 0.08).toFixed(2);
          cy.get(".summary-line").contains("Tax").parent().find("span").last()
            .invoke("text").then((taxText) => {
              const tax = parseFloat(taxText.replace("R ", ""));
              expect(tax.toFixed(2)).to.equal(expectedTax);
            });
        });
    });

    it("should ensure total is never negative", () => {
      cy.get(".summary-line.total span").last().invoke("text").then((totalText) => {
        const total = parseFloat(totalText.replace("R ", ""));
        expect(total).to.be.at.least(0);
      });
    });
  });

  describe("Responsive Design", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products");
      cy.get(".add").first().click();
      cy.visit("http://localhost:5173/cart");
    });

    // it("should display correctly on mobile viewport (375px)", () => {
    //   cy.viewport(375, 667);
    //   cy.get(".cart-container").should("be.visible");
    //   cy.get(".cart-items").should("be.visible");
    //   cy.get(".order-summary").should("be.visible");
    // });

    it("should display correctly on tablet viewport (768px)", () => {
      cy.viewport(768, 1024);
      cy.get(".cart-layout").should("be.visible");
      cy.get(".cart-item").should("be.visible");
    });

    it("should display correctly on desktop viewport (1920px)", () => {
      cy.viewport(1920, 1080);
      cy.get(".cart-content").should("be.visible");
    });

    // it("should stack layout appropriately on mobile", () => {
    //   cy.viewport(375, 667);
    //   cy.get(".cart-layout").should("exist");
    //   cy.get(".order-summary").should("be.visible");
    // });
  });

  // describe("Accessibility", () => {
  //   beforeEach(() => {
  //     cy.visit("http://localhost:5173/products");
  //     cy.get(".add").first().click();
  //     cy.visit("http://localhost:5173/cart");
  //   });

  //   it("should have alt text for product images", () => {
  //     cy.get(".item-image img").should("have.attr", "alt");
  //   });

  //   it("should have accessible form controls", () => {
  //     cy.get(".coupon-input").should("have.attr", "type", "text");
  //     cy.get(".coupon-input").should("have.attr", "placeholder");
  //   });

  //   it("should have proper button labels", () => {
  //     cy.get(".checkout-btn").should("contain.text", "Proceed to Checkout");
  //     cy.get(".apply-coupon-btn").should("contain.text", "Apply");
  //   });

  //   it("should have visible and readable text", () => {
  //     cy.get(".item-name").should("be.visible");
  //     cy.get(".item-price").should("be.visible");
  //     cy.get(".summary-line").should("be.visible");
  //   });
  // });

  // describe("Edge Cases", () => {
  //   beforeEach(() => {
  //     cy.visit("http://localhost:5173/products");
  //     cy.get(".add").first().click();
  //     cy.visit("http://localhost:5173/cart");
  //   });

  //   it("should handle empty coupon input", () => {
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get("body").should("not.contain", "Error");
  //   });

  //   it("should handle whitespace in coupon code", () => {
  //     cy.get(".coupon-input").type("  SAVE10  ");
  //     cy.get(".apply-coupon-btn").click();
  //     // Should either trim and work or show error
  //     cy.get("body").should("not.contain", "Error");
  //   });

  //   it("should handle special characters in coupon code", () => {
  //     cy.get(".coupon-input").type("!@#$%");
  //     cy.get(".apply-coupon-btn").click();
  //     cy.get(".coupon-error").should("be.visible");
  //   });

  //   it("should handle rapid quantity changes", () => {
  //     for (let i = 0; i < 5; i++) {
  //       cy.get(".quantity-btn").last().click();
  //     }
  //     cy.get("body").should("not.contain", "Error");
  //   });

  //   it("should maintain cart state when navigating away and back", () => {
  //     cy.get(".quantity").first().invoke("text").then((initialQty) => {
  //       cy.get(".back-btn a").click();
  //       cy.visit("http://localhost:5173/cart");
  //       cy.get(".quantity").first().should("contain", initialQty);
  //     });
  //   });
  // });

  describe("Navigation", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/products");
      cy.get(".add").first().click();
      cy.visit("http://localhost:5173/cart");
    });

    it("should navigate to products page from back button", () => {
      cy.get(".back-btn a").should("have.attr", "href", "/products");
    });

    it("should navigate to products page from continue shopping in empty cart", () => {
      cy.get(".remove-btn").first().click();
      cy.get(".continue-shopping-btn a").should("have.attr", "href", "/products");
    });

    it("should navigate to checkout page from checkout button", () => {
      cy.get(".checkout-btn a").should("have.attr", "href", "/checkout");
    });
  });
});