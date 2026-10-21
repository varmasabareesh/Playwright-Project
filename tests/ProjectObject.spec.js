const { test } = require("@playwright/test");
const POManager = require("../pages/POManager");
const testData = JSON.parse(JSON.stringify(require("../Utils/PlaceOrderTestData.json")));

const runId = Date.now()
const validUsername = testData[0].username + runId
const validPassword = testData[0].password

test.beforeAll(async({browser})=>{
    const page=await browser.newPage()
    const signup=new POManager(page).getSignupPage()
    await signup.goto()
    await signup.validSignup(validUsername,validPassword)
    await page.close()
    console.log("Created user: "+validUsername)
})

test('1. Sign Up -> Enter Data -> Click Sign Up',async({page})=>{
    const data=testData[1]
    const signup=new POManager(page).getSignupPage()
    await signup.goto()
    await signup.validSignup(data.username+Date.now(),data.password)
    console.log("Sign up successful")
})

test('2. Sign Up -> Enter Data -> Click Close',async({page})=>{
    const data=testData[1]
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
    const data=testData[3]
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.invalidLogin(data.username+runId,data.password,data.message)
    console.log("Login failed as expected: "+data.message)
})

test('5. Login with valid username and invalid password',async({page})=>{
    const data=testData[4]
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.invalidLogin(validUsername,data.password,data.message)
    console.log("Login failed as expected: "+data.message)
})

test('6. Login with invalid username and invalid password',async({page})=>{
    const data=testData[5]
    const login=new POManager(page).getLoginPage()
    await login.goto()
    await login.invalidLogin(data.username+runId,data.password,data.message)
    console.log("Login failed as expected: "+data.message)
})

test('7. Login -> Select a product -> Add to Cart -> Click OK',async({page})=>{
    const data=testData[2]
    const pomanager=new POManager(page)

    const login=pomanager.getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)

    await pomanager.getDashboard().selectProduct(data.category,data.product)
    await pomanager.getCart().addToCart()
    console.log("Added to cart: "+data.product)
})

test('8. Login -> Phones product -> Add to Cart -> OK -> Add details -> Purchase',async({page})=>{
    const data=testData[6]
    const pomanager=new POManager(page)

    const login=pomanager.getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)

    await pomanager.getDashboard().selectProduct(data.category,data.product)

    const cart=pomanager.getCart()
    await cart.addToCart()
    await cart.openCart(data.product)
    await cart.placeOrder()

    const shippingDetails=pomanager.getShippingDetails()
    await shippingDetails.enterDetails(testData[8].name,testData[8].country,testData[8].city,testData[8].card,testData[8].month,testData[8].year)
    await shippingDetails.purchase()

    await pomanager.getSummary().verifyPurchase()
    console.log("Purchased: "+data.product)
})

test('9. Login -> Monitors product -> Add to Cart -> OK -> Add details -> Purchase',async({page})=>{
    const data=testData[7]
    const pomanager=new POManager(page)

    const login=pomanager.getLoginPage()
    await login.goto()
    await login.validLogin(validUsername,validPassword)

    await pomanager.getDashboard().selectProduct(data.category,data.product)

    const cart=pomanager.getCart()
    await cart.addToCart()
    await cart.openCart(data.product)
    await cart.placeOrder()

    const shippingDetails=pomanager.getShippingDetails()
    await shippingDetails.enterDetails(testData[8].name,testData[8].country,testData[8].city,testData[8].card,testData[8].month,testData[8].year)
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
