export interface Task{
    id:number;
    titulo:string;
    concluida:boolean;
}

export interface TaskCreateDTO {
  titulo: string;
  concluida: boolean;
}