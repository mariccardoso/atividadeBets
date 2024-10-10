import { Router } from "express";

const suspeitosRoutes = Router();

let suspeitos = [
    {
        id: Math.floor(Math.random() * 1000000),
        nome: "Sophia Gomes",
        profissao: "Esteticista",
        apostas: "sim",
        nivel: "alto",
    }
]

// Rota para listar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
    return res.status(200).json(suspeitos);
});

// Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
    const { nome, profissao, apostas, nivel} = req.body;

    // Validação dos campos nome e profissao
    if (!nome || !profissao) {
        return res.status(400).send({
            message: "O nome ou o profissão não foi preenchido, não é possível cadastrar!",
        });
    }

    // Validação de nível de suspeita
    if (nivel != "médio" && nivel != "alto" && nivel != "baixo" ) {
        return res.status(400).send({
            message:
                "Nível de suspeita inválido, não é possível cadastrar!",
        });
    }

    // Validação de envolvimento em apostas 
    if (apostas != "sim" && apostas != "não") {
        return res.status(400).send({
            message:
                "Valor de apostas inválido (diferente de 'sim' e 'não'), não é possível cadastrar!",
        });
    }

    // Criação de um novo suspeito
    const novoSuspeito = {
        id: Math.floor(Math.random() * 1000000),
        nome,
        profissao,
        apostas,
        nivel,
    };

    // Adiciona o novo suspeito ao array de suspeitos
    suspeitos.push(novoSuspeito);

    return res.status(201).json({
        message: "suspeito cadastrado com sucesso!",
        novoSuspeito,
    });
});

export default suspeitosRoutes;