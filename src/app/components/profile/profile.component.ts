import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/tokens/profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProfileComponent {
  loading = true;
  error = '';
  profile?: Profile;

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    if (!username) {
      this.error = 'could not find username';
      return;
    }

    this.profileService
      .getUser(username)
      .pipe(
        take(1),
        map((result) => result.data as Profile)
      )
      .subscribe({
        next: (profile) => {
          this.profile = profile;
          this.loading = false;
        },
        error: (error) => {
          this.error = error?.message;
        },
      });
  }
}
