import { Component } from '@angular/core';
import { NavbarCompartidoComponent } from "../../Components/navbar-compartido/navbar-compartido.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarCompartidoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
