"use strict";
var globals_1 = require('protractor/globals');
var CoreUIPage = (function () {
    function CoreUIPage() {
    }
    CoreUIPage.prototype.navigateTo = function () {
        return globals_1.browser.get('/');
    };
    CoreUIPage.prototype.getParagraphText = function () {
        return globals_1.element(globals_1.by.css('app-root h1')).getText();
    };
    return CoreUIPage;
}());
exports.CoreUIPage = CoreUIPage;
//# sourceMappingURL=app.po.js.map