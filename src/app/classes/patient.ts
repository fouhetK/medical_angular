import { Pays } from "./pays"
import { Ville } from "./ville"

export class Patient {

    /*
    
    private int id;
    private String adresse;
    private Date datenaissance;
    private String email;
    private String telephone;
    private String nom;
    private String prenom;
    private PaysEntity paysCode;
    private VilleEntity villeId;
    */

    id : number
    adresse : string
    datenaissance : Date
    email : string
    telephone : string
    nom : string
    prenom : string
    paysCode : Pays
    villeId : Ville

    public constructor( _id : number, _adresse : string, _datenaissance : Date, _email : string, _telephone : string, _nom : string, _prenom : string, _paysCode : Pays, _villeId  : Ville){
        this.id = _id
        this.adresse = _adresse
        this.datenaissance = _datenaissance
        this.email = _email
        this.telephone = _telephone
        this.nom = _nom
        this.prenom = _prenom
        this.paysCode = _paysCode
        this.villeId = _villeId
    }
}
