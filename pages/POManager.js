const Cart=require("./Cart")
const Dashboard=require("./Dashboard")
const Login=require("./Login")
const ShippingDetails=require("./ShippingDetails")
const Signup=require("./Signup")
const Summary=require("./Summary")

class POManager{
    constructor (page){
        this.page=page
        this.signup=new Signup(page)
        this.login=new Login(page)
        this.dashboard=new Dashboard(page)
        this.cart=new Cart(page)
        this.shipping=new ShippingDetails(page)
        this.summary=new Summary(page)
    }
    getSignupPage(){
        return this.signup
    }
    getLoginPage(){
        return this.login
    }
    getDashboard(){
        return this.dashboard
    }
    getCart(){
        return this.cart
    }
    getShippingDetails(){
        return this.shipping
    }
    getSummary(){
        return this.summary
    }
}
module.exports=POManager
