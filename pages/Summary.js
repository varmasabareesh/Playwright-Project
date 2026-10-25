const { expect } = require("@playwright/test");

class Summary{
    constructor(page){
        this.page=page
        this.message=page.getByText("Thank you for your purchase!")
        this.okbtn=page.getByText("OK", { exact: true })
    }

    async verifyPurchase()
    {
        await expect(this.message).toBeVisible();
        await this.okbtn.click();
        await expect(this.message).toBeHidden();
    }
}
module.exports=Summary
