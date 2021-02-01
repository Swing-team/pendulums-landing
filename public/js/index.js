var u = require('umbrellajs');
var QRCode = require('qrcode');

var btcAddress = '1BXb1d768Qva9Bj1NRgRMj9WTv7JQjMkuA';
var ethAddress = '0xD01Ed3B39C57e5762324fA15fe364844A06bF66c';
var bchAddress = '12ZZiF44W65QHN9QDrUh8qL6HvhUK44Gy2';

isLinuxLinksShownUp = false;
isLinuxLinksShownDown = false;

isAndroidLinksShownUp = false;
isAndroidLinksShownDown = false;

document.addEventListener("click", function(e){
    if (isLinuxLinksShownUp || isLinuxLinksShownDown) {
        u('.ps-linux-links-container').addClass("ps-hidden");
        setTimeout(function () {
            u('.ps-linux-links-container').addClass("ps-hidden-content");
        }, 300);
        isLinuxLinksShownUp = false;
        isLinuxLinksShownDown = false;
    }

    if (isAndroidLinksShownUp || isAndroidLinksShownDown) {
        u('.ps-android-links-container').addClass("ps-hidden");
        setTimeout(function () {
            u('.ps-android-links-container').addClass("ps-hidden-content");
        }, 300);
        isAndroidLinksShownUp = false;
        isAndroidLinksShownDown = false;
    }
});

getAppVersion();

window.linuxLinksShowAndHide = function (e, from) {
    if (isAndroidLinksShownUp || isAndroidLinksShownDown) {
        u('.ps-android-links-container').addClass("ps-hidden");
        setTimeout(function () {
            u('.ps-android-links-container').addClass("ps-hidden-content");
        }, 300);
        isAndroidLinksShownUp = false;
        isAndroidLinksShownDown = false;
    }

    if (from === 'upLinks'){
        if (isLinuxLinksShownUp) {
            setTimeout(function () {
                u(u(e.target).siblings('.ps-linux-links-container').first()).addClass("ps-hidden-content");
            }, 300);
            u(u(e.target).siblings('.ps-linux-links-container').first()).toggleClass("ps-hidden");
        } else {
            u(u(e.target).siblings('.ps-linux-links-container').first()).removeClass("ps-hidden-content");
            setTimeout(function() {
                u(u(e.target).siblings('.ps-linux-links-container').first()).toggleClass("ps-hidden");
            }, 20);
        }
        isLinuxLinksShownUp = !isLinuxLinksShownUp;
        e.stopPropagation();
    } else if (from === 'downLinks'){
        if (isLinuxLinksShownDown) {
            setTimeout(function () {
                u(u(e.target).siblings('.ps-linux-links-container').first()).addClass("ps-hidden-content");
            }, 300);
            u(u(e.target).siblings('.ps-linux-links-container').first()).toggleClass("ps-hidden");
        } else {
            u(u(e.target).siblings('.ps-linux-links-container').first()).removeClass("ps-hidden-content");
            setTimeout(function() {
                u(u(e.target).siblings('.ps-linux-links-container').first()).toggleClass("ps-hidden");
            }, 20);
        }
        isLinuxLinksShownDown = !isLinuxLinksShownDown;
        e.stopPropagation();
    }
};


window.androidLinksShowAndHide = function (e, from) {
    if (isLinuxLinksShownUp || isLinuxLinksShownDown) {
        u('.ps-linux-links-container').addClass("ps-hidden");
        setTimeout(function () {
            u('.ps-linux-links-container').addClass("ps-hidden-content");
        }, 300);
        isLinuxLinksShownUp = false;
        isLinuxLinksShownDown = false;
    }

    if (from === 'upLinks'){
        if (isAndroidLinksShownUp) {
            setTimeout(function () {
                u(u(e.target).siblings('.ps-android-links-container').first()).addClass("ps-hidden-content");
            }, 300);
            u(u(e.target).siblings('.ps-android-links-container').first()).toggleClass("ps-hidden");
        } else {
            u(u(e.target).siblings('.ps-android-links-container').first()).removeClass("ps-hidden-content");
            setTimeout(function() {
                u(u(e.target).siblings('.ps-android-links-container').first()).toggleClass("ps-hidden");
            }, 20);
        }
        isAndroidLinksShownUp = !isAndroidLinksShownUp;
        e.stopPropagation();
    } else if (from === 'downLinks'){
        if (isAndroidLinksShownDown) {
            setTimeout(function () {
                u(u(e.target).siblings('.ps-android-links-container').first()).addClass("ps-hidden-content");
            }, 300);
            u(u(e.target).siblings('.ps-android-links-container').first()).toggleClass("ps-hidden");
        } else {
            u(u(e.target).siblings('.ps-android-links-container').first()).removeClass("ps-hidden-content");
            setTimeout(function() {
                u(u(e.target).siblings('.ps-android-links-container').first()).toggleClass("ps-hidden");
            }, 20);
        }
        isAndroidLinksShownDown = !isAndroidLinksShownDown;
        e.stopPropagation();
    }
};

