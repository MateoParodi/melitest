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

  constructor(private _fb: FormBuilder, private router: Router) {

  }
  ngOnInit() {
    this.searchForm = this._fb.group({
      query: this._fb.control('')
    });
  }

  onSubmit() {
    this.router.navigate(['/items/search', this.searchForm.get('query').value]);
  }
}
