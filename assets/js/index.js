var peopleRaw = localStorage.getItem('people');
if (peopleRaw != null) {
    var people = JSON.parse(peopleRaw);
} else {
    var people = [];
}

function desenhaTabela() {

    linhasExistentes = [...document.querySelectorAll('table.lista tbody .conteudo-dinamico')];

    linhasExistentes.forEach((element) => {
        element.remove()
    })

    for (person in people) {
        document.querySelector('table.lista tbody').innerHTML +=
            `<tr class="conteudo-dinamico" style="background-color: ${ ((person % 2 == 0) ? '#fff' : '#eee' )}">
                <td>
                    ${people[person].name} 
                </td>
                <td>
                    ${people[person].tel} 
                </td>
                <td>
                    ${(people[person].xp ? '<strong style="color:green"> Sim </strong>' : '<strong style="color:red"> Não </strong>')} 
                </td>
                <td>
                    <button onclick="excluirUsuario(${person})"> Excluir </button>
                    <button onclick="window.location.href ='./src/form.html?person=${person}'"> Editar </button>
                </td>
            </tr>`   
    }
}

function excluirUsuario(p) {
    people.splice(p, 1);
    desenhaTabela();
    localStorage.setItem('people', JSON.stringify(people))
}
desenhaTabela()