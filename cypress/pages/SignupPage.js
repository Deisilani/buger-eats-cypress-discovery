

class SignupPage {
    //função go vai acessar a pagina onde tem o form de cadastro, para que o usuário se torne um entregador
    go() {
        /*função visit, acessa a pagina principal alvo do teste*/
        cy.visit('/')

        /*função get, com a subFunção click passando um localizador para encontrar o botão
        "cadastre-se para fazer entregas*/
        cy.get('a[href="/deliver"]').click()

        /*checkpoint, para garantir que está no lugar certo - verifica se o texto está pagina*/
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    //fillForm é a função que preenche todos os campos de cadatro do entregador, e a função recebe o objeto deliver, que é a massa de teste
    fillForm(deliver) {

        /*.get, para buscar elemento. A subFunção type preencher esse elemento que é do tipo campo e 
        recebe a massa de teste, no caso entregador*/
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        /*realiza a verificação de campos autocompletados pelo CEP*/
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        /*A função contains junta o localizador CSS com um texto, sem id*/
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        /*attachFile é a função do pacote que foi baixado*/
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        //realiza a validação
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) {
        //cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;