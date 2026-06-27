// Passo 1: Capturar os elementos
const senhaResultado = document.getElementById('senha-resultado');
const tamanhoSenhaInput = document.getElementById('tamanho-senha');
const tamanhoValorTexto = document.getElementById('tamanho-valor');
const btnGerar = document.getElementById('btn-gerar');

// NOVOS ELEMENTOS CAPTURADOS
const btnCopiar = document.getElementById('btn-copiar');
const btnOcultar = document.getElementById('btn-ocultar');

const chkMaiusculas = document.getElementById('chk-maiusculas');
const chkMinusculas = document.getElementById('chk-minusculas');
const chkNumeros = document.getElementById('chk-numeros');
const chkSimbolos = document.getElementById('chk-simbolos');

const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// Passo 2: Função para gerar a senha
function gerarSenha() {
    let caracteresPossiveis = '';
    
    if (chkMinusculas.checked) caracteresPossiveis += letrasMinusculas;
    if (chkMaiusculas.checked) caracteresPossiveis += letrasMaiusculas;
    if (chkNumeros.checked) caracteresPossiveis += numeros;
    if (chkSimbolos.checked) caracteresPossiveis += simbolos;

    if (caracteresPossiveis === '') {
        caracteresPossiveis = letrasMinusculas;
        chkMinusculas.checked = true;
    }

    let senhaGerada = '';
    const tamanho = tamanhoSenhaInput.value;

    for (let i = 0; i < tamanho; i++) {
        const sorteio = Math.floor(Math.random() * caracteresPossiveis.length);
        senhaGerada += caracteresPossiveis[sorteio];
    }

    // ATENÇÃO: Como agora usamos um <input>, escrevemos no '.value' em vez do '.textContent'
    senhaResultado.value = senhaGerada;
}

// Passo 3: Lógica para Ocultar/Mostrar a Senha
btnOcultar.addEventListener('click', function() {
    // Se for do tipo 'text', está visível. Mudamos para 'password' para ocultar.
    if (senhaResultado.type === 'text') {
        senhaResultado.type = 'password';
        btnOcultar.textContent = '🙈'; // Troca o ícone (Opcional, mas divertido!)
    } else {
        // Se já estiver oculta, mudamos de volta para 'text' para revelar.
        senhaResultado.type = 'text';
        btnOcultar.textContent = '👁️';
    }
});

// Passo 4: Lógica para Copiar a Senha
btnCopiar.addEventListener('click', function() {
    // Usamos a API Clipboard do navegador para copiar o valor do input
    navigator.clipboard.writeText(senhaResultado.value).then(() => {
        // Mudamos o visual do botão temporariamente para dar feedback de sucesso
        const textoOriginal = btnCopiar.innerHTML;
        btnCopiar.innerHTML = '✓ Copiado!';
        btnCopiar.style.backgroundColor = '#00ff88';
        btnCopiar.style.color = '#000000';
        
        // Após 2000 milissegundos (2 segundos), o botão volta ao normal
        setTimeout(() => {
            btnCopiar.innerHTML = textoOriginal;
            btnCopiar.style.backgroundColor = ''; 
            btnCopiar.style.color = '';
        }, 2000);
    });
});

// Eventos de Atualização
tamanhoSenhaInput.addEventListener('input', function() {
    tamanhoValorTexto.textContent = tamanhoSenhaInput.value;
    gerarSenha();
});

btnGerar.addEventListener('click', gerarSenha);
chkMaiusculas.addEventListener('change', gerarSenha);
chkMinusculas.addEventListener('change', gerarSenha);
chkNumeros.addEventListener('change', gerarSenha);
chkSimbolos.addEventListener('change', gerarSenha);

// Gera a primeira senha ao carregar a página
gerarSenha();