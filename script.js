document.addEventListener("DOMContentLoaded", async function() {
    // Carregar a biblioteca SQLite
    const SQL = await initSqlJs({
        locateFile: file => `node_modules/sql.js/dist/${file}`
    });

    // Criar e inicializar o banco de dados
    const db = new SQL.Database();
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, whatsapp TEXT)");

    const form = document.getElementById("registrationForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const whatsapp = document.getElementById("whatsapp").value;

        // Inserir os dados no banco de dados
        db.run("INSERT INTO users (email, whatsapp) VALUES (?, ?)", [email, whatsapp]);

        // Confirmar o registro e redirecionar para o chat
        message.textContent = "Cadastro realizado com sucesso!";
        setTimeout(() => {
            window.location.href = "chat.html";
        }, 2000);
    });
});
