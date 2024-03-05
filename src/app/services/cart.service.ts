import { Injectable } from '@angular/core';
import { Customer } from '../model/customer.model';
import { Training } from '../model/training.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Service dédié à la gestion du panier à l'aide du local storage qui contient à tout instant les éléments d'un panier
 * jusqu'à la validation de celui-ci qui provoquera la suppresion dans le LS du panier à l'exception du customer 
 */
export class CartService {  
  private cart : Map<number,Training>;  // panier

  constructor() {     
    // au démarrage du service, je récupère le contenu du local storage : commande en cours
    let cart = localStorage.getItem('cart');
    if(cart){  // le panier existe déjà
      this.cart = new Map(JSON.parse(cart));
    } // sinon il faut le créer
    else this.cart = new Map<number,Training>();
  }

  /**
   * Méthode qui ajoute une formation au panier puis ajoute le panier au local storage
   * @param training 
   */
  addTraining(training: Training) { 
    this.cart.set(training.id,training);
    this.saveCart(); //à chaque fois que j'ajoute un élément au panier, je met à jour le local storage
  }

  /**
   * Méthode qui ajoute un client au Local storage, s'il existe déjà il est écrasé
   * @param customer 
   */
  saveCustomer(customer : Customer) {
    localStorage.setItem('customer',JSON.stringify(customer));
  }

  /**
   * Méthode qui injecte le contenu du panier dans le local storage
   */
  saveCart() {
    localStorage.setItem('cart',JSON.stringify([...this.cart]));
  }

  /**
   * Méthode qui retire une formation au panier puis met à jour le LS
   * @param training 
   */
  removeTraining(training: Training) {
    this.cart.delete(training.id);
    this.saveCart();
  }

  /**
   * Méthode qui renvoi le contenu du panier sous forme de tableau
   * @returns Training [] | undefined
   */
  getCart() : Training [] | undefined {    
    if(this.cart.size > 0)
    return Array.from(this.cart.values());
    else return undefined;
  }

  /**
   * Méthode qui calcule et renvoi le montant total du panier
   * @return total amount
   */
  getAmount() : number {
    let amount : number = 0;
    this.cart.forEach(training => {
      amount += training.price * training.quantity;
    });
    return amount;    
  }

  /**
   * Méthode qui renvoi le client à partir du LS s'il existe sinon une instance la classe Customer
   * @return 
   */
  getCustomer() : Customer {
    let customer = localStorage.getItem('customer');
    if(customer)  return  JSON.parse(customer);
    return new Customer("unknown","","","","");
  }

  /**
   * Méthode qui supprime tous les éléments du panier dans la structure de données puis dans le LS
   */
  clearLocalStorage() {
    this.cart.clear();
    localStorage.setItem('cart','');    
  }
}
