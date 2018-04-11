var captchapng = require('captchapng');

function getImg() {
    var text = parseInt(Math.random() * 9000 + 1000);
    
    var p = new captchapng(80, 30, text ); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    return {
        text: text,
        imgbase64: img
    };
}
exports.img = getImg;

