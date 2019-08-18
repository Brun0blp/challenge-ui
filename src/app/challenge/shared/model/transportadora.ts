import { Endereco } from './endereco';
import { TipoModal } from './tipo-modal.enum';

export class Transportadora {

    id: number;

    nome: string;

    empresa: string;

    email: string;

    telefone: string;

    celular: string;

    whatsApp: string;

    modal: TipoModal;

    endereco: Endereco;

    constructor(init: Partial<Transportadora>) {
        Object.assign(this, init);
    }

}
