import {Component, OnInit} from '@angular/core';
import {Projet} from '../model/projet';
import {ProjetService} from '../service/projet.service';
import {PhotoService} from '../service/photo.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  public projets: Projet[];

  constructor(private projetService: ProjetService,
              private route: ActivatedRoute,
              private photoService: PhotoService) {
  }

  public ngOnInit(): void {
    }
}
