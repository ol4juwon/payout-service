const crypto = require('crypto');

const bin = "010000010000001000000101000001010000011100001011010011010001000100010010000100010000110100001001000001110001001000100100000010000000000100001100000000110000010100000111000010110000110100011011";
const ivBin = "0100000100000010000000110000010100000011000110110000110100010001";
function binaryToAscii(binaryString) {
    // Split the binary string into 8-bit chunks
    const chunks = binaryString.match(/.{1,8}/g);

    // Convert each chunk to its decimal equivalent and then to ASCII
    const asciiChars = chunks.map(chunk => String.fromCharCode(parseInt(chunk, 2)));

    // Join the ASCII characters together to form the resulting string
    return asciiChars.join('');
}

function encryptData(data, key, iv) {
    console.log({data})
    const cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    console.log("Encryped data ", encrypted);
    return encrypted;
}
const asciikey = binaryToAscii(bin);
const asciiIV = binaryToAscii(ivBin);

console.log(binaryToAscii(bin).length);
console.log(" kkiv:",binaryToAscii(ivBin).length);
const x = {
    "Referenceid": "221222123211123",
    "RequestType": 152,
    "Translocation": "sample"
  }
console.log("\n--", encryptData(JSON.stringify(x), asciikey, asciiIV))