(function() {
    
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBHWcvS8zujcxwdjf0iM_GgtC0BciYPpgQ",
    authDomain: "mykonosdb.firebaseapp.com",
    databaseURL: "https://mykonosdb.firebaseio.com",
    projectId: "mykonosdb",
    storageBucket: "mykonosdb.appspot.com",
    messagingSenderId: "910009904473"
    };
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    
    // Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    
    // Add login event
    btnLogin.addEventListener('click', e => {
        // Get email and password (pass)
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        const user = firebase.auth().currentUser;
        if (user){
            window.location = 'index-firebase.html'
        }
    });
    
    // Add signup event
    btnSignUp.addEventListener('click', e => {
        // Get email and password (pass)
        // TODO: Check for real email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    
    // Add logout event
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        window.location = 'signup-login.html'
    })
    
    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
        } else {
            if(window.location=='index-firebase.html'){
                window.location = 'signup-login.html'
            }
            console.log('not logged in');
        }
    });
    
}());