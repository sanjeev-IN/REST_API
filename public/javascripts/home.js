const usersList = document.querySelector('.users-list');
const addUserForm = document.querySelector('.add-user-form');
const nameValue = document.getElementById('name-value');
const emailValue = document.getElementById('email-value');
const subscriptionValue = document.getElementById('subscription-value');
const btnSubmit = document.querySelector('.btn-primary');
let output = '';

const renderUsers = users => {
  users.forEach(user => {
    output += `
    <div class="card mt-4 col-md-2 bg-light">
    <div class="card-body" data-id=${user._id}>
      <h5 class="card-title">${user.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${user.subscription}</h6>
      <p class="card-text">${user.email}</p>
      <a href="#" class="card-link" id="edit-user">Edit</a>
      <a href="#" class="card-link" id="delete-user">Delete</a>
    </div>
  </div>
    `;
  });
  usersList.innerHTML = output;
};
// const url = 'http://localhost:3000/api/people';
const url = 'https://rest-demo-crud.herokuapp.com/api/people';
//Method:GET -Read all users
fetch(url)
  .then(res => res.json())
  .then(data => renderUsers(data));

usersList.addEventListener('click', (e) => {
  e.preventDefault();
  let delBtnIsPressed = e.target.id == 'delete-user';
  let editBtnIsPressed = e.target.id == 'edit-user';

  let id = e.target.parentElement.dataset.id;
  console.log(id);

  //Method:DELETE -Delete a user
  if (delBtnIsPressed) {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => location.reload());
  };

  if (editBtnIsPressed) {
    const parent = e.target.parentElement;
    console.log(parent);
    let nameContent = parent.querySelector('.card-title').textContent;
    let emailContent = parent.querySelector('.card-text').textContent;
    let subscriptionContent = parent.querySelector('.card-subtitle').textContent;

    nameValue.value = nameContent;
    emailValue.value = emailContent;
    subscriptionValue.value = subscriptionContent;
  };

  // Method:PUT -update a user
  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue.value,
        email: emailValue.value,
        subscription: subscriptionValue.value
      })
    })
      .then(res => res.json())
      .then(() => location.reload())
  })

});

//Method:POST -Create new user
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameValue.value,
      email: emailValue.value,
      subscription: subscriptionValue.value
    })
  })
    .then(res => res.json())
    .then(data => {
      const dataArr = [];
      dataArr.push(data);
      renderUsers(dataArr)
    })
  // Reset Input fields
  nameValue.value = '';
  emailValue.value = '';
  subscriptionValue.value = '';
})