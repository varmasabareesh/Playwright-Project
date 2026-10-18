const { expect } = require("@playwright/test");

class Dashboard{
    constructor(page){
        this.page=page
    }

    async selectCategory(category)
    {
        await this.page.getByRole("link", { name: category }).click();
    }

    async selectProduct(category,product)
    {
        await this.selectCategory(category);
        await this.page.getByRole("link", { name: product }).click();
        await expect(this.page.getByRole("heading", { name: product })).toBeVisible();
    }
}
module.exports=Dashboard
