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
    const { nome, profissao, apostas, nivel } = req.body;

    // Validação dos campos nome e profissao
    if (!nome || !profissao) {
        return res.status(400).send({
            message: "O nome ou o profissão não foi preenchido, não é possível cadastrar!",
        });
    }

    // Validação de nível de suspeita
    if (nivel != "médio" && nivel != "alto" && nivel != "baixo") {
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

// Rota para buscar um suspeito pelo id
suspeitosRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    // Busca um suspeito pelo id no array de suspeitos
    const suspeito = suspeitos.find((suspect) => suspect.id == id);

    // Verifica se o suspeito foi encontrado
    if (!suspeito) {
        return res
            .status(404)
            .json({ message: `Suspeito com id ${id} não encontrado!` });
    }

    return res.status(200).json(suspeito);
});

// Rota para atualizar um suspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, profissao, apostas, nivel } = req.body;

    // Busca um suspeito pelo id no array de suspeitos
    const suspeito = suspeitos.find((suspects) => suspects.id == id);

    // Verifica se o suspeito foi encontrado
    if (!suspeito) {
        return res
            .status(404)
            .json({ message: `Suspeito com id ${id} não encontrado!` });
    }

    // Validação dos campos nome e profissao
    if (!nome || !profissao) {
        return res.status(400).send({
            message: "O nome ou o profissão não foi preenchido, não é possível atualizar!",
        });
    }

    // Validação de nível de suspeita
    if (nivel != "médio" && nivel != "alto" && nivel != "baixo") {
        return res.status(400).send({
            message:
                "Nível de suspeita inválido, não é possível atualizar!",
        });
    }

    // Validação de envolvimento em apostas 
    if (apostas != "sim" && apostas != "não") {
        return res.status(400).send({
            message:
                "Valor de apostas inválido (diferente de 'sim' e 'não'), não é possível atualizar!",
        });
    }

    suspeito.nome = nome;
    suspeito.profissao = profissao;
    suspeito.apostas = apostas;
    suspeito.nivel = nivel;

    return res.status(200).json({
        message: "Suspeito atualizado com sucesso!",
        suspeito,
    });
});


// Remove o suspeito do array de suspeitos
suspeitosRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;

    //console.log(id);
    const suspeito = suspeitos.find((suspects) => suspects.id == id)

    if (!suspeito) {
        return res.status(404).send({
            message: "suspeito não encontrado!",
        });
    }

    suspeitos = suspeitos.filter((suspects) => suspects.id != id)

    return res.status(200).send({
        message: "suspeito deletado",
        suspeito,
    })
});

export default suspeitosRoutes;