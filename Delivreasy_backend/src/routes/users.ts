import express,{ Request, Response, Router } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";

const todosRouter = Router();
todosRouter.use(express.json());
todosRouter.use(cookieParser());

// const monTableau:any[] = [];
export interface Todo {
  List_ID: number;
  Todo_name: string;
  Todo_end: any;
  Todo_Echeance_date?: Date;
}

//   const monTableau: Todo[] = [
//    { List_ID: 1, Todo_name: "apprendre Vue Js", Todo_end: false, Todo_Echeance_date: new Date("2024-12-31") },
//    { List_ID: 2, Todo_name: "apprendre à faire des boucles", Todo_end: false },
//    { List_ID: 3, Todo_name: "apprendre à griller des saucisses", Todo_end: true, Todo_Echeance_date: new Date("2024-12-31") },
//  ];

todosRouter.get('/:Employe_id', async (req: Request, res: Response) => {
  const Employe_id = parseInt(req.params.Employe_id, 10);
  // const Employe_id = req.cookies.Connexiontoken;
  console.log('.get/todos/'+Employe_id)

  try {
  const Todos = await query('SELECT Todo_name, Todo_Echeance_date,Todo_End,List_ID FROM todo WHERE Employe_ID = ?',[Employe_id]);
  console.log("les todo :",Todos)
  res.json(Todos);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

todosRouter.delete('/:List_ID', async (req: Request, res: Response) => {
  const List_ID = parseInt(req.params.List_ID, 10);
  console.log('.get/todos/'+List_ID)
try {
  const Todos = await query(' DELETE FROM Todo WHERE List_ID= ? ; ',[List_ID]);
  console.log("les todo :",Todos)
  res.json(Todos);
} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur' });
}});

// todosRouter.delete("/:List_ID", (req: Request, res: Response) => {
//   try {
//     // récupérer tous les utilisateurs du SGBD
//     const Todos = await query(' DELETE FROM Customers WHERE CustomerName=?',[List_ID]);
//     console.log("les todo :",Todos)
//     res.json(Todos);
//     } catch (error) {
//     console.error('Erreur :', error);
//     res.status(500).json({ error: 'Erreur serveur' });
//     }});

export default todosRouter;


  // todosRouter.put("/:id", (req: Request, res: Response) => {
  //   const id = parseInt(req.params.id, 10);
  //   const { label, done, dueDate } = req.body;
  //   const todoIndex = monTableau.findIndex((t) => t.id === id);
  //   if (todoIndex !== -1) {
  //     monTableau[todoIndex] = {
  //       ...monTableau[todoIndex],
  //       label: label || monTableau[todoIndex].label,
  //       done: done !== undefined ? done : monTableau[todoIndex].done,
  //       dueDate: dueDate ? new Date(dueDate) : monTableau[todoIndex].dueDate,
  //     };
  //     res.send(monTableau[todoIndex]);
  //   } else {
  //     res.status(404).send("Todo not found");
  //   }
  // });
 
  // todosRouter.post("/", (req: Request, res: Response) => {
  //   const { label, done, dueDate } = req.body;
  //   const newId = monTableau.length > 0 ? monTableau[monTableau.length - 1].id + 1 : 1;
  //   const newTodo = { id: newId, label, done, dueDate: dueDate ? new Date(dueDate) : undefined };
  //   monTableau.push(newTodo);
  //   res.status(201).send(newTodo);
  // });
  
  