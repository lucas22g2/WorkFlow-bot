const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// ====================== CONFIGURAÇÃO ======================
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'bot-escola',
        dataPath: './.wwebjs_auth'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1017054665.html'
    }
});

// ====================== DADOS DA ESCOLA ======================
// ⚠️ ALTERE ESTAS INFORMAÇÕES PELAS REAIS DA SUA ESCOLA
const escola = {
    nome: 'Escola Exemplo',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123 - Centro',
    horario: 'Segunda a Sexta: 07:00 às 17:00'
};

// ====================== MENUS ======================
const menuPrincipal = 
`🏫 *${escola.nome}*
Secretaria de Atendimento

Olá! Eu sou o assistente virtual da escola.

Para te atender melhor, escolha uma opção:

1️⃣ Matrícula
2️⃣ Reclamação
3️⃣ Notas
4️⃣ Faltas
5️⃣ Atestado
6️⃣ Material escolar
7️⃣ Transferência
8️⃣ Relatório Complementar
9️⃣ Agenda de horário
🔟 Sugestão / Elogio

📞 Contato: ${escola.telefone}
📍 Endereço: ${escola.endereco}

Digite o *número* da opção desejada.`;

const menuConfirmacao = (assunto) => 
`✅ Você selecionou: *${assunto}*

Por favor, envie as seguintes informações:

👤 *Nome completo do aluno:*
📚 *Série / Turma:*

Depois descreva sua solicitação.`;

// ====================== EVENTOS ======================
client.on('qr', (qr) => {
    console.log('\n==================================================');
    console.log('  ESCANEIE O QR CODE COM O NÚMERO DA ESCOLA:');
    console.log('==================================================\n');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('✅ Número da escola autenticado com sucesso!');
});

client.on('auth_failure', (msg) => {
    console.error('❌ Falha na autenticação:', msg);
});

client.on('ready', () => {
    console.log('\n🚀 Bot da Escola está online e pronto para atender!\n');
});

client.on('disconnected', (reason) => {
    console.log('⚠️ Bot desconectado:', reason);
});

// ====================== PROCESSAMENTO DE MENSAGENS ======================
client.on('message', async (msg) => {
    try {
        // Ignora mensagens enviadas pelo próprio bot
        if (msg.fromMe) return;

        const texto = (msg.body || '').toLowerCase().trim();

        // Saudação inicial
        if (['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'menu', 'início', 'inicio', 'ajuda', 'help'].includes(texto)) {
            await msg.reply(menuPrincipal);
            return;
        }

        // ===== OPÇÕES DO MENU =====
        if (texto === '1' || texto === 'matrícula' || texto === 'matricula') {
            await msg.reply(menuConfirmacao('Matrícula'));
        }
        else if (texto === '2' || texto === 'reclamação' || texto === 'reclamacao') {
            await msg.reply(menuConfirmacao('Reclamação'));
        }
        else if (texto === '3' || texto === 'notas') {
            await msg.reply(menuConfirmacao('Consulta de Notas'));
        }
        else if (texto === '4' || texto === 'faltas') {
            await msg.reply(menuConfirmacao('Consulta de Faltas'));
        }
        else if (texto === '5' || texto === 'atestado') {
            await msg.reply(menuConfirmacao('Solicitação de Atestado'));
        }
        else if (texto === '6' || texto === 'material') {
            await msg.reply(menuConfirmacao('Material Escolar'));
        }
        else if (texto === '7' || texto === 'transferência' || texto === 'transferencia') {
            await msg.reply(menuConfirmacao('Transferência'));
        }
        else if (texto === '8' || texto === 'relatório' || texto === 'relatorio' || texto === 'relatorio complementar') {
            await msg.reply(menuConfirmacao('Relatório Complementar'));
        }
        else if (texto === '9' || texto === 'agenda' || texto === 'horário' || texto === 'horario') {
            await msg.reply(
`📅 *Agenda e Horário de Atendimento*

${escola.horario}

📍 Endereço: ${escola.endereco}
📞 Telefone: ${escola.telefone}

Deseja agendar um horário? Envie:
👤 Nome do responsável
📚 Nome e série do aluno
🕒 Preferência de dia/horário`
            );
        }
        else if (texto === '10' || texto === 'sugestão' || texto === 'sugestao' || texto === 'elogio') {
            await msg.reply(
`💬 *Sugestão ou Elogio*

Ficamos felizes em ouvir você!

Por favor, envie:
👤 Seu nome
📚 Nome e série do aluno (se aplicável)
✍️ Sua sugestão ou elogio

Agradecemos o contato!`
            );
        }

        // Informação de contato
        else if (texto === 'contato' || texto === 'telefone' || texto === 'endereço' || texto === 'endereco') {
            await msg.reply(
`📞 *Contato da Escola*

Escola: *${escola.nome}*
Telefone: ${escola.telefone}
Endereço: ${escola.endereco}
Horário: ${escola.horario}`
            );
        }

    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
    }
});

// ====================== TRATAMENTO DE ERROS ======================
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

// ====================== INICIAR ======================
console.log('Iniciando Bot da Escola...');
client.initialize().catch(err => {
    console.error('Erro ao inicializar o bot:', err);
});