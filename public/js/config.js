
    var config = {
        apiKey: "AIzaSyDemJ0WlHu0HiaKLp1B11Kn-MDScBCl8wY",
        authDomain: "ipos-4a098.firebaseapp.com",
        databaseURL: "https://ipos-4a098.firebaseio.com",
        storageBucket: "ipos-4a098.appspot.com",
    };

    firebase.initializeApp(config);

    const emailinput = document.getElementById('email');
    const passwordinput = document.getElementById('password');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnSignOut');
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

   btnLogin.addEventListener("click", e => {
            e.preventDefault();
            const email = emailinput.value;
            const pass = passwordinput.value;
            const auth = firebase.auth();

            const promise = firebase.auth().signInWithEmailAndPassword(email, pass);

            promise.catch(e => console.log(e.message));
        });

    btnSignUp.addEventListener('click', e => {

        e.preventDefault();
        const email = emailinput.value;
        const pass = passwordinput.value;
        const auth = firebase.auth();

        const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);

        promise.catch(e => console.log(e.message));
    
    })

    btnLogout.addEventListener('click', e => {

        firebase.auth().signOut();
        window.location = '/logout';
    
    })

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
            window.location = '/index';
        }
    });
