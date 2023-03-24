import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthSession } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Profile } from 'src/app/tokens/profile.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AccountComponent implements OnInit {
  loading = false;
  profile!: Profile;
  session!: AuthSession;

  updateProfileForm = this.formBuilder.group({
    username: '',
    avatar_url: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.session = this.supabase.session!;
    await this.getProfile();

    const { username, avatar_url } = this.profile;
    this.updateProfileForm.patchValue({
      username,
      avatar_url,
    });
  }

  async getProfile() {
    try {
      this.loading = true;
      const { user } = this.session;
      let { data: profile, error, status } = await this.supabase.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true;
      const { user } = this.session;

      const { error } = await this.supabase.updateProfile({
        id: user.id,
        username: this.updateProfileForm.value.username as string,
        avatar_url: this.updateProfileForm.value.avatar_url as string, // TODO
      });

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    await this.supabase.signOut();
  }
}
