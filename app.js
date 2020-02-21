const employeeBtn = document.getElementById('add-btn');
const filterBtn = document.getElementById('search-btn');

const employees = [];

const renderItem = (filter = "") => {
  var tbodydata = document.getElementById('tbodydata');
  tbodydata.innerHTML = "";

  const filterEmployee = !filter ? employees : employees.filter((employee) => employee.email.includes(filter));
  filterEmployee.forEach((employee) => {
    var tr = document.createElement('tr');
    const { name, email, phone, id } = employee;
    tr.innerHTML = `
      <td><input type="text" class="form-control" value="${name}" required readonly></td>
      <td><input type="text" class="form-control" value="${email}" required readonly></td>
      <td><input type="text" class="form-control" value="${phone}" required readonly></td> 
      <td>
        <button  onclick="edithandler(this)">Edit</button>
        <button onclick="deletehandler(${id})">Delete</button>
      </td>`;
    tbodydata.append(tr);
  })
}

const addEmployee = () => {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');

  if (name.value == "" || email.value == "" || phone.value == "") {
    alert('All input field data required');
    name.focus();
    return;
  }

  const newEmployee = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    id: Math.floor(Math.random() * 15002222222 + 1)
  }

  employees.push(newEmployee);
  renderItem();
  name.value = "";
  email.value = "";
  phone.value = "";
}

const deletehandler = (id) => {
  const removeItem = employees.map(item => item.id).indexOf(id);
  employees.splice(removeItem, 1);
  renderItem();
}

const edithandler = (elem) => {
  console.log(elem)
  debugger
}

const filterdata = () => {
  const filter = document.getElementById('filter').value;
  renderItem(filter);
}

employeeBtn.addEventListener('click', addEmployee);
filterBtn.addEventListener('click', filterdata);