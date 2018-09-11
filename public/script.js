import listPageTemplate from './template/listPageTemplate.js'
import detailPageTemplate from './template/detailPageTemplate.js'

async function getUserDetail(id) {
    return fetch(`
        /graphql?query={
          user(id:${id}){
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