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
    
    // Get elements from html
    const txtFirstName = document.getElementById('txtFirstName');
    const txtLastName = document.getElementById('txtLastName');
    const txtAffiliation = document.getElementById('txtAffiliation');
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnRegister = document.getElementById('btnRegister');
    
    
    
    // Add signup event
    btnRegister.addEventListener('click', e => {
        if(txtFirstName.value && txtLastName.value 
           && txtAffiliation.value && txtEmail.value && txtPassword.value)
        {
            // Register and sign in
            firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value)
            .catch(function(error){
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
            // Email not already used, create account
            const userId = firebase.auth().currentUser.uid.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            // Add to database
            firebase.database().ref(userId).set({
                first_name: txtFirstName.value,
                last_name: txtLastName.value,
                affiliation: txtAffiliation.value,
                email: txtEmail.value
            });
            console.log('databaseupdated')
            setTimeout(function(){
                window.location.replace('index-firebase.html');
            }, 500);
        } else {
            console.log('not logged in')
        }
    });
    
}());
