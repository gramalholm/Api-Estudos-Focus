import { Funcionario } from "./funcionario";

export interface Ponto {
    id: string;
    data: Date;
    entrada: Date;
    saida: Date;
    funcionario: Funcionario
}
