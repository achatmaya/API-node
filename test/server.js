const { setMaxIdleHTTPParsers } = require("http");

async function test (){
    console.log("bonjour");
    // eslint-disable-next-line no-undef
    await sleep(10);
    console.log(" maya");
}

test();
