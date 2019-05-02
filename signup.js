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
    const txtFirstName = document.getElementById('txtFirstName');
    const txtLastName = document.getElementById('txtLastName');
    const txtAffiliation = document.getElementById('txtAffiliation');
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnRegister = document.getElementById('btnRegister');
    
    
    
    // Add signup event
    btnRegister.addEventListener('click', e => {
        // Get email and password (pass)
        // TODO: Check for real email
        const firstName = txtFirstName.value;
        const lastName = txtLastName.value;
        const affiliation = txtAffiliation.value;
        const email = txtEmail.value;
        const pass = txtPassword.value;
        
        if(firstName && lastName && affiliation && email && pass)
        {
            // Register and sign in
            firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(){
                // Email not already used, create account
                const userId = firebase.auth().currentUser.uid.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                console.log(userId);
                // Add to database
                firebase.database().ref(userId).set({
                    first_name: firstName,
                    last_name: lastName,
                    affiliation: affiliation,
                    email: email
                });
            }).catch(function(error){
                // Email already used
                window.alert('Email already registered')
            });
        }
        else
        {
            window.alert('Please fill all boxes with appropriate values')
        }
    });
    
    // Active auth state observer
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            // Go to main page
            window.location = ('index-firebase.html');
        } else {
            console.log('not logged in')
        }
    });
    
}());