function getAppVersion () {
    var versionApiUrl = 'https://app.pendulums.io/api/app/version';

    fetch(versionApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(version) {
        u('.ps-version').text('Version: ' + version.appVersion);
    })
    .catch(function(err) {
        console.log(err);
    });
}

window.captchaChecker = function () {
    u('#contactus').attr('disabled', true);

    var recaptchaRes = window.grecaptcha.getResponse();
    var subjectValue = u('#subject').first().value;
    var emailValue = u('#email').first().value;
    var nameValue = u('#name').first().value;
    var messageValue = u('#message').first().value;

    // TODO: Ashkan Tofangdar : can do below in seperate function.
    if (!recaptchaRes || !subjectValue || !nameValue || !emailValue || !messageValue) {
        if (!recaptchaRes) {
            if (u('#reCaptchaWarning').hasClass('ps-warning-hidden')) {
                u('#reCaptchaWarning').removeClass('ps-warning-hidden');
            }
        } else {
            if (!u('#reCaptchaWarning').hasClass('ps-warning-hidden')) {
                u('#reCaptchaWarning').addClass('ps-warning-hidden');
            }
        }
        if (!subjectValue) {
            if (u('#subjectWarning').hasClass('ps-warning-hidden')) {
                u('#subjectWarning').removeClass('ps-warning-hidden');
            }
        } else {
            if (!u('#subjectWarning').hasClass('ps-warning-hidden')) {
                u('#subjectWarning').addClass('ps-warning-hidden');
            }
        }

        if (!emailValue) {
            if (u('#emailWarning').hasClass('ps-warning-hidden')) {
                u('#emailWarning').removeClass('ps-warning-hidden');
            }
        } else {
            if (!u('#emailWarning').hasClass('ps-warning-hidden')) {
                u('#emailWarning').addClass('ps-warning-hidden');
            }
        }

        if (!nameValue) {
            if (u('#nameWarning').hasClass('ps-warning-hidden')) {
                u('#nameWarning').removeClass('ps-warning-hidden');
            }
        } else {
            if (!u('#nameWarning').hasClass('ps-warning-hidden')) {
                u('#nameWarning').addClass('ps-warning-hidden');
            }
        }

        if (!messageValue) {
            if (u('#messageWarning').hasClass('ps-warning-hidden')) {
                u('#messageWarning').removeClass('ps-warning-hidden');
            }
        } else {
            if (!u('#messageWarning').hasClass('ps-warning-hidden')) {
                u('#messageWarning').addClass('ps-warning-hidden');
            }
        }
        u('#contactus').first().removeAttribute('disabled');
    } else {
        // uncomment below code for local tests
        // var url = "http://localhost:1337/contactus";

        var url = "https://app.pendulums.io/api/contactus";
        var data = {
            email: emailValue,
            senderName: nameValue,
            subject: subjectValue,
            message: messageValue,
            recaptchaResponse: recaptchaRes
        };

        var options = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data),
            method: "POST"
        };

        fetch(url, options)
        .then(function(data) {
            if (data.status === 200) {
                return {status: "ok", responseData: data};
            } else {
                return {status: "error", responseData: data};
            }
        }).then(function(res) {
            if (res.status === "ok") {
                u('#messageWarning').addClass('ps-warning-hidden');
                u('#nameWarning').addClass('ps-warning-hidden');
                u('#subjectWarning').addClass('ps-warning-hidden');
                u('#messageWarning').addClass('ps-warning-hidden');
                u('#emailWarning').addClass('ps-warning-hidden');
                u('#serverError').addClass('ps-warning-hidden');
                u('#reCaptchaWarning').addClass('ps-warning-hidden');
                u('#emailSent').removeClass('ps-email-sent-hidden');
                u('#contactus').removeClass('ps-contact-button');
                u('#contactus').addClass('ps-contact-button-success');
                u('#contactus').text('Sent');
                u('#contactus').attr('disabled', true);
            } else if (res.status === "error") {
                console.log(res.responseData);
                switch (res.responseData.errorCode) {
                    case 1:
                        if (u('#emailWarning').hasClass('ps-warning-hidden')) {
                            u('#emailWarning').removeClass('ps-warning-hidden');
                        }
                        break;

                    case 2:
                        if (!u('#emailWarning').hasClass('ps-warning-hidden')) {
                            u('#emailWarning').addClass('ps-warning-hidden');
                        }
                        if (u('#nameWarning').hasClass('ps-warning-hidden')) {
                            u('#nameWarning').removeClass('ps-warning-hidden');
                        }
                        break;

                    case 3:
                        if (!u('#emailWarning').hasClass('ps-warning-hidden')) {
                            u('#emailWarning').addClass('ps-warning-hidden');
                        }
                        if (!u('#nameWarning').hasClass('ps-warning-hidden')) {
                            u('#nameWarning').addClass('ps-warning-hidden');
                        }
                        if (u('#messageWarning').hasClass('ps-warning-hidden')) {
                            u('#messageWarning').removeClass('ps-warning-hidden');
                        }
                        break;

                    case 4:
                        if (!u('#emailWarning').hasClass('ps-warning-hidden')) {
                            u('#emailWarning').addClass('ps-warning-hidden');
                        }
                        if (!u('#nameWarning').hasClass('ps-warning-hidden')) {
                            u('#nameWarning').addClass('ps-warning-hidden');
                        }
                        if (!u('#messageWarning').hasClass('ps-warning-hidden')) {
                            u('#messageWarning').addClass('ps-warning-hidden');
                        }
                        if (u('#reCaptchaWarning').hasClass('ps-warning-hidden')) {
                            u('#reCaptchaWarning').removeClass('ps-warning-hidden');
                        }
                        break;

                    default:
                        if (u('#serverError').hasClass('ps-warning-hidden')) {
                            u('#serverError').removeClass('ps-warning-hidden');
                        }
                        break;
                }
                u('#contactus').first().removeAttribute('disabled');
            }
        })
        .catch(function(error) {
            console.log('this is the error: ', error);
            if (u('#serverError').hasClass('ps-warning-hidden')) {
                u('#serverError').removeClass('ps-warning-hidden');
            }
            u('#contactus').first().removeAttribute('disabled');
        });
    }
};

