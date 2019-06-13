export interface Usuario{
	id_usuario: number;
	nombre: string;
	apellido_p:string;
	apellido_m: string;
	calle: string;
	id_municipio:number;
	id_estado:number;
	id_pais: number;
	codigo_postal:number;
}

export interface Estado{
	id_estado:number;
	estado:string;
}
export interface Municipio{
	id_municipio:number;
	municipio:string;
}

export interface Pais
{
	id_pais:number;
	pais:string;
}