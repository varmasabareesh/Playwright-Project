const { expect } = require("@playwright/test");

class ShippingDetails{
    constructor(page){
        this.page=page
        this.form=page.getByRole("dialog", { name: "Place order" })
        this.name=this.form.getByLabel("Name:")
        this.country=this.form.getByLabel("Country:")
        this.city=this.form.getByLabel("City:")
        this.card=this.form.getByLabel("Credit card:")
        this.month=this.form.getByLabel("Month:")
        this.year=this.form.getByLabel("Year:")
        this.purchasebtn=this.form.getByRole("button", { name: "Purchase" })
    }

    async enterDetails(name,country,city,card,month,year)
    {
        await expect(this.form).toBeVisible();
        await this.name.fill(name);
        await this.country.fill(country);
        await this.city.fill(city);
        await this.card.fill(card);
        await this.month.fill(month);
        await this.year.fill(year);
    }

    async purchase()
    {
        await this.purchasebtn.click();
    }
}
module.exports=ShippingDetails
