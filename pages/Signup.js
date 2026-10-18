const { expect } = require("@playwright/test");

class Signup{
    constructor(page){
        this.page=page
        this.signuplnk=page.getByRole("link", { name: "Sign up" })
        this.form=page.getByRole("dialog", { name: "Sign up" })
        this.username=this.form.getByLabel("Username:")
        this.password=this.form.getByLabel("Password:")
        this.signupbtn=this.form.getByRole("button", { name: "Sign up" })
        this.closebtn=this.form.getByText("Close")
    }
    
    async goto()
    {
        await this.page.goto("https://www.demoblaze.com/")
    }
    
    async validSignup(username,password)
    {
        await this.signuplnk.click();
        await this.username.fill(username);
        await this.password.fill(password);
        const waitForDialog = this.page.waitForEvent("dialog");
        await this.signupbtn.click();
        const dialog = await waitForDialog;
        expect(dialog.message()).toBe("Sign up successful.");
        await dialog.accept();
    }

    async closeSignup(username,password)
    {
        await this.signuplnk.click();
        await this.username.fill(username);
        await this.password.fill(password);
        await this.closebtn.click();
        await expect(this.form).toBeHidden();
    }
}
module.exports=Signup