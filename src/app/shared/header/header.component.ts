import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router) { }

  /**
   * Creates the search form group.
   */
  ngOnInit() {
    this.searchForm = this._fb.group({
      query: this._fb.control('')
    });
  }

  /**
   * Navigate to the product list screen when user sends the form with what he typed.
   */
  onSubmit() {
    this.router.navigate(['/items/search', this.searchForm.get('query').value]);
  }
}
