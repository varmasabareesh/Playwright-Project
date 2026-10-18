const config = ({
  testDir:'./tests',
  timeout:60*1000,
  expect:{
    timeout:60*1000
  },
  reporter:'html',
  use:{
    browserName:'chromium',
    testIdAttribute:'id',
    headless:false,
    screenshot:'on',
    trace:'on',
    video:'on'
  },
})
module.exports=config