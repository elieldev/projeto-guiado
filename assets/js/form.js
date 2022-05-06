function testaFormulario(e){
    e.preventDefault();

    /* for (i in e.target.elements['telefone'].value) {
       if ('0123456789'.indexOf(e.target.elements['telefone'].value[i]) == -1) {
           alert('Apenas números são permitidos no campo telefone!')
           return false
       }
    } */

    var nomePadrao = /[0-9-()]+/g

    if (nomePadrao.test(e.target.elements['nome'].value)){
        alert('Apenas letras são permitidas no campo nome!')
        return false
    }

    if (e.target.elements['nome'].value.length < 8) {
        alert('Digite seu nome completo.')
        return false
    }

    var telefonePadrao = /[^0-9-() ]+/g

    if (telefonePadrao.test(e.target.elements['telefone'].value)) {
        alert('Apenas números são permitidos no campo telefone!')
        return false
    }

    if (e.target.elements['telefone'].value.replace(/[-() ]/g, '').length < 11) {
        alert('Número inválido!')
        return false
    }

    var peopleRaw = localStorage.getItem('people');
    if (peopleRaw != null) {
        var people = JSON.parse(peopleRaw);
    } else {
        var people = [];
    }
    
    if (id !== null) {
        people[id] = {
            name: e.target.elements['nome'].value,
            tel: e.target.elements['telefone'].value,
            xp: (e.target.elements['exp'].value == 'true')
        }
    } else {
        people.push({
            name: e.target.elements['nome'].value,
            tel: e.target.elements['telefone'].value,
            xp: (e.target.elements['exp'].value == 'true')
        })
    }

    localStorage.setItem('people', JSON.stringify(people))

    document.getElementById('goHome').click()
}

var urlPrincipal = new URL(window.location.href)

var id = urlPrincipal.searchParams.get('person')
if (id !== null) {
    var peopleRaw = localStorage.getItem('people')
    if (peopleRaw != null) {
        var people = JSON.parse(peopleRaw)
    } else {
        var people = [];
    }

    console.log(people[id])

    document.getElementById('nome').value = people[id].name
    document.getElementById('telefone').value = people[id].tel
    if (people[id].xp) {
        document.getElementById('exp-sim').checked = true
    } else {
        document.getElementById('exp-nao').checked = true
    }
}

function testaCampoTelefone(e) {
    e.preventDefault()    
    console.log(e)

    if (e.target.value.length == 0) {
        e.target.value += '('
    }

    if (e.target.value.length == 3) {
        e.target.value += ') '
    }

    if (e.target.value.length == 10) {
        e.target.value += '-'
    }

    if ((/[0-9]/g).test(e.key) && e.target.value.length < 15) {
    e.target.value += e.key
    }
}

