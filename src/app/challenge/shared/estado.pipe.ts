import { Pipe, PipeTransform } from '@angular/core';
import { TipoUf } from './model/tipo-uf.enum';

@Pipe({
  name: 'estadoPipe'
})
export class EstadoPipe implements PipeTransform {

  transform(sigla: string): string {

    switch (sigla) {
      case TipoUf.ac:
        return 'Acre';

      case TipoUf.al:
        return 'Alagoas';

      case TipoUf.am:
        return 'Amazonas';

      case TipoUf.ap:
        return 'Amapá';

      case TipoUf.ba:
        return 'Bahia';

      case TipoUf.ce:
        return 'Ceará';

      case TipoUf.df:
        return 'Destrito Federal';

      case TipoUf.es:
        return 'Espírito Santo';

      case TipoUf.go:
        return 'Goiás';

      case TipoUf.ma:
        return 'Maranhão';

      case TipoUf.mt:
        return 'Mato Grosso';

      case TipoUf.ms:
        return 'Mato Grosso do Sul';

      case TipoUf.mg:
        return 'Minas Gerais';

      case TipoUf.pa:
        return 'Pará';

      case TipoUf.pb:
        return 'Paraíba';

      case TipoUf.pr:
        return 'Paraná';

      case TipoUf.pe:
        return 'Pernambuco';

      case TipoUf.pi:
        return 'Piauí';

      case TipoUf.rj:
        return 'Rio de Janeiro';

      case TipoUf.rn:
        return 'Rio Grande do Norte';

      case TipoUf.rs:
        return 'Rio Grande do Sul';

      case TipoUf.ro:
        return 'Rondônia';

      case TipoUf.rr:
        return 'Roraima';

      case TipoUf.sc:
        return 'Santa Catarina';

      case TipoUf.sp:
        return 'São Paulo';

      case TipoUf.se:
        return 'Sergipe';

      case TipoUf.to:
        return 'Tocantis';

      default:
        return sigla;
    }
  }
}
