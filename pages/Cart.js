const { expect } = require("@playwright/test");

class Cart{
    constructor(page){
        this.page=page
        this.addtocartbtn=page.getByText("Add to cart")
        this.cartlnk=page.getByText("Cart", { exact: true })
        this.placeorderbtn=page.getByText("Place Order", { exact: true })
    }

    async addToCart()
    {
        const waitForDialog = this.page.waitForEvent("dialog");
        await this.addtocartbtn.click();
        const dialog = await waitForDialog;
        expect(dialog.message()).toContain("Product added");
        await dialog.accept();
    }

    async openCart(product)
    {
        await this.cartlnk.click();
        await expect(this.page.getByText(product).first()).toBeVisible();
    }

    async placeOrder()
    {
        await this.placeorderbtn.click();
    }
}
module.exports=Cart
