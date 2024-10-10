import { Router } from "express";

const suspeitosRoutes = Router();

let suspeitos = [
    {
        id: Math.floor(Math.random() * 1000000),
        nome: "Sophia Gomes",
        profissão: "Esteticista",
        apostas: "sim",
        nível: "alto",
    }
]

// Rota para listar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
    return res.status(200).json(suspeitos);
});


export default suspeitosRoutes;