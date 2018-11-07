//function used by header to create form when clicked
function activateForm() {
  //takes away cursor pointer to indicate that header can't be clicked twice
  header.style.cursor = "auto";
  formBuilder();
}

//adds a click listener to header that creates form
header.addEventListener("click", activateForm)

//this function makes a new form and appends the desired html elements within it
function constructForm() {
  let form = document.createElement("form");
  form.setAttribute("class", "entry--form");
  form.setAttribute("action", "");
  form.id = "entry--form";

    form.innerHTML = `
    <fieldset>
      <label for="journal">Date of entry</label>
      <input type="date" name="journal" id="journalDate">
    </fieldset>
    <fieldset>
      <label for="concepts" id="label--concepts">Concepts covered</label>
      <input type="text" name="concepts" id="concepts">
    </fieldset>
    <fieldset>
      <label for="entry" id="label--entry">Journal Entry</label>
      <textarea name="entry" id="entry"></textarea>
    </fieldset>
    <fieldset>
      <label for="mood">Mood today</label>
      <select name="mood" id="mood">
      </select>
    </fieldset>`

  return form
}

function makeButton() {
  let button = document.createElement("button");
  button.textContent = "Record Journal Entry";
  button.className = "post";
  return button
}

function formBuilder() {
  // create form and append it to the DOM in its container
  formContainer.appendChild(constructForm());
  // identify the appended form
  let form = document.getElementById("entry--form")
  // append <option> tags to existing <select> dynamically after
  // retrieving mood information from database
  API.getMoods().then(data => {
    let optionCollection = data.map(obj => {
      let option = document.createElement("option");
      option.value = obj.id;
      option.textContent = obj.label;
      return option;
    })
    // append to <select>
    optionCollection.forEach(option => form.childNodes[7].childNodes[3].appendChild(option));

    //create button and append it to the DOM in its container
    buttonContainer.appendChild(makeButton());
    //reassign variables to newly available form components
    conceptLabel = document.getElementById("label--concepts");
    entryLabel = document.getElementById("label--entry");
    dateInput = document.getElementById("journalDate");
    conceptInput = document.getElementById("concepts");
    entryInput = document.getElementById("entry");
    moodInput = document.getElementById("mood");
    formButton = document.querySelector("button")
    // activate listeners on form and button, using the variable assignments listed above
    validateForm();
    activateButton();
    // remove listener from header so that more than one form can't be appended
    header.removeEventListener("click", activateForm);
  });
}