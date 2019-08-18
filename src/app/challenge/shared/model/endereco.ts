import { TipoUf } from './tipo-uf.enum';

export class Endereco {

    id: number;

    rua: string;

    numero: number;

    bairro: string;

    cidade: string;

    cep: string;

    estado: TipoUf;

    constructor(init: Partial<Endereco>) {
        Object.assign(this, init);
    }
}
