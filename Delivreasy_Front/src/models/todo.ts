/**
 * On définit une interface qui représente notre modèle de données
 * (la structure que nous manipulons pour représenter une entité)
 */

export interface Todo {
  List_ID: number;
  Todo_name: string;
  Todo_end: boolean;
  Todo_Echeance_date?: Date;
}


// export interface Todo {
//   id: number;
//   label: string;
//   done: boolean;
//   dueDate?: Date;
//   }
