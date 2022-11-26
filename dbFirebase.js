import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {getDatabase, ref, child, onValue, get, update} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

export function connectFirebase(){

        const firebaseConfig = {
        apiKey: "AIzaSyD7eZWokcW0DceXiVzUpANFd5CCS2dM5VM",
        authDomain: "gardenpy-b9d83.firebaseapp.com",
        databaseURL: "https://gardenpy-b9d83-default-rtdb.firebaseio.com",
        projectId: "gardenpy-b9d83",
        storageBucket: "gardenpy-b9d83.appspot.com",
        messagingSenderId: "830288093175",
        appId: "1:830288093175:web:8907b15bf4eb48b63b18f2",
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    return db
    // const app = initializeApp(firebaseConfig);  // Initialize Firebase
    // const db = getDatabase(app); // Initialize DataBase
}

export function getDataBtn(db, path, path2, idbtn) {
    const dbRef = ref(db, path + "/" + path2);

    onValue(dbRef, (snapshot) =>{
        const data = snapshot.val();
        btnDataChange(data, idbtn, db, path, path2);
        console.log(data);
    })        
}

export function btnDataChange(data, id, db, path, path2){
    let newData;

    if (data == true){
        newData = false;

        document.getElementById(id).classList.add("bg-green-500");
        document.getElementById(id).innerHTML = "Encendido";
        document.getElementById(id).onclick = function (){
            updateData(db, path, path2, newData);
            document.getElementById(id).classList.remove("bg-green-500");
            document.getElementById(id).classList.add("bg-gray-500");
        }

    }else if(data == false){
        newData = true;
        document.getElementById(id).classList.add("bg-gray-500");
        document.getElementById(id).innerHTML = "Apagado";
        document.getElementById(id).onclick = function (){
            updateData(db, path, path2, newData);
            document.getElementById(id).classList.remove("bg-gray-500");
            document.getElementById(id).classList.add("bg-green-500");
        }
    }
}

function updateData(db, path1, path2, data) {
    const dbs = db;

    // // A post entry.
    // const postData = {
    //   author: username,
    //   uid: uid,
    //   body: body,
    //   title: title,
    //   starCount: 0,
    //   authorPic: picture
    // };

    // Get a key for a new Post.
    // const newPostKey = push(child(ref(db), 'posts')).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates[path1+'/' + path2] = data;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return update(ref(db), updates);
  }

