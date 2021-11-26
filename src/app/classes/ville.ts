import { Pays } from "./pays";

export class Ville {
    /*
    private ind id;
    private string nom;
    private int code postal;
    private String pays;
    */

    id: number
    nom: string
    codePostal: string
    paysByPaysCode: Pays

    public constructor( _id : number, _nom : string, _codePostal : string, _pays : Pays){
        this.id = _id;
        this.nom = _nom;
        this.codePostal = _codePostal;
        this.paysByPaysCode = _pays;
    }
}
