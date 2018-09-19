export default  user => `
    <a href="/">&larr;</a>
    <h1>${user.name}</h1>
    <h2>${user.username}</h2>
    <input id="is_vacation" type="checkbox" ${user.isVacation ? `checked` : ``} />
    <label for="is_vacation">휴가중</label><br />
    ${user.department.map(department => `
        <h3>${department.name}</h3>
        <h4>멤버</h4>
        <ul>
            ${department.user.map(user => `
            <li>
                <a href="/?id=${user.id}">${user.name} (${user.username})</a>
            </li>`).join('')}
        </ul>
    `).join('')}
`;