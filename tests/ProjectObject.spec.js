const { test } = require("@playwright/test");
const POManager = require("../pages/POManager");
const testData = JSON.parse(JSON.stringify(require("../Utils/PlaceOrderTestData.json")));

const runId = Date.now()
const validUsername = testData.validUser.username + runId
const validPassword = testData.validUser.password

test.beforeAll(async({browser})=>{
    const page=await browser.newPage()
    const signup=new POManager(page).getSignupPage()
    await signup.goto()
    await signup.validSignup(validUsername,validPassword)
    await page.close()
    console.log("Created user: "+validUsername)
})

test('1. Sign Up -> Enter Data -> Click Sign Up',async({page})=>{
    const data=testData.signup
    const signup=new POManager(page).getSignupPage()
    await signup.goto()
    await signup.validSignup(data.username+Date.now(),data.password)
    console.log("Sign up successful")
})

test('2. Sign Up -> Enter Data -> Click Close',async({page})=>{
    const data=testData.signup
    const signup=new POManager(page).getSignupPage()
    await signup.goto()
    await signup.closeSignup(data.username+Date.now(),data.password)
    console.log("Sign up popup closed")
})

test('3. Login with valid credentials',async({page})=>{
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)
    console.log("Logged in as: "+validUsername)
})

test('4. Login with invalid username and valid password',async({page})=>{
    const data=testData.invalidUsername
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.invalidLogin(data.username+runId,data.password,data.message)
    console.log("Login failed as expected: "+data.message)
})

test('5. Login with valid username and invalid password',async({page})=>{
    const data=testData.invalidPassword
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.invalidLogin(validUsername,data.password,data.message)
    console.log("Login failed as expected: "+data.message)
})

test('6. Login with invalid username and invalid password',async({page})=>{
    const data=testData.invalidBoth
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.invalidLogin(data.username+runId,data.password,data.message)
    console.log("Login failed as expected: "+data.message)
})

test('7. Login -> Select a product -> Add to Cart -> Click OK',async({page})=>{
    const data=testData.addToCart
    const pomanager=new POManager(page)

    const login=pomanager.getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)

    await pomanager.getDashboard().selectProduct(data.category,data.product)
    await pomanager.getCart().addToCart()
    console.log("Added to cart: "+data.product)
})

test('8. Login -> Phones product -> Add to Cart -> OK -> Add details -> Purchase',async({page})=>{
    const data=testData.phonePurchase
    const pomanager=new POManager(page)

    const login=pomanager.getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)

    await pomanager.getDashboard().selectProduct(data.category,data.product)

    const cart=pomanager.getCart()
    await cart.addToCart()
    await cart.openCart(data.product)
    await cart.placeOrder()

    const shipping=testData.shippingDetails
    const shippingDetails=pomanager.getShippingDetails()
    await shippingDetails.enterDetails(shipping.name,shipping.country,shipping.city,shipping.card,shipping.month,shipping.year)
    await shippingDetails.purchase()

    await pomanager.getSummary().verifyPurchase()
    console.log("Purchased: "+data.product)
})

test('9. Login -> Monitors product -> Add to Cart -> OK -> Add details -> Purchase',async({page})=>{
    const data=testData.monitorPurchase
    const pomanager=new POManager(page)

    const login=pomanager.getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)

    await pomanager.getDashboard().selectProduct(data.category,data.product)

    const cart=pomanager.getCart()
    await cart.addToCart()
    await cart.openCart(data.product)
    await cart.placeOrder()

    const shipping=testData.shippingDetails
    const shippingDetails=pomanager.getShippingDetails()
    await shippingDetails.enterDetails(shipping.name,shipping.country,shipping.city,shipping.card,shipping.month,shipping.year)
    await shippingDetails.purchase()

    await pomanager.getSummary().verifyPurchase()
    console.log("Purchased: "+data.product)
})

test('10. Login with valid credentials -> Logout',async({page})=>{
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)
    await login.logout()
    console.log("Logged out: "+validUsername)
})
