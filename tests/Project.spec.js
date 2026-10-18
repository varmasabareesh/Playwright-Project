const { test, expect } = require("@playwright/test");

const username = "sab_user";
const password = "sab_pass";

test("1. Sign Up -> Enter Data -> Click Sign Up", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Sign up" }).click();
    const form = page.getByRole("dialog", { name: "Sign up" });
    await form.getByLabel("Username:").fill(`user_${Date.now()}`);
    await form.getByLabel("Password:").fill(password);
    const waitForDialog = page.waitForEvent("dialog");
    await form.getByRole("button", { name: "Sign up" }).click();
    const dialog = await waitForDialog;
    expect(dialog.message()).toBe("Sign up successful.");
    await dialog.accept();
});

test("2. Sign Up -> Enter Data -> Click Close", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Sign up" }).click();
    const form = page.getByRole("dialog", { name: "Sign up" });
    await form.getByLabel("Username:").fill(`user_${Date.now()}`);
    await form.getByLabel("Password:").fill(password);
    await form.getByText("Close").click();
    await expect(form).toBeHidden();
});

test("3. Login with valid credentials", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Log in" }).click();
    const form = page.getByRole("dialog", { name: "Log in" });
    await form.getByTestId("loginusername").fill(username);
    await form.getByTestId("loginpassword").fill(password);
    await form.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByText(`Welcome ${username}`)).toBeVisible();
});

test("4. Login with invalid username and valid password", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Log in" }).click();
    const form = page.getByRole("dialog", { name: "Log in" });
    await form.getByTestId("loginusername").fill(`invaliduser_${Date.now()}`);
    await form.getByTestId("loginpassword").fill(password);
    const waitForDialog = page.waitForEvent("dialog");
    await form.getByRole("button", { name: "Log in" }).click();
    const dialog = await waitForDialog;
    expect(dialog.message()).toBe("User does not exist.");
    await dialog.accept();
});

test("5. Login with valid username and invalid password", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Log in" }).click();
    const form = page.getByRole("dialog", { name: "Log in" });
    await form.getByTestId("loginusername").fill(username);
    await form.getByTestId("loginpassword").fill("wrong_pass");
    const waitForDialog = page.waitForEvent("dialog");
    await form.getByRole("button", { name: "Log in" }).click();
    const dialog = await waitForDialog;
    expect(dialog.message()).toBe("Wrong password.");
    await dialog.accept();
});

test("6. Login with invalid username and invalid password", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Log in" }).click();
    const form = page.getByRole("dialog", { name: "Log in" });
    await form.getByTestId("loginusername").fill(`invaliduser_${Date.now()}`);
    await form.getByTestId("loginpassword").fill("wrong_pass");
    const waitForDialog = page.waitForEvent("dialog");
    await form.getByRole("button", { name: "Log in" }).click();
    const dialog = await waitForDialog;
    expect(dialog.message()).toBe("User does not exist.");
    await dialog.accept();
});

test("7. Login -> Select a product -> Add to Cart -> Click OK", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Log in" }).click();
    const form = page.getByRole("dialog", { name: "Log in" });
    await form.getByTestId("loginusername").fill(username);
    await form.getByTestId("loginpassword").fill(password);
    await form.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByText(`Welcome ${username}`)).toBeVisible();
    await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
    const waitForDialog = page.waitForEvent("dialog");
    await page.getByRole("link", { name: "Add to cart" }).click();
    const dialog = await waitForDialog;
    expect(dialog.message()).toContain("Product added");
    await dialog.accept();
});

test("8. Login -> Phones product -> Add to Cart -> OK -> Add details -> Purchase", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Log in" }).click();
    const form = page.getByRole("dialog", { name: "Log in" });
    await form.getByTestId("loginusername").fill(username);
    await form.getByTestId("loginpassword").fill(password);
    await form.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByText(`Welcome ${username}`)).toBeVisible();

    await page.getByRole("link", { name: "Phones" }).click();
    await page.getByRole("link", { name: "Nokia lumia 1520" }).click();
    const waitForDialog = page.waitForEvent("dialog");
    await page.getByRole("link", { name: "Add to cart" }).click();
    const dialog = await waitForDialog;
    expect(dialog.message()).toContain("Product added");
    await dialog.accept();

    await page.getByRole("link", { name: "Cart", exact: true }).click();
    await expect(page.getByRole("cell", { name: "Nokia lumia 1520" }).first()).toBeVisible();
    await page.getByRole("button", { name: "Place Order" }).click();
    const order = page.getByRole("dialog", { name: "Place order" });
    await order.getByLabel("Name:").fill("Test User");
    await order.getByLabel("Country:").fill("Germany");
    await order.getByLabel("City:").fill("Berlin");
    await order.getByLabel("Credit card:").fill("4111111111111111");
    await order.getByLabel("Month:").fill("10");
    await order.getByLabel("Year:").fill("2026");
    await order.getByRole("button", { name: "Purchase" }).click();

    await expect(page.getByRole("heading", { name: "Thank you for your purchase!" })).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
});

test("9. Login -> Monitors product -> Add to Cart -> OK -> Add details -> Purchase", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Log in" }).click();
    const form = page.getByRole("dialog", { name: "Log in" });
    await form.getByTestId("loginusername").fill(username);
    await form.getByTestId("loginpassword").fill(password);
    await form.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByText(`Welcome ${username}`)).toBeVisible();

    await page.getByRole("link", { name: "Monitors" }).click();
    await page.getByRole("link", { name: "Apple monitor 24" }).click();
    const waitForDialog = page.waitForEvent("dialog");
    await page.getByRole("link", { name: "Add to cart" }).click();
    const dialog = await waitForDialog;
    expect(dialog.message()).toContain("Product added");
    await dialog.accept();

    await page.getByRole("link", { name: "Cart", exact: true }).click();
    await expect(page.getByRole("cell", { name: "Apple monitor 24" }).first()).toBeVisible();
    await page.getByRole("button", { name: "Place Order" }).click();
    const order = page.getByRole("dialog", { name: "Place order" });
    await order.getByLabel("Name:").fill("Test User");
    await order.getByLabel("Country:").fill("Germany");
    await order.getByLabel("City:").fill("Berlin");
    await order.getByLabel("Credit card:").fill("4111111111111111");
    await order.getByLabel("Month:").fill("10");
    await order.getByLabel("Year:").fill("2026");
    await order.getByRole("button", { name: "Purchase" }).click();

    await expect(page.getByRole("heading", { name: "Thank you for your purchase!" })).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
});

test("10. Login with valid credentials -> Logout", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Log in" }).click();
    const form = page.getByRole("dialog", { name: "Log in" });
    await form.getByTestId("loginusername").fill(username);
    await form.getByTestId("loginpassword").fill(password);
    await form.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByText(`Welcome ${username}`)).toBeVisible();

    await page.getByRole("link", { name: "Log out" }).click();
    await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
});