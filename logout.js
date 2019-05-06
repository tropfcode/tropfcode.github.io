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
    
    // Get html elements
    const txtEmail = document.getElementById('txtEmail');
    const txtName = document.getElementById('txtName');
    
    // Active auth state observer
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            console.log('Logged in');
            var userId = firebase.auth().currentUser.uid;
            return firebase.database().ref(userId).once('value').then(function(snapshot){
                var firstName = snapshot.val().first_name;
                var lastName = snapshot.val().last_name;
                var email = snapshot.val().email;
                txtEmail.innerHTML = email;
                txtName.innerHTML = firstName + " " + lastName;
            });
        } else {
            console.log('LOGGED OUT');
            window.location.replace('login.html');
        }
    });
    
    // Logout button
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    })
    
}());
