//console.log('This is ES6 version of Library');

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    //adds rows containing name , author and type of the book
    add(book) {
        console.log("Adding to UI");
        let tableBody = localStorage.getItem('tableBody');

        if (tableBody == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(tableBody);
        }

        let uiString = "";
        notesObj.forEach(function (element, index) {
            uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${element.type}</td>
                            <td><button id="${index}" 
                            onclick= "deleteNote(this.id)"
                             class="btn btn-primary">Remove</button></td>
                        </tr>`;
        });
        let tableData = document.getElementById('tableBody');
        tableData.innerHTML += uiString;


    }

    //clear the author and name of the book after submission.
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) { //first checks if the name and author contains three letters or more, then it will show the booklist on screen otherwise first enter correct bookname and author. As the user can only check fiction(type) again and again which makes our project look bad. To deal with it we have written validate function.
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }
    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${boldText}:</strong> ${displayMessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
    </div>`;
        setTimeout(() => {
            message.innerHTML = ''
        }, 5000);
    }
}


// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    //console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let tableBody = localStorage.getItem('tableBody');

    if (tableBody == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(tableBody);
    }


    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type); //making object of Book class. OR calling constructor function
    notesObj.push(book);
    localStorage.setItem("tableBody", JSON.stringify(notesObj));
    //console.log(notesObj);

    //console.log(book);

    let display = new Display(); //Object of Display class

    if (display.validate(book)) {
        display.add(book); //calling functions of Display class
        display.clear();
        display.show('success', 'Your book has been successfully added!!')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book!!');
    }
    e.preventDefault();
}
function deleteNote(index) {
    console.log('I am deleting', index);

    let tableBody = localStorage.getItem('tableBody');

    if (tableBody == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(tableBody);
    }
    notesObj.splice(index , 1); //delete the indexed(0,1,2,...) note only     (1 means only 1 note to be deleted)
    localStorage.setItem("tableBody", JSON.stringify(notesObj));
    //console.log(tableBody);

}