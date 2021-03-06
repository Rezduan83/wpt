// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.shadow.image.alpha
// Description:Shadows are drawn correctly for partially-transparent images
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("Shadows are drawn correctly for partially-transparent images");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.shadowOffsetY = 50;
ctx.shadowColor = '#00f';
var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/images/transparent50.png');
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
        resolve(xhr.response);
    };
});
promise.then(function(response) {
    createImageBitmap(response).then(bitmap => {
        ctx.drawImage(bitmap, 0, -50);
        _assertPixelApprox(offscreenCanvas, 50,25, 127,0,127,255, "50,25", "127,0,127,255", 2);
    }, t_fail);
}).then(t_pass, t_fail);

});
done();
