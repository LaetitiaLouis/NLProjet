import {Component, OnInit} from '@angular/core';
import {Client} from "../model/client";
import {ClientService} from "../service/client.service";
import {PopUpClientComponent} from "./pop-up-client/pop-up-client.component";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {PopUpClientDeleteComponent} from "./pop-up-client-delete/pop-up-client-delete.component";
import {Admin} from "../model/admin";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {


  public clients: Client[];
  public client: Client;
  public displayedColumnsXs: string[] = ['select', 'nomPrenom', 'adresse', 'telephone', 'email', 'refDevis', 'refFacture'];
  public displayedColumns: string[] = ['nom', 'prenom', 'adresse', 'telephone', 'email', 'refDevis', 'refFacture', 'update', 'delete'];
  public selection = new SelectionModel<Client>(true, []);
  public searchBy: string;
  public admin: Admin;

  constructor(private clientService: ClientService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllClients();
  }

  /** Indique si le nombre d'éléments sélectionnés correspond au nombre total de lignes */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.clients.length;
    return numSelected === numRows;

  }

  /** Sélectionne toutes les lignes si elles ne sont pas toutes sélectionnées; sinon supprime sélection */
  masterToggle() {
    if (this.isAllSelected()) {
      console.log(this.selection);
      this.selection.clear();
    } else {
      this.selection.selected.forEach(c=> console.log(c));
    this.clients.forEach(row => this.selection.select(row));
    }
  }

  /** Case à cocher sur la ligne passée */
  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public getAllClients() {
    this.clientService.getAllClients().subscribe(clients => this.clients = clients);
  }

  openDialog(update: boolean, client?: Client): void {
    const dialogRef = this.dialog.open(PopUpClientComponent, {data: {client, update}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllClients();
    });
  }

  openDialogDelete(client?: Client): void {
    const dialogRef = this.dialog.open(PopUpClientDeleteComponent, {data: {client}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllClients();
      // this.clients = result;
    });
  }

  search(): void {
    this.clientService.getClientsByNomAndPrenom(this.searchBy).subscribe(client => this.clients = client);

  }

}


