var config = {
    apiKey: "AIzaSyDemJ0WlHu0HiaKLp1B11Kn-MDScBCl8wY",
    authDomain: "ipos-4a098.firebaseapp.com",
    databaseURL: "https://ipos-4a098.firebaseio.com",
    storageBucket: "ipos-4a098.appspot.com",
};

firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(function(currentUser) {
            if (currentUser) {
                // the user is logged in, you can bootstrap functionality now
            } else {
                window.location = "/login";
            }
        });