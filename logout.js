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
    
    // Active auth state observer
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            console.log("Attempted Sign in");
            console.log(user);
        } else {
            console.log('LOGGED OUT')
            window.location.replace('login.html');
        }
    });
    
    // Logout button
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    })
    
}());