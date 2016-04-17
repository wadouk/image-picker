"use strict";

(function () {
    var takePicture = document.querySelector("#my-input");
    var myCanvas = document.querySelector("#my-canvas");
    var myImg = document.querySelector("#my-img");

    // Set events
    takePicture.onchange = function (event) {
        // Get a reference to the taken picture or chosen file
        var files = event.target.files;
        if (files && files.length > 0) {
            var file = files[0];
            try {
                // Get window.URL object
                var URL = window.URL || window.webkitURL;

                // Create ObjectURL
                var imgURL = URL.createObjectURL(file);

                // Set img src to ObjectURL
                var showPicture = new Image();
                console.log("url", imgURL);
                showPicture.src = imgURL;

                // Revoke ObjectURL after imagehas loaded
                showPicture.onload = function () {
                    myImg.src = imgURL;
                    myCanvas.width = myImg.width;
                    myCanvas.height = myImg.height;
                    myCanvas.getContext("2d").drawImage(myImg, 0, 0, myImg.width, myImg.height);
                    URL.revokeObjectURL(imgURL);
                };
            }
            catch (e) {
                try {
                    // Fallback if createObjectURL is not supported
                    var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        showPicture.src = event.target.result;
                    };
                    fileReader.readAsDataURL(file);
                }
                catch (e) {
                    // Display error message
                    var error = document.querySelector("#error");
                    if (error) {
                        error.innerHTML = "Neither createObjectURL or FileReader are supported";
                    }
                }
            }
        }
    }
})();


