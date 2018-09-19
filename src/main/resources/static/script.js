import listPageTemplate from './template/listPageTemplate.js'
import detailPageTemplate from './template/detailPageTemplate.js'

async function updateUser(user){
    return fetch('/graphql', {
        headers: {'content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            query: `
            mutation{
                updateUser(user:{
                    id:${user.id}
                    name:"${user.name}"
                    username:"${user.username}"
                    isVacation:${user.isVacation}
                }){
                    id
                    name
                    username,
                    isVacation,
                    department{
                          name
                          user {
                                id
                                name
                                username
                          }
                    }
                }
            }`
        })})
        .then(response => response.json())
        .then(result => result.data.updateUser);
}

async function getUserDetail(id) {
    return fetch(`
        /graphql?query={
          user(id:${id}){
            id
            name,
            username,
            isVacation,
            department(category:"개발"){
                name,
                user {
                    id
                    name
                    username
                }
            }
          }
        }`)
        .then(response => response.json())
        .then(result => result.data.user);
}

async function getUserList() {
    return fetch(`
        /graphql?query={
          allUser{
            id
            name,
            username,
            isVacation
          }
        }`)
        .then(response => response.json())
        .then(result => result.data.allUser);
}

function renderDetailPage(userDetail) {
    document.body.innerHTML = detailPageTemplate(userDetail);
    document.getElementById("is_vacation").addEventListener("change", e => {
        const updateData = {...userDetail, ...{isVacation : e.target.checked}};
        updateUser(updateData).then(user => renderDetailPage(user));
    })

}

function renderListPage(userList) {
    document.body.innerHTML = listPageTemplate(userList);
}

async function route(url){
    const id = url.searchParams.get("id");
    if (id) {
        renderDetailPage(await getUserDetail(id));
    } else {
        renderListPage(await getUserList());
    }
}

route((new URL(location.href)));