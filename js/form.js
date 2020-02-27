const btn = document.querySelector("#adicionar-paciente")

btn.addEventListener('click', (event) => {
	event.preventDefault()

	const form = document.querySelector("#form-adiciona")
	const paciente = obtemPacienteDoFormulario(form)
	
	const erros = validaPaciente(paciente)
	if (erros.length > 0) {
		listaDeErros(erros)
		return
	}
	
	adicionaPacienteNaTabela(paciente)
	form.reset()

	const mensagensErro = document.querySelector("#mensagens-erro");
	mensagensErro.innerHTML = "";
})

function montaTr(paciente) {
	const pacienteTr = document.createElement("tr")
	pacienteTr.classList.add("paciente")

	pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"))
	pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"))
	pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"))
	pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"))
	pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"))

	return pacienteTr
}

function montaTd(dado, classe) {
	const td = document.createElement("td")
	td.classList.add(classe)
	td.textContent = dado

	return td
}

function obtemPacienteDoFormulario(form) {
	const paciente = {
		nome: form.nome.value,
		peso: form.peso.value,
		altura: form.altura.value,
		gordura: form.gordura.value,
		imc: calculaImc(form.peso.value, form.altura.value)
	}
	return paciente
}

function validaPaciente(paciente) {
	const erros = []

	if (paciente.nome.length == 0) {
        erros.push("O nome não pode ser em branco");
    }

    if (paciente.gordura.length == 0) {
        erros.push("A gordura não pode ser em branco");
    }

    if (paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco");
    }

    if (paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco");
    }

    if (paciente.peso != "" && !validaPeso(paciente.peso)) {
        erros.push("Peso é inválido");
    }

    if (paciente.altura != "" && !validaAltura(paciente.altura)) {
        erros.push("Altura é inválida");
    }

	return erros
}

function listaDeErros(erros) {

	const ul = document.querySelector("#mensagens-erro")
	ul.innerHTML = ""

	erros.forEach(erro => {
		let li = document.createElement("li")
		li.textContent = erro
		ul.appendChild(li)
	});
	
}

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}