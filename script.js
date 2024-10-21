document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".error").forEach(element => {
        element.style.display = "none";
    });

    document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            // Remove a classe de verificação de todas as opções
            document.querySelectorAll('.general, .support').forEach(function(option) {
                option.style.backgroundColor = ""; // Reseta a cor de fundo
                option.style.borderColor = ""; // Reseta a borda
            });

            // Adiciona a classe para a opção selecionada
            if (this.checked) { 
                this.parentElement.style.backgroundColor = "hsl(148, 38%, 91%)"; // Muda o fundo para verde
                this.parentElement.style.borderColor = "green"; // Muda a borda para verde
            }
        });
    });
    
    document.querySelector('#contactForm').addEventListener('submit', function() {
        let hasError = false;

        //Selecionar todos os campos
        const fields = [
            document.getElementById('firstName'),
            document.getElementById('lastName'),
            document.getElementById('email'),
            document.getElementById('message')
        ]

        //Validar cada campo do array
        fields.forEach(field => {
            const errorElement = field.nextElementSibling;

            if(field.value.trim() === ""){
                errorElement.style.display = "block";
                field.style.borderColor = "red";
                hasError = true;
            }
            else{
                errorElement.style.display = "none"
                field.style.borderColor = ""
            }
        })

        //Validação tipo Radio
        const queryType = document.querySelector('input[name="option"]:checked')
        const queryError = document.querySelector('.allGroup .error')
        if(!queryType){
            queryError.style.display = 'block'
            hasError = true;
        }else{
            queryError.style.display = 'none'
        }

        //Validação Consentimento
        const consent = document.getElementById('consent');
        const consentError = consent.nextElementSibling.nextElementSibling; // Pulamos o label para o próximo p.error
        if (!consent.checked) {
          consentError.style.display = 'block';
          hasError = true;
        } else {
          consentError.style.display = 'none';
        }


        //Impedir enviar formulário
        if(hasError){
            event.preventDefault()
        }else{
            event.preventDefault()
            const successMessage = document.querySelector('.successMessage')
            successMessage.style.display = 'block';

            fields.forEach(field =>{
                field.value = "" // Limpar os campos após envio
            })

            const radios = document.querySelectorAll('input[name="option"]');

            radios.forEach(radio =>{
                radio.checked = false   
                radio.parentElement.style.backgroundColor = ""; // Reseta a cor de fundo
                radio.parentElement.style.borderColor = ""; // Reseta a borda
            }); // Desmarcar as opções radio

            const consentCheckbox = document.getElementById('consent');
            consentCheckbox.checked = false; // Desmarcar o checkbox

            setTimeout(() => {
                successMessage.style.display = 'none';
            },5000)
        }
    })
})

