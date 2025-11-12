describe("Signup Page", () => {
  const frontendUrl = "http://localhost:5173";
  const apiUrl = "http://localhost:3000";

  beforeEach(() => {
    cy.visit(`${frontendUrl}/signup?mode=signup&ip=localhost`);
  });

  // Helper to check backend availability
  const isBackendUp = () => {
    return cy
      .request({
        url: `${apiUrl}/health` || `${apiUrl}/`,
        failOnStatusCode: false,
      })
      .then((resp) => resp.status >= 200 && resp.status < 500);
  };

  // ---------- RENDER TESTS ----------
  it("renders all signup elements", () => {
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="confirmPassword"]').should("exist");
    cy.get(".signup__btn").should("contain.text", "Register");
    cy.contains("Create an account").should("be.visible");
  });

  // ---------- VALIDATION ----------
  it("shows validation errors for empty fields", () => {
    cy.get("form").submit();
    cy.get('input[name="name"]:invalid').should("exist");
    cy.get('input[name="email"]:invalid').should("exist");
    cy.get('input[name="password"]:invalid').should("exist");
    cy.get('input[name="confirmPassword"]:invalid').should("exist");
  });

  // ---------- PASSWORD MISMATCH ----------
  it("shows alert when passwords don't match", () => {
    cy.get('input[name="name"]').type("Cytest User");
    cy.get('input[name="email"]').type("cytest@gmail.com");
    cy.get('input[name="password"]').type("123456788");
    cy.get('input[name="confirmPassword"]').type("differentpassword");

    cy.on("window:alert", (text) => {
      expect(text).to.equal("Passwords do not match!");
    });

    cy.get("form").submit();
  });

  // ---------- SIGNUP SUCCESS ----------
  it("handles successful signup", () => {
    isBackendUp().then((backendOnline) => {
      if (!backendOnline) {
        cy.log("⚠️ Backend offline, using mock response");

        cy.intercept("POST", `${apiUrl}/signup`, {
          statusCode: 200,
          body: {
            message: "User created successfully",
            user: {
              name: "Cytest User",
              email: "cytest@gmail.com",
            },
          },
        }).as("signupRequest");
      } else {
        cy.log("✅ Backend detected, using live API");
      }

      cy.get('input[name="name"]').type("Cytest User");
      cy.get('input[name="email"]').type("cytest@gmail.com");
      cy.get('input[name="password"]').type("123456788");
      cy.get('input[name="confirmPassword"]').type("123456788");

      cy.on("window:alert", (text) => {
        expect(text).to.include("Sign up successful");
      });

      cy.get("form").submit();

      if (!backendOnline) {
        cy.wait("@signupRequest");
      }

      cy.url().should("include", "mode=login");
    });
  });

  // ---------- SIGNUP FAILURE ----------
  it("shows error when email already exists", () => {
    isBackendUp().then((backendOnline) => {
      if (!backendOnline) {
        cy.log("⚠️ Backend offline, using mock error response");

        cy.intercept("POST", `${apiUrl}/signup`, {
          statusCode: 400,
          body: { error: "Email already exists" },
        }).as("signupError");
      }

      cy.get('input[name="name"]').type("Cytest User");
      cy.get('input[name="email"]').type("cytest@gmail.com");
      cy.get('input[name="password"]').type("123456788");
      cy.get('input[name="confirmPassword"]').type("123456788");

      cy.on("window:alert", (text) => {
        expect(text).to.include("Email already exists");
      });

      cy.get("form").submit();

      if (!backendOnline) {
        cy.wait("@signupError");
      }
    });
  });

  // ---------- FORM INPUT VALIDATION ----------
  it("accepts valid form inputs", () => {
    cy.get('input[name="name"]')
      .type("Cytest User")
      .should("have.value", "Cytest User");
    cy.get('input[name="email"]')
      .type("cytest@gmail.com")
      .should("have.value", "cytest@gmail.com");
    cy.get('input[name="password"]')
      .type("123456788")
      .should("have.value", "123456788");
    cy.get('input[name="confirmPassword"]')
      .type("123456788")
      .should("have.value", "123456788");
  });
});

describe("Login Page", () => {
  const frontendUrl = "http://localhost:5173";
  const apiUrl = "http://localhost:3000";

  beforeEach(() => {
    cy.visit(`${frontendUrl}/signup?mode=login&ip=localhost`);
  });

  // ---------- RENDER TESTS ----------
  it("renders all login elements", () => {
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get(".login__btn").should("contain.text", "Login");
    cy.get(".signup__btn").should("contain.text", "Register");
  });

  // ---------- VALIDATION ----------
  it("shows validation errors for empty fields", () => {
    cy.get("form").submit();
    cy.get('input[name="email"]:invalid').should("exist");
    cy.get('input[name="password"]:invalid').should("exist");
  });

  // ---------- LOGIN SUCCESS ----------
  it("handles successful login", () => {
    cy.get('input[name="email"]').type("cytest@gmail.com");
    cy.get('input[name="password"]').type("123456788");

    cy.get("form").submit();

    // cy.window().then((win) => {
    //   expect(win.localStorage.getItem("isAuthenticated")).to.equal("true");
    // });

    cy.on("window:alert", (text) => {
      expect(text).to.equal("Welcom back!");
    });

    cy.url().should("include", "/");
  });

  // ---------- MODE TOGGLE ----------
  it("toggles between login and signup modes", () => {
    cy.get(".login__btn.active").should("exist");

    cy.get(".signup__btn").click();
    cy.url().should("include", "mode=signup");
    cy.get(".signup__btn.active").should("exist");
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="confirmPassword"]').should("exist");

    cy.get(".login__btn").click();
    cy.url().should("include", "mode=login");
    cy.get(".login__btn.active").should("exist");
    cy.get('input[name="name"]').should("not.exist");
  });
});
