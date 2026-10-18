const { test } = require("@playwright/test");
const POManager = require("../pages/POManager");
const testData = require("../Utils/PlaceOrderTestData.json");

const runId = Date.now()
const validUsername = testData.validUser.username + runId
const validPassword = testData.validUser.password

test.beforeAll(async({browser})=>{
    const page=await browser.newPage()
    const signup=new POManager(page).getSignupPage()
    await signup.goto()
    await signup.validSignup(validUsername,validPassword)
    await page.close()
})

test('1. Sign Up -> Enter Data -> Click Sign Up',async({page})=>{
    const signup=new POManager(page).getSignupPage()
    await signup.goto()
    await signup.validSignup(testData.signup.username+Date.now(),testData.signup.password)
})

test('2. Sign Up -> Enter Data -> Click Close',async({page})=>{
    const signup=new POManager(page).getSignupPage()
    await signup.goto()
    await signup.closeSignup(testData.signup.username+Date.now(),testData.signup.password)
})

test('3. Login with valid credentials',async({page})=>{
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)
})

test('4. Login with invalid username and valid password',async({page})=>{
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.invalidLogin(testData.invalidUsername.username+runId,testData.invalidUsername.password,testData.invalidUsername.message)
})

test('5. Login with valid username and invalid password',async({page})=>{
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.invalidLogin(validUsername,testData.invalidPassword.password,testData.invalidPassword.message)
})

test('6. Login with invalid username and invalid password',async({page})=>{
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.invalidLogin(testData.invalidBoth.username+runId,testData.invalidBoth.password,testData.invalidBoth.message)
})

test('7. Login -> Select a product -> Add to Cart -> Click OK',async({page})=>{
    const pomanager=new POManager(page)

    const login=pomanager.getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)

    await pomanager.getDashboard().selectProduct(testData.addToCart.category,testData.addToCart.product)
    await pomanager.getCart().addToCart()
})

test('8. Login -> Phones product -> Add to Cart -> OK -> Add details -> Purchase',async({page})=>{
    const pomanager=new POManager(page)

    const login=pomanager.getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)

    await pomanager.getDashboard().selectProduct(testData.phonePurchase.category,testData.phonePurchase.product)

    const cart=pomanager.getCart()
    await cart.addToCart()
    await cart.openCart(testData.phonePurchase.product)
    await cart.placeOrder()

    const shippingDetails=pomanager.getShippingDetails()
    await shippingDetails.enterDetails(testData.shippingDetails.name,testData.shippingDetails.country,testData.shippingDetails.city,testData.shippingDetails.card,testData.shippingDetails.month,testData.shippingDetails.year)
    await shippingDetails.purchase()

    await pomanager.getSummary().verifyPurchase()
})

test('9. Login -> Monitors product -> Add to Cart -> OK -> Add details -> Purchase',async({page})=>{
    const pomanager=new POManager(page)

    const login=pomanager.getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)

    await pomanager.getDashboard().selectProduct(testData.monitorPurchase.category,testData.monitorPurchase.product)

    const cart=pomanager.getCart()
    await cart.addToCart()
    await cart.openCart(testData.monitorPurchase.product)
    await cart.placeOrder()

    const shippingDetails=pomanager.getShippingDetails()
    await shippingDetails.enterDetails(testData.shippingDetails.name,testData.shippingDetails.country,testData.shippingDetails.city,testData.shippingDetails.card,testData.shippingDetails.month,testData.shippingDetails.year)
    await shippingDetails.purchase()

    await pomanager.getSummary().verifyPurchase()
})

test('10. Login with valid credentials -> Logout',async({page})=>{
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)
    await login.logout()
})
