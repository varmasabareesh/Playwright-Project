const { expect } = require("@playwright/test");

class Summary{
    constructor(page){
        this.page=page
        this.message=page.getByRole("heading", { name: "Thank you for your purchase!" })
        this.okbtn=page.getByRole("button", { name: "OK" })
    }

    async verifyPurchase()
    {
        await expect(this.message).toBeVisible();
        await this.okbtn.click();
        await expect(this.message).toBeHidden();
    }
}
module.exports=Summary
