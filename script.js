const lineTemplate = (name, point) => {
  const line = `<th scope="row" id="sortEl"></th>
  <td>${name}</td><td class="text-center" id="point">${point}</td>
  <td><div class="row justify-content-center">
    <button class="col-2 btn p-0" id="pencil">
        <i class="fa-solid fa-pencil"></i>
    </button><button class="col-2 btn p-0" id="bin">
        <i class="fa-regular fa-trash-can"></i>
    </button></div></td>`;
  return line;
};
const editTemplate = (name, point) => {
  const line = `<th scope="row"></th>
  <td> <input class="col-12 bg-white rounded" type="text" id="newName" value=${name}></td>
  <td> <input class="col-6 bg-white rounded text-center" type="number" id="newPoint" value=${point}></td>
  <td><div class="row justify-content-center"> <button class="col-2 btn p-0" id="save">
      <i class="fa-solid fa-check"></i></i></button>
    <button class="col-2 btn p-0" id="cancel"><i class="fa-solid fa-xmark"></i></i>
    </button></div></td>`;
  return line;
};

// creates variables using the id names of elements in the class "main"
for (let x of document.querySelectorAll("main *[id]"))
  document.getElementById(x);

// adding & handling events
// event for the "enter" key
[inputName, inputPoint].forEach((el) => {
  el.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) btnAdd.click();
  });
});
// defines add event
btnAdd.addEventListener("click", () => {
  if (
    inputName.value === "" ||
    inputPoint.value == "" ||
    Number.isInteger(Number(inputPoint.value)) === false
  )
    return alert("Please fill out the required fields correctly.");
  const tr = document.createElement("tr");
  tr.innerHTML = lineTemplate(inputName.value, inputPoint.value);
  inputName.value = inputPoint.value = "";
  tBody.prepend(tr);
  const el = document.querySelector("#tBody tr");
  sort(sortEl);
  remove(el);
  edit(el);
  average.innerText = calculateAverage("#point");
});
// defines remove event
const remove = (area) => {
  area.querySelector("#bin").addEventListener("click", (event) => {
    if (
      confirm(
        `Are you sure you want to delete ${
          area.querySelector("td:nth-child(2)").innerText
        }?`
      )
    )
      event.target.closest("tr").remove();
    if (!tBody.querySelectorAll("tr").length) return (average.innerText = " ");
    average.innerText = calculateAverage("#point");
    sort(sortEl);
  });
};

// defines edit event & creates an edit window
const edit = (area) => {
  area.querySelector("#pencil").addEventListener("click", (event) => {
    const editArea = event.target.closest("tr");
    const preEditName = editArea.querySelector("td:nth-child(2)").innerText;
    const preEditPoint = editArea.querySelector("td:nth-child(3)").innerText;
    const rowToEdit = editArea.innerHTML;
    editArea.innerHTML = editTemplate(preEditName, preEditPoint);
    save(editArea);
    cancel(editArea, rowToEdit);
  });
};
// defines save event in the edit window
const save = (area) => {
  area.querySelector("#save").addEventListener("click", () => {
    const newName = area.querySelector("#newName").value;
    const newPoint = area.querySelector("#newPoint").value;
    if (
      newName === "" ||
      newPoint == "" ||
      Number.isInteger(Number(newPoint)) === false
    ) {
      return alert("Please fill out the required fields correctly.");
      save(area);
    }
    area.closest("tr").innerHTML = lineTemplate(newName, newPoint);
    average.innerText = calculateAverage("#point");
    sort(sortEl);
    remove(area);
    edit(area);
  });
};
// defines cancel event in the edit window
const cancel = (area, rowToEdit) => {
  area.querySelector("#cancel").addEventListener("click", () => {
    area.closest("tr").innerHTML = rowToEdit;
    remove(area);
    edit(area);
  });
};

// keeps the line numbers in order
const sort = (arr) => {
  if (arr.length === undefined) arr.innerText = 1;
  else for (let i = 0; i < arr.length; i++) arr[i].innerText = i + 1;
};
// returns the average of all elements of the same type/name/class, etc.
const calculateAverage = (elementName) => {
  let points = [];
  for (let x of document.querySelectorAll(elementName))
    points.push(Number(x.innerText));
  return Math.floor(points.reduce((sum, el) => sum + el) / points.length);
};
