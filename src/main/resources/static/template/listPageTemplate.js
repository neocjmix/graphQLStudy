export default users => users.map(user => `
    <a href="/?id=${user.id}">${user.name} (${user.username})</a>
    ${user.isVacation ? '<small>휴가중</small>' : ''}
`).join("<br />");