const { expect } = require("@playwright/test");

class Dashboard{
    constructor(page){
        this.page=page
    }

    async selectCategory(category)
    {
        await this.page.getByText(category, { exact: true }).click();
    }

    async selectProduct(category,product)
    {
        await this.selectCategory(category);
        await this.page.getByText(product, { exact: true }).click();
        await expect(this.page.getByText(product, { exact: true })).toBeVisible();
    }
}
module.exports=Dashboard