window.showDonationModal = function(cryptoCurrency) {
    var paymentAddress;
    randomPath = Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / Math.pow(2, 4))
    switch (cryptoCurrency) {
        case 'btc': {
            paymentAddress = btcAddress;
            break;
        }
        case 'eth': {
            paymentAddress = ethAddress;
            break;
        }
        case 'bch': {
            paymentAddress = bchAddress;
            break;
        }
    }
    QRCode.toCanvas(document.getElementById('donationQRCode'), paymentAddress, { width: 240 }, function (error) {
        if (error) {
            console.error(error);
        }
    });
    u('#donationAddress').text(paymentAddress);
    u('#donationModal').addClass('is-active');
    u('html').addClass('is-clipped');
}

window.closeDonationModal = function() {
    u('#donationModal').removeClass('is-active');
    u('html').removeClass('is-clipped');
}

window.openBurgerBar = function(e) {
    e.children[0].classList.toggle('ps-burger-icon-active');
    e.children[1].classList.toggle('ps-burger-icon-active');
    e.children[2].classList.toggle('ps-burger-icon-active');
    u('.ps-burger-menu-links').toggleClass('ps-burger-menu-active');
    u('html').toggleClass('ps-no-scroll');
};

window.removeBurgerMenuClasses = function() {
    u('.ps-burger-menu-line1').removeClass('ps-burger-icon-active');
    u('.ps-burger-menu-line2').removeClass('ps-burger-icon-active');
    u('.ps-burger-menu-line3').removeClass('ps-burger-icon-active');
    u('html').removeClass('ps-no-scroll');
    u('.ps-burger-menu-links').removeClass('ps-burger-menu-active');
};
