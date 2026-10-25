const { expect } = require("@playwright/test");

class Login{
    constructor(page){
        this.page=page
        this.loginlnk=page.getByRole("link", { name: "Log in" })
        this.form=page.getByRole("dialog", { name: "Log in" })
        this.username=this.form.getByTestId("loginusername")
        this.password=this.form.getByTestId("loginpassword")
        this.loginbtn=this.form.getByRole("button", { name: "Log in" })
        this.logoutlnk=page.getByText("Log out")
    }

    async goto()
    {
        await this.page.goto("https://www.demoblaze.com/")
    }

    async login(username,password)
    {
        await this.loginlnk.click();
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginbtn.click();
    }

    async validLogin(username,password)
    {
        await this.login(username,password);
        await expect(this.page.getByText(`Welcome ${username}`)).toBeVisible();
    }

    async invalidLogin(username,password,message)
    {
        const waitForDialog = this.page.waitForEvent("dialog");
        await this.login(username,password);
        const dialog = await waitForDialog;
        expect(dialog.message()).toBe(message);
        await dialog.accept();
    }

    async logout()
    {
        await this.logoutlnk.click();
        await expect(this.loginlnk).toBeVisible();
    }
}
module.exports=Login
